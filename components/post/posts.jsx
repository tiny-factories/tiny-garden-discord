import React from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import { defaultProfilePicture } from "@/lib/default";

function Post({ post }) {
  const user = useUser(post.creatorId);
  {
    /* const user = useUser(post.postBy); */
  }

  return (
    <>
      <style jsx>
        {`
          article {
            margin: auto;
            width: 500px;
            background: #fff;
            border: 1px solid #000;
            box-sizing: border-box;
            padding: 1.5rem;
            margin-bottom: 0.5rem;
          }
          div:hover {
          }
          small {
            color: #777;
          }
          .postMeta {
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 18px;
            opacity: 0.5;
          }
        `}
      </style>
      {user && (
        <article
          style={{
            background: `{user.themeBackground}`,
            border: `1px solid ${user.themeHighlight}`,
          }}
        >
          <p>{post.content}</p>
          <div>
            <Link href={`/user/${user._id}`}>
              <a style={{ display: "inline-flex", alignItems: "center" }}></a>
            </Link>
            <div className="postMeta">
              {user.name} {user.symbol}{" "}
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        </article>
      )}{" "}
    </>
  );
}

const PAGE_SIZE = 10;
{
  /* postBy={user.slackId} */
}

export function usePostPages({ discordChannelId } = {}) {
  return useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.posts.length === 0) return null;

      // first page, previousPageData is null
      if (index === 0) {
        return `/api/posts?limit=${PAGE_SIZE}${
          discordChannelId ? `&by=${discordChannelId}` : ""
        }`;
      }

      // using oldest posts createdAt date as cursor
      // We want to fetch posts which has a datethat is
      // before (hence the .getTime() - 1) the last post's createdAt
      const from = new Date(
        new Date(
          previousPageData.posts[previousPageData.posts.length - 1].createdAt
        ).getTime() - 1
      ).toJSON();

      return `/api/posts?from=${from}&limit=${PAGE_SIZE}${
        discordChannelId ? `&by=${discordChannelId}` : ""
      }`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

export default function Posts({ discordChannelId }) {
  const { data, error, size, setSize } = usePostPages({
    discordChannelId,
  });

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0].posts?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts.length < PAGE_SIZE);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {!isReachingEnd && (
        <button
          type="button"
          style={{
            background: "transparent",
            color: "#000",
          }}
          onClick={() => setSize(size + 1)}
          disabled={isReachingEnd || isLoadingMore}
        >
          {isLoadingMore ? ". . ." : "load more"}
        </button>
      )}
    </div>
  );
}
