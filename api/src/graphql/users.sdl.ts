export const schema = gql`
  type User {
    id: Int!
    email: String!
    username: String!
    password: String!
    image: String
    bio: String
    articles: [Article]!
    favorites: [Article]!
    followedBy: [User]!
    following: [User]!
    comments: [Comment]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
    image: String
    bio: String
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
    image: String
    bio: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
