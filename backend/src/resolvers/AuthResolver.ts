import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../schemas/Context";
import User from "../schemas/User";

@Resolver()
export default class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    console.log(ctx.req.user);
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }
        ctx.req.logout();
        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    console.log("her");
    console.log(ctx);
    if (!ctx.req.user) {
      return undefined;
    }

    console.log(ctx.req.user);
    return ctx.req.user as any;
  }
}
