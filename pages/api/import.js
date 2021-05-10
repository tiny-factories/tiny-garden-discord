import nc from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import { all } from "@/middlewares/index";
import { extractUser } from "@/lib/api-helpers";
import { insertUser, findUserByEmail } from "@/db/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { rss } = req.body;

  if (!rss) {
    res.status(400).send("Missing field(s)");
    return;
  }

  const user = await insertUser(req.db, {
    rss, // TODO: Can add more link and push to an array
  });
  req.logIn(user, (err) => {
    if (err) throw err;
    res.status(201).json({
      user: extractUser(req.user),
    });
  });
});

export default handler;

//TODO: Edit to just save RSS
