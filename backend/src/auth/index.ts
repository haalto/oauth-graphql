import passport = require("passport");
import {
  Strategy,
  VerifyCallback,
  VerifyFunction,
} from "passport-google-oauth2";
import jwt = require("jsonwebtoken");
import config from "../config";
import { Request, Response } from "express";
import { createUser, getUserById } from "../services/useUser";
const {
  googleClientId,
  googleClientSecret,
  callbackUrl,
  tokenSecret,
  issuer,
  audience,
} = config;

if (!googleClientId || !googleClientSecret || !callbackUrl) {
  throw new Error("Google credentials missing.");
}

export const strategyCallback: VerifyFunction = async (
  _,
  __,
  profile: any,
  done: VerifyCallback
) => {
  const result = await getUserById(profile.id);

  if (result.length) {
    return done(null, result[0]);
  }

  const newUser = await createUser({
    id: profile.id,
    email: profile.email,
    name: profile.displayName,
  });
  done(null, newUser);
};

export const loadPassport = () => {
  passport.use(
    new Strategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: callbackUrl,
      },
      strategyCallback
    )
  );
  return passport;
};

export const generateAccessToken = (userId: string) => {
  const expiresIn = "1 hour";

  const token = jwt.sign({}, tokenSecret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId.toString(),
  });

  return token;
};

export const generateUserToken = (req: Request, res: Response) => {
  console.log(req.user);
  const accessToken = generateAccessToken((req.user as any).id);
  res.redirect(`http:localhost:3000/${accessToken}`);
};
