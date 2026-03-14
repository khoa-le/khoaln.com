# Post-Migration Testing Checklist

Use this checklist after completing the migration to ensure everything works correctly.

## Build Verification

- [ ] `npm install` completes without errors
- [ ] `npm run build` completes without errors
- [ ] No console warnings during build
- [ ] `rm -rf .cache public && npm run build` works (clean build)

## Dev Server Verification

- [ ] `npm run dev` starts without errors
- [ ] Hot reload works when editing MDX files
- [ ] No console errors in browser

## Content Verification

### Blog Posts
- [ ] All blog posts load correctly
- [ ] MDX content renders without errors
- [ ] Code blocks are syntax highlighted
- [ ] Inline images display correctly
- [ ] Banner images display correctly
- [ ] Image captions/bannerCredit render correctly

### Specific Post Types to Test
- [ ] Post with code examples
- [ ] Post with images
- [ ] Post with external embeds (YouTube, Twitter, etc.)
- [ ] Post with tables
- [ ] Post with lists (ordered/unordered)
- [ ] Post with blockquotes
- [ ] Most recent post
- [ ] Oldest post

## Layout Verification

- [ ] Homepage layout matches original
- [ ] Blog index page layout correct
- [ ] Individual post page layout correct
- [ ] Header/navigation works
- [ ] Footer displays correctly
- [ ] Mobile navigation (hamburger menu) works

## Typography Verification

- [ ] Font families load correctly
- [ ] Heading sizes (h1, h2, h3) match original
- [ ] Paragraph spacing correct
- [ ] Link styling correct
- [ ] Code font (monospace) displays correctly

## Component Verification

- [ ] SEO meta tags render correctly
- [ ] Open Graph tags present
- [ ] Twitter cards work
- [ ] Subscribe form displays
- [ ] Share buttons work
- [ ] Edit link works (points to GitHub)

## RSS Feed Verification

- [ ] `/blog/rss.xml` generates correctly
- [ ] `/writing/blog/rss.xml` generates correctly
- [ ] Feed contains recent posts
- [ ] Feed validates (use https://validator.w3.org/feed/)

## Performance Verification

- [ ] Lighthouse score >90 for performance
- [ ] No render-blocking resources
- [ ] Images properly optimized
- [ ] Lazy loading works for images

## Responsive Verification

- [ ] Desktop (1920px) layout correct
- [ ] Laptop (1366px) layout correct
- [ ] Tablet (768px) layout correct
- [ ] Mobile (375px) layout correct
- [ ] No horizontal scrolling on any device

## Browser Testing

- [ ] Chrome/Chromium works
- [ ] Firefox works
- [ ] Safari works (if available)

## Netlify Production Verification

- [ ] Build succeeds on Netlify
- [ ] No build warnings in Netlify logs
- [ ] Deploy preview works
- [ ] Custom domain works
- [ ] HTTPS works
- [ ] Redirects work (if any)
- [ ] Functions work (if any)

## Known Issues Log

Document any issues found and workarounds:

| Issue | Location | Status | Workaround |
|-------|----------|--------|------------|
|       |          |        |            |
|       |          |        |            |

## Sign-off

- [ ] All critical items pass
- [ ] Visual regression acceptable
- [ ] Site deployed successfully
- [ ] Monitoring (if any) confirms uptime

---

**Migration completed:** _date_
**Tested by:** _name_
**Approved for production:** _date_
