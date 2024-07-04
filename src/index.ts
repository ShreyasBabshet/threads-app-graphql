import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  const graphqlServer = new ApolloServer({
    typeDefs: `
        type Query{
            hello : String
        }
      `,
    resolvers: {
      Query: {
        hello: () => `Hello this is shreyas`,
      },
    },
  });

  await graphqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running!" });
  });

  app.use("/graphql", expressMiddleware(graphqlServer));
  app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
}

init();
