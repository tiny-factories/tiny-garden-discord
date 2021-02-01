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
        <div className="ascii small-ascii">
          <p>
            Heyo~! This is a small social site. You can submit logs of what
            you’ve been up to as a casual creative (of any kind). <br />
            Have a wonderful day.~*
          </p>
        </div>
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
