export const schema = gql`
  type Tag {
    id: Int!
    name: String!
    articles: [Article]!
  }

  type Query {
    tags: [Tag!]! @requireAuth
    tag(id: Int!): Tag @requireAuth
    topTags(username: String): [Tag!]! @skipAuth
  }

  input CreateTagInput {
    name: String!
  }

  input UpdateTagInput {
    name: String
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag! @requireAuth
    updateTag(id: Int!, input: UpdateTagInput!): Tag! @requireAuth
    deleteTag(id: Int!): Tag! @requireAuth
  }
`
