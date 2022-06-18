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
    posts: articleList(
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
        favoriteCount
        favoritedByMe
      }
      count
    }
  }
`
const PAGE_SIZE = 5
type PostListProps = {
  page_number?: number
  feed?: boolean
  tag?: string
  username?: string
  favorited?: boolean
}
const PostList = ({
  page_number = 1,
  feed,
  tag,
  username,
  favorited,
}: PostListProps) => {
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
  if (!data?.posts?.articles || data.posts.articles.length === 0) {
    if (data.posts.articles.length === 0 && page > 1) {
      return setPage(page - 1)
    }
    return <div style={{ padding: '30px' }}>No posts.</div>
  }
  // console.log(data)
  return (
    <>
      {data.posts.articles.map((post) => {
        return <PostCard key={post.id} post={post} />
      })}
      <Pagination
        setPage={setPage}
        page={page}
        pages={Math.ceil(data.posts.count / PAGE_SIZE)}
      />
    </>
  )
}

export default PostList
