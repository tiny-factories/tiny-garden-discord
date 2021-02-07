import { nanoid } from "nanoid";

export async function getPosts(db, from = new Date(), by, limit) {
  return db
    .collection("posts")
    .find({
      // Pagination: Fetch posts from before the input date or fetch from newest
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
      ...(by && { creatorId: by }),
    })
    .sort({ createdAt: -1 })
    .limit(limit || 10)
    .toArray();
}
// export async function getPosts(db, from = new Date(), by, limit) {
//   return db
//     .collection("posts")
//     .find({
//       // Pagination: Fetch posts from before the input date or fetch from newest
//       ...(from && {
//         createdAt: {
//           $lte: from,
//         },
//       }),
//       ...(by && { slackChannelName: by }),
//     })
//     .sort({ createdAt: -1 })
//     .limit(limit || 10)
//     .toArray();
// }

export async function insertPost(db, { content, creatorId }) {
  return db
    .collection("posts")
    .insertOne({
      _id: nanoid(12),
      creatorId,
      type: "post",
      source: "website",
      content,
      discordChannelId: "",
      createdAt: new Date(),
      updateddAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}

// export async function insertPost(db, { content, creatorId }) {
//   return db
//     .collection("posts")
//     .insertOne({
//       _id: nanoid(12),
//       type,
//       creatorId,
//       discordChannelId,
//       content,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     })
//     .then(({ ops }) => ops[0]);
// }
