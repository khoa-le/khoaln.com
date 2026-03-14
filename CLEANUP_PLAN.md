# 🧹 Code Cleanup Plan

## Identified Issues

### 1. Unused Dependencies
| Package | Status | Action |
|---------|--------|--------|
| axios | ❌ Not used | Remove |
| react-live | ❌ Not used | Remove |
| @babel/runtime | ⚠️ Likely not needed | Check & remove |
| react-error-boundary | ⚠️ Check usage | Remove if unused |
| rehype-document | ⚠️ Likely unused | Check & remove |
| rehype-format | ⚠️ Likely unused | Check & remove |
| rehype-raw | ⚠️ Likely unused | Check & remove |
| rehype-stringify | ⚠️ Likely unused | Check & remove |
| remark-parse | ⚠️ Likely unused | Check & remove |
| remark-rehype | ⚠️ Likely unused | Check & remove |
| unified | ⚠️ Likely unused | Check & remove |
| strip-markdown | ✅ Now inline | Already removed from deps logic |

### 2. Archived/Unused Files (.mdxz extension)
| File | Status | Action |
|------|--------|--------|
| appearances.mdxz | ❌ Archived | Delete or move to archive |
| conduct.mdxz | ❌ Archived | Delete or move to archive |
| info.mdxz | ❌ Archived | Delete or move to archive |
| subscribe.mdxz | ❌ Archived | Delete or move to archive |

### 3. Legacy Code Patterns
| Location | Issue | Action |
|----------|-------|--------|
| src/components/seo/index.js | childMarkdownRemark reference | Remove legacy code |
| gatsby-node.js | Over-complicated stripMarkdown | Already simplified ✅ |
| config/website.js | Kent C. Dodds references in minibio | Update to Khoa's info |
| Various components | Unused imports | Clean up |

### 4. Complicated Components to Simplify
| Component | Issue | Action |
|-----------|-------|--------|
| search/index.js | Worker file overkill | Could simplify |
| epic-react-cta.js | Has unused countdown code | Clean up |
| gatsby-node.js | Complex node creation | Consider simplifying |

### 5. Build/Dev Scripts
| Issue | Action |
|-------|--------|
| No clean script for .cache/public | Add proper clean script |
| No analyze script | Add bundle analyzer |

## Cleanup Steps

1. Remove unused dependencies from package.json
2. Delete or archive .mdxz files
3. Clean up SEO component (remove childMarkdownRemark)
4. Update config/website.js with correct info
5. Remove unused imports from components
6. Simplify complicated components where possible
7. Add useful npm scripts
