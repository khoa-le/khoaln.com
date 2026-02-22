import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {Link as RouterLink} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import {matchSorter, rankings as matchSorterRankings} from 'match-sorter'
import theme from '../../../config/theme'
import Container from '../container'

/* ── URL state helpers ────────────────────────────────────────────────────── */
function getParam(name) {
  if (typeof window === 'undefined') return ''
  return new URL(window.location).searchParams.get(name) || ''
}

function setParam(name, value) {
  const url = new URL(window.location)
  if (value) url.searchParams.set(name, value)
  else url.searchParams.delete(name)
  window.history.replaceState(window.history.state, '', url)
}

function useURLState(paramName, defaultValue = '') {
  const [value, setValue] = React.useState(() => getParam(paramName) || defaultValue)
  const set = React.useCallback(v => {
    const next = typeof v === 'function' ? v(value) : v
    setValue(next)
    setParam(paramName, next)
  }, [paramName, value])
  return [value, set]
}

function useURLArrayState(paramName) {
  const [value, setValue] = React.useState(() => {
    const raw = getParam(paramName)
    return raw ? raw.split(',').filter(Boolean) : []
  })
  const set = React.useCallback(arr => {
    setValue(arr)
    setParam(paramName, arr.join(','))
  }, [paramName])
  return [value, set]
}

/* ── Filter logic ─────────────────────────────────────────────────────────── */
function filterPosts(posts, query, tags) {
  let result = posts

  // Filter by tags first (AND: post must have ALL selected tags)
  if (tags.length > 0) {
    result = result.filter(post => {
      const postTags = [...(post.categories || []), ...(post.keywords || [])]
      return tags.every(tag => postTags.includes(tag))
    })
  }

  // Then filter by keyword search
  if (query.trim()) {
    result = matchSorter(result, query.trim(), {
      keys: [
        {key: 'title', threshold: matchSorterRankings.CONTAINS},
        {key: 'categories', threshold: matchSorterRankings.CONTAINS, maxRanking: matchSorterRankings.CONTAINS},
        {key: 'keywords', threshold: matchSorterRankings.CONTAINS, maxRanking: matchSorterRankings.CONTAINS},
        {key: 'description', threshold: matchSorterRankings.CONTAINS, maxRanking: matchSorterRankings.CONTAINS},
      ],
    })
  }

  return result
}

/* ── Styled components ────────────────────────────────────────────────────── */
const Wrap = styled.div`
  background: ${theme.colors.bg};
  min-height: 60vh;
  padding: 48px 0 72px;
`

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  letter-spacing: -0.03em;
  margin: 0 0 8px;
`

const PageSubtitle = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.9375rem;
  margin: 0;
`

const SearchRow = styled.div`
  position: relative;
  margin-bottom: 32px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 13px 52px 13px 44px;
  font-size: 0.9375rem;
  border: 1.5px solid ${theme.colors.border};
  border-radius: ${theme.radii.lg};
  background: ${theme.colors.white};
  color: ${theme.colors.text};
  box-shadow: ${theme.shadows.sm};
  transition: all 150ms ease;
  font-family: ${theme.fonts.body};
  &:focus {
    outline: none;
    border-color: ${theme.colors.orange};
    box-shadow: 0 0 0 3px rgba(253, 186, 116, 0.18);
  }
  &::placeholder { color: ${theme.colors.textSubtle}; }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textSubtle};
  pointer-events: none;
  display: flex;
  align-items: center;
`

const ResultCount = styled.div`
  position: absolute;
  right: 44px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.textSubtle};
  pointer-events: none;
`

const ClearInputBtn = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: ${theme.colors.textSubtle};
  display: flex;
  align-items: center;
  border-radius: ${theme.radii.sm};
  &:hover { color: ${theme.colors.text}; }
`

const FilterSection = styled.div`
  margin-bottom: 40px;
`

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const FilterLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${theme.colors.textSubtle};
`

const ClearAllBtn = styled.button`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${theme.colors.orangeDark};
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: ${theme.radii.sm};
  font-family: ${theme.fonts.body};
  &:hover { background: ${theme.colors.orangeLight}; }
`

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const TagBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: ${theme.radii.full};
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 120ms ease;
  font-family: ${theme.fonts.body};
  border: 1.5px solid ${p => p.active ? theme.colors.orangeDark : theme.colors.border};
  background: ${p => p.active ? theme.colors.orangeDark : theme.colors.white};
  color: ${p => p.active ? theme.colors.white : theme.colors.textMuted};
  &:hover {
    border-color: ${p => p.active ? '#c2410c' : theme.colors.orange};
    color: ${p => p.active ? theme.colors.white : theme.colors.orangeDark};
    background: ${p => p.active ? '#c2410c' : theme.colors.orangeLight};
  }
`

const TagCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: ${theme.radii.full};
  font-size: 0.6875rem;
  font-weight: 600;
  background: ${p => p.active ? 'rgba(255,255,255,0.22)' : theme.colors.surfaceAlt};
  color: ${p => p.active ? 'rgba(255,255,255,0.9)' : theme.colors.textMuted};
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border};
  margin: 0 0 32px;
`

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const ResultsLabel = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`

const Card = styled(RouterLink)`
  display: block;
  text-decoration: none;
  color: initial;
  background: ${theme.colors.white};
  border: 1.5px solid ${theme.colors.border};
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  transition: all 150ms ease;
  &:hover {
    border-color: rgba(234, 88, 12, 0.4);
    box-shadow: ${theme.shadows.md};
    transform: translateY(-1px);
  }
`

const CardThumb = styled.div`
  width: 100%;
  height: 168px;
  overflow: hidden;
  background: ${theme.colors.surfaceAlt};
`

const CardBody = styled.div`
  padding: 20px 20px 16px;
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`

const CardDate = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.textSubtle};
  font-family: ${theme.fonts.mono};
`

const CardTitle = styled.h2`
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${theme.colors.text};
  line-height: 1.35;
  margin: 0 0 8px;
  letter-spacing: -0.01em;
`

const CardDesc = styled.p`
  font-size: 0.8125rem;
  color: ${theme.colors.textMuted};
  line-height: 1.55;
  margin: 0 0 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`

const CardTag = styled.button`
  padding: 3px 8px;
  background: ${p => p.active ? 'rgba(234, 88, 12, 0.1)' : theme.colors.surfaceAlt};
  color: ${p => p.active ? theme.colors.orangeDark : theme.colors.textMuted};
  border: 1px solid ${p => p.active ? 'rgba(234, 88, 12, 0.25)' : 'transparent'};
  border-radius: ${theme.radii.full};
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  font-family: ${theme.fonts.body};
  transition: all 100ms ease;
  &:hover {
    background: rgba(234, 88, 12, 0.1);
    color: ${theme.colors.orangeDark};
  }
`

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 24px;
  color: ${theme.colors.textMuted};
`

const EmptyTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0 0 8px;
`

const EmptyText = styled.p`
  font-size: 0.875rem;
  margin: 0 0 20px;
`

/* ── Icons ────────────────────────────────────────────────────────────────── */
const SearchSVG = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const CloseSVG = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

/* ── Blog post card ───────────────────────────────────────────────────────── */
function PostCard({post, selectedTags, onTagClick}) {
  const {slug, title, description, categories, keywords, banner, date} = post
  const bannerImage = banner ? getImage(banner) : null
  const tags = [...new Set([...(categories || []), ...(keywords || [])])]

  function handleTagClick(e, tag) {
    e.preventDefault()
    e.stopPropagation()
    onTagClick(tag)
  }

  return (
    <Card to={slug}>
      {bannerImage ? (
        <CardThumb>
          <GatsbyImage image={bannerImage} alt={title} css={css`width:100%;height:100%;`} objectFit="cover" />
        </CardThumb>
      ) : (
        <div css={css`
          width:100%;height:168px;
          background: linear-gradient(135deg, ${theme.colors.dark} 0%, #1e293b 100%);
          display:flex;align-items:center;justify-content:center;
          color:rgba(255,255,255,0.1);font-size:3rem;font-weight:700;
          font-family:${theme.fonts.mono};
        `}>
          {title.charAt(0)}
        </div>
      )}
      <CardBody>
        <CardMeta>
          {date && <CardDate>{date}</CardDate>}
        </CardMeta>
        <CardTitle>{title}</CardTitle>
        {description && <CardDesc>{description}</CardDesc>}
        {tags.length > 0 && (
          <CardTags>
            {tags.slice(0, 5).map(tag => (
              <CardTag
                key={tag}
                active={selectedTags.includes(tag)}
                onClick={e => handleTagClick(e, tag)}
              >
                #{tag}
              </CardTag>
            ))}
          </CardTags>
        )}
      </CardBody>
    </Card>
  )
}

/* ── Main Search component ────────────────────────────────────────────────── */
function Search({blogposts}) {
  const allPosts = React.useMemo(() => {
    return blogposts.edges.map(e => ({
      ...e.node.fields,
      excerpt: e.node.excerpt,
    }))
  }, [blogposts.edges])

  // Collect all unique tags + their counts (from categories + keywords)
  const tagCounts = React.useMemo(() => {
    const counts = {}
    allPosts.forEach(post => {
      const tags = [...new Set([...(post.categories || []), ...(post.keywords || [])])]
      tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    // Sort by count desc
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({tag, count}))
  }, [allPosts])

  const [query, setQuery] = useURLState('q')
  const [selectedTags, setSelectedTags] = useURLArrayState('tags')

  const filteredPosts = React.useMemo(
    () => filterPosts(allPosts, query, selectedTags),
    [allPosts, query, selectedTags],
  )

  const hasFilters = query.trim() || selectedTags.length > 0

  function toggleTag(tag) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    )
  }

  function clearAll() {
    setQuery('')
    setSelectedTags([])
  }

  return (
    <Wrap>
      <Container maxWidth={840}>
        {/* Header */}
        <PageHeader>
          <PageTitle>Blog</PageTitle>
          <PageSubtitle>
            Thoughts on software engineering, leadership &amp; technology.
          </PageSubtitle>
        </PageHeader>

        {/* Search input */}
        <SearchRow>
          <SearchIcon><SearchSVG /></SearchIcon>
          <form
            action="/blog"
            method="GET"
            onSubmit={e => e.preventDefault()}
          >
            <SearchInput
              name="q"
              type="search"
              placeholder="Search posts by title, keyword..."
              aria-label="Search blog posts"
              autoComplete="off"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
          </form>
          {filteredPosts.length > 0 && (
            <ResultCount>{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}</ResultCount>
          )}
          {query && (
            <ClearInputBtn onClick={() => setQuery('')} aria-label="Clear search">
              <CloseSVG />
            </ClearInputBtn>
          )}
        </SearchRow>

        {/* Tag filter */}
        <FilterSection>
          <FilterHeader>
            <FilterLabel>Filter by tag</FilterLabel>
            {hasFilters && (
              <ClearAllBtn onClick={clearAll}>Clear all filters</ClearAllBtn>
            )}
          </FilterHeader>
          <TagsRow>
            {tagCounts.map(({tag, count}) => {
              const active = selectedTags.includes(tag)
              return (
                <TagBtn
                  key={tag}
                  active={active}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                >
                  {tag}
                  <TagCount active={active}>{count}</TagCount>
                </TagBtn>
              )
            })}
          </TagsRow>
        </FilterSection>

        <Divider />

        {/* Results */}
        <ResultsHeader>
          <ResultsLabel>
            {hasFilters
              ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''}${selectedTags.length > 0 ? ` · tagged: ${selectedTags.join(', ')}` : ''}`
              : `${allPosts.length} posts`}
          </ResultsLabel>
          {hasFilters && (
            <span css={css`font-size:0.8125rem;color:${theme.colors.textSubtle};`}>
              {query && `"${query}"`}
            </span>
          )}
        </ResultsHeader>

        <Grid>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                selectedTags={selectedTags}
                onTagClick={toggleTag}
              />
            ))
          ) : (
            <EmptyState>
              <EmptyTitle>No posts found</EmptyTitle>
              <EmptyText>
                {hasFilters
                  ? `No posts match your current filters. Try a different keyword or tag.`
                  : 'No posts available yet.'}
              </EmptyText>
              {hasFilters && (
                <ClearAllBtn
                  onClick={clearAll}
                  css={css`font-size:0.875rem;padding:8px 16px;border:1px solid ${theme.colors.border};border-radius:${theme.radii.default};`}
                >
                  Clear all filters
                </ClearAllBtn>
              )}
            </EmptyState>
          )}
        </Grid>

        {/* Google fallback */}
        <p css={css`text-align:center;margin-top:40px;font-size:0.8125rem;color:${theme.colors.textSubtle};`}>
          {`Can't find something? `}
          <a
            href="https://www.google.com/search?q=site:khoaln.com/blog"
            css={css`color:${theme.colors.orangeDark};`}
          >
            Search with Google
          </a>
        </p>
      </Container>
    </Wrap>
  )
}

export default Search
