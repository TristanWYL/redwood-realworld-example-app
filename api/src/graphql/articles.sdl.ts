export const schema = gql`
  type Article {
    id: Int!
    slug: String!
    title: String!
    description: String!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tagList: [Tag]!
    author: User!
    authorId: Int!
    favoritedBy: [User]!
    favoriteCount: Int!
    favoritedByMe: Boolean
    comments: [Comment]!
  }

  type ArticleList {
    articles: [Article!]!
    count: Int!
  }

  type Query {
    articles: [Article!]! @skipAuth
    article(id: Int!): Article @skipAuth
    queryArticleBySlug(slug: String!): Article @skipAuth
    articleList(
      feed: Boolean
      tag: String
      username: String
      favorited: Boolean
      page: Int
    ): ArticleList! @skipAuth
  }

  input CreateArticleInput {
    slug: String!
    title: String!
    description: String!
    body: String!
    authorId: Int!
    tagList: [String]
  }

  input UpdateArticleInput {
    slug: String
    title: String
    description: String
    body: String
    authorId: Int
    tagList: [String]
  }

  type Mutation {
    createArticle(input: CreateArticleInput!): Article! @requireAuth
    updateArticle(id: Int!, input: UpdateArticleInput!): Article! @requireAuth
    deleteArticle(id: Int!): Article! @requireAuth
    changeFavorite(
      username: String!
      slug: String!
      favorite: Boolean!
    ): Article! @requireAuth
  }
`
