import React, { useState, useEffect, useRef, Fragment } from "react";
import ReactDOM from "react-dom";
import Router from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useCurrentUser } from "@/hooks/index";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";

const ImportSection = () => {
  const [user, { mutate }] = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState(false);

  const mediaSourcesRef = useRef();

  const [msg, setMsg] = useState({ message: "", isError: false });

  {
    /* This is from the examples */
  }

  const [inputFields, setInputFields] = useState([
    { firstName: "", lastName: "" },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: "", lastName: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "firstName") {
      values[index].firstName = event.target.value;
    } else {
      values[index].lastName = event.target.value;
    }

    setInputFields(values);
  };

  useEffect(() => {
    mediaSourcesRef.current.value = user.mediaSources;
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = new FormData();

    formData.append("mediaSources", mediaSourcesRef.current.value);
    const res = await fetch("/api/user", {
      method: "PATCH",
      body: formData,
    });
    console.log(formData);
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });

      setMsg({ message: "Profile updated" });
      Router.replace(`/user/${user._id}`);
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
    setIsUpdating(false);
  };

  return (
    <>
      <style jsx>{`
        input {
          background: #ffffff;
          border: 1px solid #2860cc;
          border-radius: 3px;

          opacity: 0.6;
          font-family: IBMPlexMono;
          font-size: 18px;
          color: #000000;
          line-height: 27px;
        }
      `}</style>
      <Head>
        <title>Tiny Garden | Import</title>
      </Head>
      <section className="">
        <article
          className="bg-light-gray"
          style={{
            background: `${user.themeBackground}`,
            border: `1px solid ${user.themeHighlight}`,
          }}
        >
          <div className="dt-ns dt--fixed-ns w-100">
            <div className="pa3 pa4-ns ">
              <h1>/connect services</h1>
              <p>
                You can import old and future work via <a>RSS</a> or <a>ATOM</a>{" "}
                feeds. We will check the feed perodically for new content and
                import it automatically. Each link has a tag tab it can be
                filtered by.
              </p>
              <div className="">
                {inputFields.map((inputField, index) => (
                  <Fragment key={`${inputField}~${index}`}>
                    <div className="">
                      <div className="ph3 dib v-mid">
                        <label htmlFor="filterLabel">
                          <input
                            style={{
                              border: `1px solid ${user.themeHighlight}`,
                            }}
                            type="text"
                            className=""
                            id="filterLabel"
                            name="filterLabel"
                            value={inputField.filterLabel}
                            placeholder="blog"
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </label>
                      </div>

                      <div className="ph3 dib v-mid">
                        <label htmlFor="mediaSources">
                          <input
                            style={{
                              border: `1px solid ${user.themeHighlight}`,
                            }}
                            type="text"
                            className=""
                            id="lastName"
                            name="lastName"
                            ref={mediaSourcesRef}
                            value={inputField.mediaSources}
                            placeholder="https://gndclouds.cc/feed/feed.rss"
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </label>
                      </div>

                      <button
                        className="dib v-mid"
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                      >
                        ⓧ
                      </button>
                    </div>
                  </Fragment>
                ))}
              </div>
              <button
                className=""
                type="button"
                onClick={() => handleAddFields()}
              >
                +
              </button>
              <div className="">
                <button className="" type="submit" onSubmit={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>
              Connect our Discord or Slack Bots to post content from directly to
              your garden. This is great for small teams.
            </p>
            <button className="" type="button">
              Connect Slack
            </button>
            <button className="" type="button">
              Connect Discord
            </button>
          </div>
        </article>
        <br />
        <pre>{JSON.stringify(inputFields, null, 2)}</pre>
      </section>
    </>
  );
};

const SettingPage = () => {
  const [user] = useCurrentUser();

  if (!user) {
    return (
      <>
        <h1>Interested in importing other services to your Tiny Garden?</h1>
        <p>
          We currently support importing any <a>RSS</a> feed and have a{" "}
          <a>plugin for discord</a> allowing you to post from any channel.
        </p>
        <a href="https://discord.com/api/oauth2/authorize?client_id=761144925542023179&permissions=0&redirect_uri=https%3A%2F%2Fpostman-discord.glitch.me&scope=applications.commands%20bot">
          discord bot{" "}
        </a>
      </>
    );
  }
  return (
    <>
      <ImportSection />
    </>
  );
};

export default SettingPage;
