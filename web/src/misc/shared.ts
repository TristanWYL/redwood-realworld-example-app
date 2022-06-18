export const TOGGLE_FAVORITE = gql`
  mutation changeFavorite(
    $username: String!
    $slug: String!
    $favorite: Boolean!
  ) {
    changeFavorite(username: $username, slug: $slug, favorite: $favorite) {
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
  }
`
export const TOGGLE_FOLLOW = gql`
  mutation changeFollow($username: String!, $follow: Boolean!) {
    changeFollow(username: $username, follow: $follow) {
      id
      email
      username
      image
      bio
      followedByMe
    }
  }
`
export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: Int!) {
    deleteArticle(id: $id) {
      id
      slug
    }
  }
`
