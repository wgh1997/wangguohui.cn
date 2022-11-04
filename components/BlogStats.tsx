import { css } from '@emotion/react'
import CountUp from 'react-countup'
import { useSelector } from "react-redux";
import { blogCount } from "../store/bilog/index";
export default function BlogStats({ feed, activeCategories, filteredPosts,classify }) {
  const blogList = useSelector(blogCount);
  const filterActive = filteredPosts.length < feed.length
  const styleBlogStatsWrapper = css({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    ul: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    li: {
      lineHeight: '1rem',
      display: 'inline',
      '&.catsCount': {
        display: filterActive ? 'none' : 'inline-block'
      },
      '@media(max-width: 1024px)': {
        marginBottom: '.25rem'
      },
      '&:last-of-type': {
        marginLeft: '1rem',
      },
      '.number': {
        marginRight: '.3rem',
        fontSize: 18,
      },
      '.text': {
        fontSize: 12,
        color: 'var(--color-gray)'
      }
    }
  })

  return (
    <div css={styleBlogStatsWrapper}>
      <h1 className="blogHeading">文章</h1>
      <ul>
        <li className="postsCount">
          <CountUp
            start={0}
            end={blogList.total}
            delay={0}
            duration={.5}
            decimals={0}
          >
            {({ countUpRef }) => (
              <span className="number" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text">posts</span>
        </li>
        <li className="catsCount">
          <CountUp
            start={0}
            end={classify.length}
            delay={0}
            duration={.5}
            decimals={0}
          >
            {({ countUpRef }) => (
              <span className="number" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text">categories</span>
        </li>
      </ul>
    </div>
  )
}