import fastify from "fastify";
import { logger } from "./logger";

export async function buildServer() {
  const app = fastify({
    // logger: true, // Will use default logger to log all requests
    logger: logger, // we are handing fastify our pino logger to log the output
  });

  // register plugins

  // register routes

  return app;
}
