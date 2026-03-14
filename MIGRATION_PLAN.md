# Blog Migration Plan: Gatsby 2.x → 5.x + Node 22

## Current State Analysis

| Component | Current | Target | Notes |
|-----------|---------|--------|-------|
| Node.js | 22.22.0 ✓ | 22.x | Already compatible |
| Gatsby | 2.24.67 | 5.x | 3 major versions behind |
| React | 16.13.1 | 18.x | Need concurrent features |
| MDX | v1 (@mdx-js/mdx ^1.6.18) | v3 | Breaking API changes |
| Emotion | v10 | v11 | CSS-in-JS engine |
| gatsby-plugin-mdx | 1.2.43 | 5.x | Major config changes |

## Migration Strategy: Incremental Approach

### Phase 1: Pre-Migration Setup ⏱️ 30 mins

1. **Create backup branch**
   ```bash
   git checkout -b backup/gatsby-2-original
   git push origin backup/gatsby-2-original
   git checkout main
   ```

2. **Document current working state**
   ```bash
   npm run build  # Test current build
   npm run dev    # Verify dev works
   ```

3. **Clean install dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm audit
   ```

### Phase 2: React & Core Dependencies ⏱️ 1 hour

1. **Update React to 18.x**
   ```bash
   npm install react@18 react-dom@18
   ```

2. **Update Emotion to v11** (required for React 18)
   ```bash
   npm install @emotion/react@11 @emotion/styled@11
   npm install gatsby-plugin-emotion@8  # Gatsby 5 compatible
   ```

3. **Update Gatsby to v3 first** (stepping stone)
   ```bash
   npm install gatsby@3
   ```

4. **Fix breaking changes in gatsby-node.js**
   - `onCreateNode` API changes
   - GraphQL schema changes (`allMdx` filter syntax)
   - `createFilePath` may need adjustment

### Phase 3: MDX Migration v1 → v3 ⏱️ 2-3 hours (CRITICAL)

This is the **riskiest part** - MDX v1 to v3 has significant breaking changes.

**Option A: gatsby-plugin-mdx v4+ with MDX v2/v3**

1. Update MDX dependencies:
   ```bash
   npm install @mdx-js/mdx@3 @mdx-js/react@3
   npm install gatsby-plugin-mdx@5
   ```

2. **Update gatsby-config.js** - MDX config changes:
   ```javascript
   // OLD (v1):
   {
     resolve: 'gatsby-plugin-mdx',
     options: {
       defaultLayouts: { default: './src/templates/markdown-page.js' },
       extensions: ['.mdx', '.md', '.markdown'],
       gatsbyRemarkPlugins: [...]
     }
   }

   // NEW (v3):
   {
     resolve: 'gatsby-plugin-mdx',
     options: {
       extensions: ['.mdx', '.md', '.markdown'],
       mdxOptions: {
         remarkPlugins: [],
         rehypePlugins: [],
       },
       // defaultLayouts REMOVED - use wrapPageElement instead
     }
   }
   ```

3. **Create layout wrapper** (replaces defaultLayouts):
   ```javascript
   // gatsby-browser.js & gatsby-ssr.js
   import React from 'react'
   import { MDXProvider } from '@mdx-js/react'
   import MDXLayout from './src/templates/markdown-page'

   const components = {
     wrapper: MDXLayout,
   }

   export const wrapPageElement = ({ element, props }) => (
     <MDXProvider components={components}>{element}</MDXProvider>
   )
   ```

4. **Update post.js template**:
   - `gatsby-plugin-mdx/mdx-renderer` import changes
   - MDXRenderer usage changes
   ```javascript
   // OLD:
   import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
   <MDXRenderer>{mdx.body}</MDXRenderer>

   // NEW:
   import { MDXProvider } from '@mdx-js/react'
   // mdx.body is now directly usable or use children
   ```

### Phase 4: Gatsby 3 → 5 ⏱️ 1 hour

1. **Update to Gatsby 4** (intermediate step):
   ```bash
   npm install gatsby@4
   ```
   - Fix any GraphQL filter changes
   - Check `sort` field syntax changes

2. **Update to Gatsby 5**:
   ```bash
   npm install gatsby@5
   npm install gatsby-source-filesystem@5
   npm install gatsby-transformer-sharp@5 gatsby-plugin-sharp@5
   npm install gatsby-image@3  # or migrate to gatsby-plugin-image
   ```

3. **Critical GraphQL changes in v4+**:
   ```javascript
   // OLD (Gatsby v2/v3):
   sort: {order: DESC, fields: [frontmatter___date]}

   // NEW (Gatsby v4+):
   sort: {frontmatter: {date: DESC}}
   ```

### Phase 5: Update All Gatsby Plugins ⏱️ 1 hour

```bash
# Update all gatsby plugins to v5
npm install gatsby-plugin-feed@5 gatsby-plugin-manifest@5
npm install gatsby-plugin-nprogress@5 gatsby-plugin-react-helmet@5
npm install gatsby-plugin-robots-txt@5 gatsby-plugin-sitemap@5
npm install gatsby-plugin-typography@5 gatsby-remark-images@7
npm install gatsby-source-filesystem@5 gatsby-transformer-sharp@5
npm install gatsby-plugin-sharp@5
```

### Phase 6: Layout & Style Preservation ⏱️ 1-2 hours

1. **Typography preservation**:
   - `gatsby-plugin-typography` v5 uses different internals
   - May need to refactor `src/lib/typography.js`

2. **Emotion v10 → v11** changes:
   ```javascript
   // OLD (v10):
   import {css} from '@emotion/core'
   /** @jsx jsx */
   import {jsx} from '@emotion/core'

   // NEW (v11):
   import {css} from '@emotion/react'
   /** @jsxImportSource @emotion/react */
   ```

3. **Update all components using Emotion**:
   ```bash
   find src -name "*.js" -exec grep -l "@emotion/core" {} \;
   ```

### Phase 7: Testing & Fixes ⏱️ 2-3 hours

1. **Build test**:
   ```bash
   npm run build
   ```

2. **Dev server test**:
   ```bash
   npm run dev
   ```
   - Check console for React warnings
   - Verify MDX renders correctly
   - Check image handling
   - Test navigation

3. **Visual regression checklist**:
   - [ ] Homepage layout
   - [ ] Blog post page layout
   - [ ] Code highlighting
   - [ ] Images (banner, inline)
   - [ ] Typography
   - [ ] Navigation
   - [ ] Mobile responsiveness
   - [ ] RSS feeds

### Phase 8: Netlify & Deployment ⏱️ 30 mins

1. **Update build settings** (if needed):
   - Ensure Node 22 is specified in Netlify
   - Update `NODE_VERSION` environment variable

2. **Test Netlify build**:
   ```bash
   npm run netlify
   ```

3. **Update functions** (if any breaking changes):
   ```bash
   # Check netlify-lambda compatibility
   npm list netlify-lambda
   ```

## Key Files to Modify

| File | Changes Required |
|------|------------------|
| `package.json` | All dependency versions |
| `gatsby-config.js` | MDX plugin config |
| `gatsby-node.js` | GraphQL sort/filter syntax |
| `gatsby-browser.js` | Add wrapPageElement for MDX |
| `gatsby-ssr.js` | Same as gatsby-browser |
| `src/templates/post.js` | MDXRenderer import/usage |
| `src/templates/markdown-page.js` | Emotion v11 imports |
| All components with Emotion | Update @emotion/core → @emotion/react |

## Rollback Plan

If migration fails at any phase:

```bash
# Reset to working state
git checkout main
git reset --hard backup/gatsby-2-original
rm -rf node_modules package-lock.json
npm install
```

## Alternative: Fresh Start (Nuclear Option)

If incremental migration is too complex, consider:

1. Create new Gatsby 5 project with fresh starter
2. Copy content files
3. Recreate custom layouts/styles
4. Migrate MDX content (mostly compatible)
5. Test thoroughly

**Pros:** Clean, modern setup
**Cons:** Time-intensive, may miss custom configurations

## Reference Commands

```bash
# Full dependency audit
npm outdated

# Check for peer dependency issues
npm ls

# Install specific versions
npm install gatsby@5.13.0

# Clean cache
rm -rf .cache public
```

## Timeline Estimate

| Phase | Time | Risk |
|-------|------|------|
| 1. Setup | 30 min | Low |
| 2. React & Core | 1 hour | Medium |
| 3. MDX Migration | 2-3 hours | **High** |
| 4. Gatsby 3→5 | 1 hour | Medium |
| 5. Plugins | 1 hour | Low |
| 6. Layout | 1-2 hours | Medium |
| 7. Testing | 2-3 hours | Medium |
| 8. Deploy | 30 min | Low |
| **Total** | **~10-12 hours** |

## Success Criteria

- [ ] `npm run build` completes without errors
- [ ] `npm run dev` serves site locally
- [ ] All blog posts render correctly
- [ ] Layout matches original visually
- [ ] MDX components work (code blocks, images, etc.)
- [ ] RSS feeds generate correctly
- [ ] Netlify deployment successful
