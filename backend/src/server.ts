import "reflect-metadata";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { generateUserToken, loadPassport } from "./auth";
import LogoutResolver from "./resolvers/AuthResolver";

export const createServer = async () => {
  const app = express();

  const passport = loadPassport();
  app.use(passport.initialize());

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      session: false,
    }),
    generateUserToken
  );

  const schema = await buildSchema({
    resolvers: [UserResolver, LogoutResolver],
    emitSchemaFile: true,
  });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });
  return app;
};
