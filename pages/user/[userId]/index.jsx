import React from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { all } from "@/middlewares/index";
import { useCurrentUser } from "@/hooks/index";
import Posts from "@/components/post/posts";
import { extractUser } from "@/lib/api-helpers";
import { findUserById } from "@/db/index";
import { defaultProfilePicture } from "@/lib/default";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";

export default function UserPage({ user }) {
  if (!user) return <Error statusCode={404} />;
  const {
    name,
    bio,
    nouns,
    profilePicture,
    _id,
    themeBackground,
    themeHighlight,
  } = user || {};
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === user._id;
  return (
    <>
      <style jsx>
        {`
          h2 {
            text-align: left;
            margin-right: 0.5rem;
          }
          button {
            margin: 0 0.25rem;
          }
          img {
            width: 10rem;
            height: auto;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
            margin-right: 1.5rem;
            background-color: #f3f3f3;
          }
          div {
            color: #777;
          }
          p {
            font-family: monospace;
            color: #444;
            margin: 0.25rem 0 0.75rem;
          }
          a {
            margin-left: 0.25rem;
          }
          .pronoun {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
      <Head>
        <title>{name}</title>
      </Head>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={profilePicture || defaultProfilePicture(_id)}
          width="256"
          height="256"
          alt={name}
        />
        <section>
          <div>
            <h2>
              {user.name}
              <span className="pronoun"> ({user.nouns})</span>
            </h2>
            <p>{bio}</p>
            <Link href={`${user.linkUrl}`}>
              <a>
                <b>{user.linkName}</b>
              </a>
            </Link>

            {/* {isCurrentUser && (
              <Link href="/settings">
                <button type="button">Edit</button>
              </Link>
            )} */}
          </div>
        </section>
      </div>
      <div className="">
        <Tabs
          className="tabs tabs-1"
          onChange={(tab) => console.log(`Tab selected: ${tab}`)}
        >
          <div className="tab-links">
            <TabLink to="tab1">Personal</TabLink>
            <TabLink to="tab2">All Activity</TabLink>
          </div>

          <div className="content">
            <TabContent for="tab1">
              <h3>Personal Channel</h3>
              <Posts discordChannelId={user.discordChannelId} />
            </TabContent>
            <TabContent for="tab2">
              <h3>Coming Soon</h3>
              <Posts creatorId={user._id} />

              <p>🚧 This will show all posts you share on the plaform</p>
            </TabContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  const user = extractUser(
    await findUserById(context.req.db, context.params.userId)
  );
  if (!user) context.res.statusCode = 404;
  return { props: { user } };
}
