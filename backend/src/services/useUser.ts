import db from "../db";
import { jsToDb } from "../utils";

export type NewUser = {
  id: string;
  name: string;
  email: string;
};

export const getUsers = async () => {
  return await db("oauth.users");
};

export const getUserById = async (id: string) => {
  return await db("oauth.users").where({ id });
};

export const createUser = async (newUser: NewUser) => {
  return await db("oauth.users").insert(jsToDb(newUser)).returning("*");
};
