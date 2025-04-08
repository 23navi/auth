import pino from "pino";

export const logger = pino({
  transport: {
    // Don't use pino-pretty in production, only for dev
    target: "pino-pretty",
  },
});
