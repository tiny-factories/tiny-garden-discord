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
          }
          .hero-text {
            margin: auto;
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
          <div>

            <img />
            <h1>A universal micro-blogg, for creators to better main connect with their community</h1>
            <p className="hero-text">
            It’s really hard to keep your work all in one place, you often ware mant hats and share your work across sites. We give one you place to show all your work from across the internet in one place.
              </p>
          </div>

          <div>
            <h2>What Creators are saying</h2>
          </div>

          <div>
          </div>

          <div>
          </div>

          <div>
          </div>

          <div className="hero-text ascii"></div>
          </>
        ) : (
          <>
            <p className="hero-text">
              Heyo~! {user ? user.name : "stranger"}!<br />
              <br />
              We are still adding things to the site to please feel free to make
              seggestions in discord.
            </p>
            <Posts />


          </>
        )}

      </div>
    </>
  );
};

export default IndexPage;
