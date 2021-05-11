import React, { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useCurrentUser } from "@/hooks/index";

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace("/import");
  }, [user]);

  const handleSubmit = async (e) => {
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
      Router.replace("/import");
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <>
      <Head>
        <title>Tiny Garden | Join</title>
      </Head>
      <div className="w-100">
        <div className="w-100">
          <h2> </h2>
        </div>
        <section className="ph3 ph5-ns pv5">
          <article className="bg-light-gray">
            <div className="dt-ns dt--fixed-ns w-100">
              <div className="pa3 pa4-ns dtc-ns v-mid">
                <div>
                  <p className="measure mv0">Welcome to 🌱 tiny garden!</p>
                  <br />

                  <p className="measure mv0">
                    Since you are joining us in the early days your account will
                    remain <b>free forever</b>.
                  </p>
                  <br />
                  <p className="measure mv0"></p>
                </div>
              </div>

              <div className="pa3 pa4-ns dtc-ns v-mid">
                <form onSubmit={handleSubmit}>
                  {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
                  <p className="fl w-100">Name</p>

                  <label className="fl w-100" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                    />
                  </label>
                  <p className="fl w-100">Email</p>

                  <label className="fl w-100" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="hello@tiny.garden"
                    />
                  </label>
                  <p className="fl w-100">Password</p>

                  <label className="fl w-100" htmlFor="password">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="············"
                    />
                  </label>
                  <button type="submit">Create Account</button>
                </form>
              </div>
            </div>
          </article>
        </section>

        <div className="fl w-100 w-50-ns pa3"></div>
        <div className="fl w-100 w-50-ns pa3"></div>
      </div>
    </>
  );
};

export default SignupPage;
