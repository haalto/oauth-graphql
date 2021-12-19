import { Query, Resolver } from "type-graphql";
import User from "../schemas/User";

@Resolver((of) => User)
export default class {
  @Query((returns) => User)
  getUser() {
    return {};
  }
}
