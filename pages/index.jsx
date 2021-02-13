import React from "react";
import { useCurrentUser } from "@/hooks/index";
import PostEditor from "@/components/post/editor";
import Posts from "@/components/post/posts";

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <style jsx>
        {`
          .container {
            margin: auto;
            max-width: 500px;
          }
          .hero-text {
            margin: auto;
            max-width: 500px;
            padding-bottom: 25px;
          }

          .ascii {
            font-family: "Menlo Regular", monospace;
            font-family: monospace;
            white-space: pre;
            text-align: left;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            speak: never;
            speak-as: spell-out;
          }
          .small-ascii {
            font-size: 9px;
            margin-bottom: 30px;
          }
        `}
      </style>
      <div>
        {!user ? (
          <>
            <p className="hero-text">
              Heyo~! This is a small social site. You can submit logs of what
              you’ve been up to as a casual creative (of any kind). <br />
              <br />
              Have a wonderful day.~*
            </p>
          </>
        ) : (
          <>
            <p className="hero-text">
              Heyo~! {user ? user.name : "stranger"}!<br />
              <br />
              We are still adding things to the site to please feel free to make
              seggestions in discord.
            </p>
          </>
        )}

        <PostEditor />
        <Posts />
      </div>
    </>
  );
};

export default IndexPage;
