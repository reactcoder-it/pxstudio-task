import { ApolloServer } from "apollo-server-micro"
import { schema } from "../../apollo/schema"
import { MongoClient } from "mongodb"

let db

const apolloServer = new ApolloServer({
  schema,
  async context(ctx) {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })

        if (!dbClient.isConnected()) await dbClient.connect()
        db = dbClient.db("pxstudio-quiz")
      } catch (error) {
        console.log(
          `---> error while connecting with graphql context db ${error}`
        )
      }
    }
    return { ...ctx, db }
  },
  playground: true,
  introspection: true,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({
  path: "/api/graphql",
})
