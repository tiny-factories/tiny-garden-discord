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
          div {
            margin: auto;
            width: 500px;
          }
          .hero-text {
          }
          .ascii {
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
          }
        `}
      </style>
      <div>
        {!user ? (
          <>
            <div className=" ">
              <p className="hero-text">
                Heyo~! This is a small social site. You can submit logs of what
                you’ve been up to as a casual creative (of any kind). <br />
                Have a wonderful day.~*
              </p>
            </div>
          </>
        ) : (
          <>
            <p>Hello, {user ? user.name : "stranger"}!</p>
          </>
        )}

        <PostEditor />
        <Posts />
      </div>
    </>
  );
};

export default IndexPage;
