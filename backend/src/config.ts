import { config } from "dotenv";
config({ path: `${__dirname}/../.env` });

const conf = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || null,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || null,
  callbackUrl: process.env.CALLBACK_URL || null,
  sessionSecret: "bad secret",
  tokenSecret: "foo",
  issuer: "bar",
  audience: "baz",
};

export default conf;
