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
    followedByMe: Boolean
    following: [User]!
    comments: [Comment]!
  }

  type UserWithoutPrivacy {
    id: Int!
    email: String!
    username: String!
    image: String
    bio: String
    articles: [Article]!
    favorites: [Article]!
    followedBy: [User]!
    followedByMe: Boolean
    following: [User]!
    comments: [Comment]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
    userRelation(username: String!): User @skipAuth
    userInfoWithoutPrivacy(username: String!): UserWithoutPrivacy @skipAuth
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
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    changeFollow(username: String!, follow: Boolean!): User! @requireAuth
  }
`
