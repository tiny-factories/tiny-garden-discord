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
              </p>
            </div>

            <section className="ph3 ph5-ns pv5">
              <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
                <div className="dt-ns dt--fixed-ns w-100">
                  <div className="pa3 pa4-ns dtc-ns v-mid">
                    <form
                      action="https://buttondown.email/api/emails/embed-subscribe/TinyGarden"
                      method="post"
                      target="popupwindow"
                      onsubmit="window.open('https://buttondown.email/TinyGarden', 'popupwindow')"
                      class="embeddable-buttondown-form"
                    >
                      <label for="bd-email">Enter your email</label>
                      <input type="email" name="email" id="bd-email" />
                      <input type="hidden" value="1" name="embed" />
                      <input type="submit" value="Subscribe" />
                      <p>
                        <a href="https://buttondown.email" target="_blank">
                          Powered by Buttondown.
                        </a>
                      </p>
                    </form>
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
