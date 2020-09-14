import gql from "graphql-tag"

export const typeDefs = gql`
  enum Currency {
    RUB
    USD
    EUR
  }

  enum SortBy {
    CITY
    DATE
    GAME_TYPE
  }

  type User {
    _id: ID
    email: String
    isLoggedIn: Boolean
    # password: String
  }

  type Quiz {
    _id: ID
    title: String
    location: String
    gameType: String
    date: String
    time: String
    city: String
    fullDescription: String
    photo: String
    cost: Float
    currency: Currency
  }

  input CreateQuizInput {
    title: String
    location: String
    gameType: String
    date: String
    time: String
    city: String
    fullDescription: String
    photo: String
    cost: Float
    currency: Currency
  }

  type Command {
    _id: ID
    name: String
    city: String
    score: Int
  }

  input CommandInput {
    name: String
    city: String
    score: Int
  }

  enum SaveResult {
    SUCCESS
    ERROR
  }

  type LoginPayload {
    token: String
  }

  type Query {
    quizes(sortby: SortBy, limit: Int): [Quiz]
    quiz(id: ID!): Quiz

    commands: [Command]
    command(id: ID!): Command

    gameTypes: [String]
    cities: [String]

    viewer: User
  }

  type Mutation {
    buy(id: ID!): Quiz

    createQuiz(input: CreateQuizInput): SaveResult
    editQuiz(id: ID!, input: CreateQuizInput): SaveResult
    deleteQuiz(id: ID!): SaveResult

    editCommand(id: ID!, input: CommandInput): SaveResult
    createCommand(input: CommandInput): SaveResult
    deleteCommand(id: ID!): SaveResult

    userLogin(email: String!, password: String!): LoginPayload
    userCreate(email: String!, password: String!): SaveResult
  }
`
