import { useQuery } from '@redwoodjs/web'
import { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import PostCard from '../PostCard/PostCard'

const QUERY = gql`
  query PostsQuery(
    $feed: Boolean
    $tag: String
    $username: String
    $favorited: Boolean
    $page: Int
  ) {
    posts: articlePage(
      feed: $feed
      tag: $tag
      username: $username
      favorited: $favorited
      page: $page
    ) {
      articles {
        id
        slug
        title
        description
        body
        createdAt
        updatedAt
        tagList {
          name
        }
        author {
          username
          image
        }
      }
      count
    }
  }
`
const PAGE_SIZE = 5
const PostsPage = ({ page_number = 2, feed, tag, username, favorited }) => {
  const [page, setPage] = useState(page_number)
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      page,
      feed,
      tag,
      username,
      favorited,
    },
  })

  if (loading) {
    return <div style={{ padding: '30px' }}>Loading...</div>
  }
  if (error) {
    return (
      <div style={{ padding: '30px', color: 'red' }}>
        Error: {error.message}
      </div>
    )
  }
  if (
    !data ||
    !data.posts ||
    !data.posts.articles ||
    data.posts.articles.length === 0
  ) {
    return <div style={{ padding: '30px' }}>No posts.</div>
  }
  return (
    <>
      <ul>
        {data.posts.articles.map((article) => {
          return <PostCard key={article.id} article={article} />
          return <li key={article.id}>{article.slug}</li>
        })}
      </ul>
      <Pagination
        setPage={setPage}
        page={page}
        pages={Math.ceil(data.posts.count / PAGE_SIZE)}
      />
    </>
  )
}

export default PostsPage
