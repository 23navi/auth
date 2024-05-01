import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connectToDb() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to DB");
  } catch (error) {
    log.fatal(error);
    process.exit(1);
  }
}

export default connectToDb;
