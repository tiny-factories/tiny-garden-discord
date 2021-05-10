import { nanoid } from "nanoid";

export async function findUserById(db, userId) {
  return db
    .collection("users")
    .findOne({
      _id: userId,
    })
    .then((user) => user || null);
}

export async function findUserByEmail(db, email) {
  return db
    .collection("users")
    .findOne({
      email,
    })
    .then((user) => user || null);
}

export async function updateUserById(db, id, update) {
  return db
    .collection("users")
    .findOneAndUpdate({ _id: id }, { $set: update }, { returnOriginal: false })
    .then(({ value }) => value);
}

export async function insertUser(
  db,
  { email, password, bio = "", name, profilePicture }
) {
  //TODO: @will add other user info here
  return db
    .collection("users")
    .insertOne({
      _id: nanoid(12),
      emailVerified: false,
      profilePicture: "",
      profileCover: "",
      username: "",
      email,
      password,
      name,
      nouns: "",
      bio: "",
      discordCreatorId: "",
      discordCreatorUsername: "",
      discordChannelId: "",
      symbol: "",
      themeBackground: "#FFFFFF",
      themeHighlight: "#000FFF",
      membership: "0",
      linkName: "",
      linkUrl: "",
      profileVisibility: "",
      profilePassword: "",
    })
    .then(({ ops }) => ops[0]);
}
