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
              <h1 className="hero-text">
                A public garden for independent creatives and small teams.
              </h1>
              <p className="hero-text">
                As an independent creator or small team member, you need to wear
                many hats. And even if you like hats that can be hard. We are
                here to remove the stress of{" "}
                <a href="https://brianlovin.com/writing/make-a-personal-changelog">
                  publishing changelogs
                </a>
                , community updates, newsletters, and all the other things you
                need to do to keep your community engaged. Your tiny garden will
                allow you to publish work from other platforms to one central
                profile, so you can keep making great things.
              </p>
              <p className="hero-text">
                Our beta will be launching in the summer of 2021, you can follow
                our{" "}
                <a href="https://futureland.tv/gndclouds/tinygarden">
                  <u>dev notes</u>
                </a>{" "}
                for more behind-the-scenes info or the{" "}
                <a href="https://buttondown.email/TinyGarden">
                  <u>newsletter</u>
                </a>{" "}
                for learning about our beta release.
              </p>
            </div>

            <section className="ph3 ph5-ns pv5">
              <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
                <div className="dt-ns dt--fixed-ns w-100">
                  <div className="pa3 pa4-ns dtc-ns v-mid">
                    <div>
                      <h2 className="fw4 blue mt0 mb3">
                        This is a promo title{" "}
                      </h2>
                      <p className="black-70 measure lh-copy mv0">
                        This is suporting copy for the wonderful promo
                        catchphrase that is going to be used.
                      </p>
                    </div>
                  </div>
                  <div className="pa3 pa4-ns dtc-ns v-mid">
                    <a
                      href="#"
                      className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2"
                    >
                      Sign up for free
                    </a>
                  </div>
                </div>
              </article>
            </section>

            <div>{/* <h2>What Creators are saying</h2> */}</div>

            <div></div>

            <div></div>

            <div></div>

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
