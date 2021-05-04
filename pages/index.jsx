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
            padding-top: 50px;

          }


        `}
      </style>
      <div>
        {!user ? (
          <>
          <div>
            <p className="hero-text">A public garden for independent creatives and small teams.</p>
            <p className="hero-text">As an independent creator or small team member, you need to wear many hats. And even if you like hats that can be hard. We are here to remove the stress of publishing changelogs, community updates, newsletters, and all the other things you need to do to keep your community engaged. Your tiny garden will allow you to publish work from other platforms to one central profile, so you can keep making great things.</p>
            <p className="hero-text">Our beta will be launching in the summer of 2021, you can follow our <a href="https://futureland.tv/gndclouds/tinygarden"><u>dev notes</u></a> for more behind-the-scenes info or the <a href="https://tinygarden.substack.com/embed"><u>newsletter</u></a> for learning about our beta release.</p>

          </div>
          <div>
            {/* <h2>What Creators are saying</h2> */}
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
