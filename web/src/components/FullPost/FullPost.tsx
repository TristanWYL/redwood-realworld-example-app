import CommentList from '../CommentList/CommentList'
import CommentSubmitBox from '../CommentSubmitBox/CommentSubmitBox'
import PostMeta from '../PostMeta/PostMeta'
import ReactMarkdown from 'react-markdown'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const FullPost = ({ post }) => {
  const { isAuthenticated } = useAuth()
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{post.title}</h1>
          <PostMeta post={post} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            {/* <p>
              Web development technologies have evolved at an incredible clip
              over the past few years.
            </p>
            <h2 id="introducing-ionic">Introducing RealWorld.</h2> */}
            <ReactMarkdown>{post.body}</ReactMarkdown>
            {post.tagList.length > 0 && (
              <ul className="tag-list">
                {post.tagList.map((tag) => (
                  <li
                    className="tag-default tag-pill tag-outline"
                    key={tag.name}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <PostMeta post={post} />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentSubmitBox article={post} />
            <CommentList articleId={post.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPost
