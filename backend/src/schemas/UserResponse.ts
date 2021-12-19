import { Field, ObjectType } from "type-graphql";
import User from "./User";

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
