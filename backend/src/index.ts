import { createServer } from "./server";

(async () => {
  try {
    (await createServer()).listen(4000, () => {
      console.log(`🚀 Server ready`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
