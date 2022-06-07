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
    comments: [Comment]!
  }

  type ArticlePage {
    articles: [Article!]!
    count: Int!
  }

  type Query {
    articles: [Article!]! @requireAuth
    article(id: Int!): Article @requireAuth
    queryArticleBySlug(slug: String!): Article @skipAuth
    articlePage(
      feed: Boolean
      tag: String
      username: String
      favorited: Boolean
      page: Int
    ): ArticlePage! @skipAuth
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
  }

  type Mutation {
    createArticle(input: CreateArticleInput!): Article! @requireAuth
    updateArticle(id: Int!, input: UpdateArticleInput!): Article! @requireAuth
    deleteArticle(id: Int!): Article! @requireAuth
  }
`
