import { logger } from "./utils/logger";
import { buildServer } from "./utils/server";

async function gracefulShutdown({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
  logger.warn("The server is down");
}

async function main() {
  const app = await buildServer();

  await app.listen({ port: 3000 });

  const signals = ["SIGINT", "SIGTERM"];
  for (const signal of signals) {
    // logger.info("This ran with " + signal);
    process.on(signal, () => {
      logger.info("This is running for " + signal);
      gracefulShutdown({
        app,
      });
    });
  }
}

main();
