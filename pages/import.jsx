import React, { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useCurrentUser } from "@/hooks/index";

const ImportPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    // redirect to home if user is authenticated
    {
      /* if (!user) Router.replace("/login");  */
    }
  }, [user]);

  const handleSubmit = async (e) => {
    //TODO: Pull current content and update profile in DB
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <>
      <Head>
        <title>Tiny Garden | Import</title>
      </Head>
      {!user ? (
        <>
          <p>List of imports </p>
        </>
      ) : (
        <>
          <section className="ph3 ph5-ns pv5">
            <article className="">
              <div className="dt-ns dt--fixed-ns w-100">
                <div className="pa3 pa4-ns dtc-ns v-mid">
                  <div>
                    <p className="measure mv0">
                      Welcome to 🌱 tiny garden, we are a microblog by Tiny
                      Factories.
                    </p>
                    <br />

                    <p className="measure mv0">
                      For Indivuals We currently support importing form RSS such
                      as newsletters, blog, or futureland journals.
                    </p>
                    <br />
                    <p className="measure mv0">
                      For Teams Alternatively you can connect a Discord or Slack
                      channel by installing out Gardening Bot
                    </p>
                  </div>
                </div>

                <div className="pa3 pa4-ns dtc-ns v-mid">
                  <form onSubmit={handleSubmit}>
                    {errorMsg ? (
                      <p style={{ color: "red" }}>{errorMsg}</p>
                    ) : null}
                    <p className="fl w-100">Name</p>
                    <label className="fl w-100" htmlFor="name">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                      />
                    </label>
                    <p className="fl w-100">Name</p>
                    <label className="fl w-100" htmlFor="name">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                      />
                    </label>
                    <p className="fl w-100">Name</p>
                    <label className="fl w-100" htmlFor="name">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                      />
                    </label>

                    <button type="submit">Import</button>
                  </form>
                </div>
              </div>
            </article>
          </section>
        </>
      )}
    </>
  );
};

export default ImportPage;
