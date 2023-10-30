import {
  DocumentType,
  Severity,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  index,
  Ref,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { User } from "./user.model";

import log from "../utils/logger";

@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: false })
  vaild: boolean;
}

const SessionModel = getModelForClass(Session);

export default SessionModel;
