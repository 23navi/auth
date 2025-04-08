import * as dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const envPath = `.env.${
  process.env.NODE_ENV === "production"
    ? "production"
    : process.env.NODE_ENV === "staging"
    ? "staging"
    : "development"
}`;
dotenv.config({ path: path.resolve(envPath) });

const envSchema = z.object({
  SERVER_PORT: z.string().min(1).default("3000"),
  POSTGRES_URL: z.string().min(1),
  NODE_ENV: z
    .enum(["production", "development", "staging"])
    .default("development"),
});

const envs = envSchema.parse(process.env);

export const { SERVER_PORT, NODE_ENV, POSTGRES_URL } = envs;

// export const MAX_FIND_LIMIT = 100_000;
