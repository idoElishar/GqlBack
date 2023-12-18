import express from "express";
import { createClient } from "redis";
import chalk from "chalk";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "./middleware/cors/cors";
import morgan from "./middleware/morgen/morgen";
import { connectToDatabase } from "./connectToDB";
import dotenv from "dotenv";
import resolvers from "../apolloServer/resolvers/resolves";
import http from "http";
import { usersTypeDefs } from "../apolloServer/typedeps/users.typedepd";
import bannerTypeDefs from "../apolloServer/typedeps/banner.typedep";
import chalk from "chalk";
import { clicksTypeDefs } from "../apolloServer/typedeps/bannerClicks.typedep";
import { client } from "./redis/banners";

interface MyContext {
  token?: string;
}
dotenv.config();
export const api = process.env.MONGO || "mongodb+srv://moshelapi:moshe206@cluster0.wdyimef.mongodb.net/banners?retryWrites=true&w=majority";
export const secret_key = process.env.SECRET_KEY || "erp";
export const server = process.env.MY_SERVER || "http://localhost:8008";

const app = express();
const httpServer = http.createServer(app);

const apolloServer = new ApolloServer<MyContext>({
  typeDefs:usersTypeDefs + bannerTypeDefs+clicksTypeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


async function startServer() {
  await apolloServer.start();

  app.use(
    "/graphql",
    cors,
    morgan,
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    client.connect()
    .then(() =>  console.log( chalk.magentaBright("connected successfully to Redis client!!! ")))
    .catch((error) => {  if (error instanceof Error) console.log(error.message) })})
  
  connectToDatabase();
}

startServer();
