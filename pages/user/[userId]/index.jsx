import React from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { all } from "@/middlewares/index";
import { useCurrentUser } from "@/hooks/index";
import Posts from "@/components/post/posts";
import PostEditor from "@/components/post/editor";
import Narratives from "@/components/narrative/posts";
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
    profileCover,
    _id,
    creatorId,
    themeBackground,
    themeHighlight,
  } = user || {};
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === user._id;
  return (
    <>
      <style jsx>
        {`
          button {
            margin: 0 0.25rem;
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
          .profile-card {
            position: relative;
            height: 450px;
            margin-bottom: 30px;
          }
          .profile-overlay {
            margin: 15px;
            padding: 15px;
            position: absolute;
            bottom: 0px;
            width: calc(100% - 30px);
          }
          .profile-image {
            display: inline-block;
            float: left;
            width: 10rem;
            height: 10rem;
          }
          .profile-text {
            display: inline-block;
            width: auto;
            padding-left: 15px;
          }
          .profile-bio {
          }
          .feeds {
            margin: auto;
            margin-top: 5rem;
          }
          .tab-container {
            display: inline-block;
          }
          .tab-links {
            display: inline-block;
          }
        `}
      </style>
      <Head>
        <title>{name}</title>
      </Head>

      <div
        className="profile-card"
        style={{
          background: `${user.themeBackground}`,
          border: `1px solid ${user.themeHighlight}`,
          backgroundImage: `url(${user.profileCover})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="profile-overlay"
          style={{
            background: `${user.themeBackground}`,
            border: `1px solid ${user.themeHighlight}`,
          }}
        >
          <img
            className="profile-image"
            src={profilePicture || defaultProfilePicture(_id)}
            style={{
              background: `${user.themeBackground}`,
              border: `1px solid ${user.themeHighlight}`,
            }}
            alt={name}
          />

          <div className="profile-text">
            <p>
              {user.name}
              <span className="pronoun"> ({user.nouns})</span>
            </p>
            <p className="profile-bio">{bio}</p>
          </div>
        </div>

        {/*
        <div>
          {isCurrentUser && (
            <Link href="/settings">
              <button type="button">Edit</button>
            </Link>
          )}
        </div>*/}
      </div>
      <PostEditor />

      <div className="feeds">
        <Tabs
          disableInlineStyles={false}
          className="tabs"
          onChange={(tab) => console.log(`Tab selected: ${tab}`)}
        >
          <div className="tab-container">
            <div className="tab-links">
              <TabLink to="tab1">All</TabLink>
            </div>
            <div className="tab-links">
              <TabLink to="tab2">Twitter</TabLink>
            </div>
            <div className="tab-links">
              <TabLink to="tab2">Twitter</TabLink>
            </div>
            <div className="tab-links">
              <TabLink to="tab2">Twitter</TabLink>
            </div>
            <div className="tab-links">
              <TabLink to="tab2">Twitter</TabLink>
            </div>
          </div>

          <div className="content">
            <TabContent for="tab1">
              <Posts creatorId={user._id} />
              {/* <Posts creatorId={user.creatorId} /> */}
            </TabContent>
            <TabContent for="tab2">
              <p>🚧 This will show all posts you share on the plaform</p>
              <Narratives creatorId={user._id} />
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
