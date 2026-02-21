import React from 'react'
import styled from '@emotion/styled'
import {Link as RouterLink} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import {rankings as matchSorterRankings} from 'match-sorter'
import theme from '../../../config/theme'
import MatchSorterWorker from './match-sorter.worker'
import Container from '../container'

let matchSorterWorker

function getMatchSorterWorker() {
  if (!matchSorterWorker) {
    matchSorterWorker = new MatchSorterWorker()
  }
  return matchSorterWorker
}

function BlogPostCard({blogpost}) {
  const {slug, productionUrl, title, description, keywords, banner} = blogpost
  const defaultCopyText = 'Copy URL'
  const [copyText, setCopyText] = React.useState(defaultCopyText)
  const bannerImage = banner ? getImage(banner) : null

  React.useEffect(() => {
    let current = true
    if (copyText !== defaultCopyText) {
      setTimeout(() => {
        if (current) {
          setCopyText(defaultCopyText)
        }
      }, 3000)
    }
    return () => (current = false)
  }, [copyText])

  function copy(event) {
    event.preventDefault()
    navigator.clipboard.writeText(productionUrl).then(
      () => {
        setCopyText('Copied')
      },
      () => {
        setCopyText('Error copying text')
      },
    )
  }

  return (
    <article
      css={{
        background: theme.colors.white,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.default,
        boxShadow: theme.shadows.sm,
        overflow: 'hidden',
        transition: theme.transition.ease,
        ':hover': {
          borderColor: 'rgba(253, 186, 116, 0.5)',
          boxShadow: theme.shadows.md,
        },
      }}
    >
      <RouterLink to={slug} css={{display: 'block', color: 'initial', textDecoration: 'none'}}>
        {bannerImage && (
          <div css={{width: '100%', height: 160, overflow: 'hidden'}}>
            <GatsbyImage
              image={bannerImage}
              alt={keywords?.join(', ') || ''}
              css={{width: '100%', height: '100%'}}
            />
          </div>
        )}
        <div css={{padding: 24}}>
          <h2 css={{
            margin: '0 0 12px 0',
            fontSize: '1.125rem',
            fontWeight: 600,
            color: theme.colors.text,
            lineHeight: 1.3,
          }}>{title}</h2>
          {description && (
            <p css={{
              margin: '0 0 16px 0',
              fontSize: '0.875rem',
              color: theme.colors.textMuted,
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>{description}</p>
          )}
          <div css={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}>
            {keywords?.slice(0, 3).map(kw => (
              <span key={kw} css={{
                padding: '4px 8px',
                background: theme.colors.surfaceAlt,
                borderRadius: theme.radii.default,
                fontSize: '0.75rem',
                color: theme.colors.textMuted,
              }}>
                {kw}
              </span>
            ))}
          </div>
        </div>
      </RouterLink>
    </article>
  )
}
BlogPostCard = React.memo(BlogPostCard)

function useQueryParamState(searchParamName) {
  const [value, setValue] = React.useState(() => {
    if (typeof window === 'undefined') {
      return ''
    }
    const searchParams = new URL(window.location).searchParams
    if (searchParams.has(searchParamName)) {
      return searchParams.get(searchParamName)
    } else {
      return ''
    }
  })

  React.useEffect(() => {
    const newUrl = new URL(window.location)
    newUrl.searchParams.set(searchParamName, value)
    if (value) {
      window.history.replaceState(window.history.state, '', newUrl)
    } else {
      newUrl.searchParams.delete(searchParamName)
      window.history.replaceState(window.history.state, '', newUrl)
    }
  }, [searchParamName, value])

  return [value, setValue]
}

const CategoryButton = styled.button([
  {
    cursor: 'pointer',
    padding: '6px 12px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.default,
    fontSize: 12,
    fontWeight: 500,
    margin: '4px',
    transition: 'all 150ms ease',
    fontFamily: theme.fonts.body,
  },
  ({isSelected}) => {
    const selectedStyles = {
      color: theme.colors.white,
      backgroundColor: theme.colors.orangeDark,
      borderColor: theme.colors.orangeDark,
    }
    const unselectedStyles = {
      color: theme.colors.textMuted,
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.border,
    }
    return isSelected
      ? {'&&&': {...selectedStyles, ':hover': {backgroundColor: '#c2410c', borderColor: '#c2410c'}}}
      : {'&&&': {...unselectedStyles, ':hover': {borderColor: theme.colors.orange, color: theme.colors.orangeDark}}}
  },
])

function Intersection({onVisible}) {
  const target = React.useRef(null)
  const onVisibleRef = React.useRef(onVisible)

  React.useEffect(() => {
    onVisibleRef.current = onVisible
  })

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const isIntersecting = entries.some(e => e.isIntersecting)
      if (isIntersecting) {
        onVisibleRef.current()
      }
    })
    observer.observe(target.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={target} />
}

function Search(props) {
  // this will be the same every time and because this re-renders on every
  // keystroke I'm pretty sure useMemo is appropriate here.
  const blogposts = React.useMemo(() => {
    return props.blogposts.edges.map(e => ({
      ...e.node.fields,
      excerpt: e.node.excerpt,
    }))
  }, [props.blogposts.edges])

  const categories = React.useMemo(
    () => Array.from(new Set(blogposts.flatMap(post => post.categories))),
    [blogposts],
  )

  const [search, setSearch] = useQueryParamState('q')
  const [filteredBlogPosts, setFilteredBlogPosts] = React.useState(
    // if there's a search, let's wait for it to load
    // otherwise let's initialize to the blogposts
    search ? [] : blogposts,
  )

  const [maxPostsToRender, setMaxPostsToRender] = React.useState(10)
  const blogPostsToDisplay = filteredBlogPosts.slice(0, maxPostsToRender)
  React.useEffect(() => {
    if (!search) {
      setFilteredBlogPosts(blogposts)
      return
    }
    getMatchSorterWorker()
      .searchAndSort(blogposts, search, {
        keys: [
          {
            key: 'title',
            threshold: matchSorterRankings.CONTAINS,
          },
          {
            key: 'categories',
            threshold: matchSorterRankings.CONTAINS,
            maxRanking: matchSorterRankings.CONTAINS,
          },
          {
            key: 'keywords',
            threshold: matchSorterRankings.CONTAINS,
            maxRanking: matchSorterRankings.CONTAINS,
          },
          {
            key: 'description',
            threshold: matchSorterRankings.CONTAINS,
            maxRanking: matchSorterRankings.CONTAINS,
          },
        ],
      })
      .then(
        results => setFilteredBlogPosts(results),
        error => {
          // eslint-disable-next-line no-console
          console.error(error)
        },
      )
  }, [blogposts, search])

  function handleCategoryClick(category) {
    setSearch(s => {
      if (s.includes(category)) {
        return s.split(category).join('').trim()
      }
      return `${s.trim()} ${category}`.trim()
    })
  }

  function handlePreventSubmit(event) {
    // the form is used only to enable https://support.mozilla.org/en-US/kb/how-search-from-address-bar
    // we want to prevent an actual submit (page reload) when pressing Enter
    event.preventDefault()
  }

  return (
    <div css={{padding: '48px 0'}}>
      <Container maxWidth={720}>
        {/* Search Header */}
        <div css={{textAlign: 'center', marginBottom: 32}}>
          <h1 css={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: theme.colors.text,
            margin: '0 0 8px 0',
          }}>Blog</h1>
          <p css={{
            color: theme.colors.textMuted,
            fontSize: '0.875rem',
            margin: 0,
          }}>
            Thoughts on software engineering, leadership, and technology.
          </p>
        </div>

        {/* Search Input */}
        <div css={{position: 'relative', marginBottom: 24}}>
          <form action="/blog" method="GET" onSubmit={handlePreventSubmit}>
            <svg
              css={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 18,
                height: 18,
                color: theme.colors.textSubtle,
                pointerEvents: 'none',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              name="q"
              css={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                fontSize: '0.875rem',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radii.default,
                background: theme.colors.white,
                color: theme.colors.text,
                boxShadow: theme.shadows.sm,
                transition: 'all 150ms ease',
                ':focus': {
                  outline: 'none',
                  borderColor: theme.colors.orange,
                  boxShadow: '0 0 0 3px rgba(253, 186, 116, 0.2)',
                },
                '::placeholder': {
                  color: theme.colors.textSubtle,
                },
              }}
              onChange={event => setSearch(event.target.value)}
              type="search"
              placeholder="Search blogposts..."
              aria-label="Search Blogposts"
              value={search}
              autoFocus
            />
          </form>
          <div
            css={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.colors.textSubtle,
              fontSize: '0.75rem',
              fontFamily: theme.fonts.mono,
            }}
          >
            {filteredBlogPosts.length}
          </div>
        </div>

        {/* Categories */}
        <div css={{marginBottom: 16, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px'}}>
          {categories.map(category => (
            <CategoryButton
              key={category}
              onClick={() => handleCategoryClick(category)}
              isSelected={search.includes(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </div>

        <p css={{textAlign: 'center', marginTop: 16, fontSize: '0.75rem', color: theme.colors.textMuted}}>
          {`Can't find what you're looking for? Try `}
          <a href="https://www.google.com/search?q=site%3Akhoaln.com%2Fblog+testing">
            searching with Google
          </a>
        </p>
      </Container>
      <Container maxWidth={1200} css={{marginTop: 32}}>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 24,
          }}
        >
          {blogPostsToDisplay.map(blogpost => (
            <BlogPostCard key={blogpost.id} blogpost={blogpost} />
          ))}
        </div>
      </Container>
      {maxPostsToRender < filteredBlogPosts.length ? (
        <>
          <div css={{
            marginTop: 32,
            textAlign: 'center',
            color: theme.colors.textMuted,
            fontSize: '0.875rem',
          }}>
            Loading more posts...
          </div>
          <Intersection onVisible={() => setMaxPostsToRender(Infinity)} />
        </>
      ) : null}
    </div>
  )
}

export default Search

/*
eslint
  no-func-assign: "off"
*/
