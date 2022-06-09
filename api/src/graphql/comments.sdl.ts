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
    comments: [Comment!]! @requireAuth
    getCommentsByArticleId(articleId: Int!): [Comment!]! @requireAuth
    comment(id: Int!): Comment @requireAuth
  }

  input CreateCommentInput {
    body: String!
    articleId: Int!
    authorId: Int!
  }

  input UpdateCommentInput {
    body: String
    articleId: Int
    authorId: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
