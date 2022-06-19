export const schema = gql`
  type Comment {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    body: String!
    article: Article!
    articleId: Int!
    author: User!
    authorId: Int!
  }

  type Query {
    comments: [Comment!]! @skipAuth
    getCommentsByArticleId(articleId: Int!): [Comment!]! @skipAuth
    comment(id: Int!): Comment @requireAuth
  }

  input CreateCommentInput {
    body: String!
    articleId: Int!
  }

  input UpdateCommentInput {
    body: String
    articleId: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
