import React from "react";
import { useCurrentUser } from "@/hooks/index";
import PostEditor from "@/components/post/editor";
import Posts from "@/components/post/posts";

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        {/* <h2>Hello, {user ? user.name : "stranger"}!</h2> */}
        <h2>
          👋, we are still finishing development <br /> but this will be the
          future home of the <br />
          Tiny Factories Community.
        </h2>

        <p>Have a wonderful day.</p>
      </div>
      <div>
        <h3>
          Testing feed{" "}
          <span role="img" aria-label="Earth">
            🌎
          </span>
        </h3>
        <PostEditor />
        <Posts />
      </div>
    </>
  );
};

export default IndexPage;
