import Link from 'next/link'
import formatDate from '@/utils/formatDate'
import calculateReadTime from '@/utils/calculateReadTime'


const Post = ({ post }) => {

  const publishDate = formatDate(post.create_time)
  const postReadTime = calculateReadTime(post.article_body)

  return (
    <div className="blog postTeaser">
      <h2 className="blogListHeading">
        <Link
          href={`/blog/${post.id}`}
          aria-label={post.article_name}
        >
          {post.article_name}
        </Link>
      </h2>
      <div
        className="postDetails"
        aria-label={`${publishDate} • ${postReadTime}`}>
          <div className="dateAndReadTime">
            <time dateTime={post.create_time}>{publishDate}</time>
            <span className="readTime">{postReadTime}</span>
          </div>
        </div>
      <p className="teaser">{post.article_name}</p>
    </div>
  )
}

export default Post