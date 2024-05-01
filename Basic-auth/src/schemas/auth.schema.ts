import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});
export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];
