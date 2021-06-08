import React, { useState, useEffect, useRef } from "react";
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
      <Head>
        <title>Tiny Garden | Import</title>
      </Head>
      <section className="">
        <article className="bg-light-gray">
          <div className="dt-ns dt--fixed-ns w-100">
            <div className="pa3 pa4-ns dtc-ns v-mid">
              <div>
                <h2>For Indivuals</h2>
                <p className="measure mv0">
                  We currently support importing form RSS such as newsletters,
                  blog, or futureland journals.
                </p>
                <br />
                <h2>For Teams</h2>
                <p className="measure mv0">
                  You can connect a Discord or Slack channel by installing out
                  Gardening Bot
                </p>
              </div>
            </div>

            <div className="pa3 pa4-ns dtc-ns v-mid">
              <form onSubmit={handleSubmit}>
                <label htmlFor="mediaSources">
                  <textarea
                    className="fl w-100"
                    required
                    id="mediaSources"
                    name="mediaSources"
                    type="text"
                    placeholder="https://gndclouds.cc/feed/rss"
                    ref={mediaSourcesRef}
                    rows="5"
                    cols="33"
                  >
                    >
                  </textarea>
                </label>
                <button disabled={isUpdating} type="submit">
                  Import
                </button>{" "}
              </form>
            </div>
          </div>
        </article>
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
