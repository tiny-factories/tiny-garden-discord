import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useCurrentUser } from "@/hooks/index";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";

const ProfileSection = () => {
  const [user, { mutate }] = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState(false);

  const nameRef = useRef();
  const pronounsRef = useRef();
  const bioRef = useRef();

  const symbolRef = useRef();
  const themeHighlightRef = useRef();
  const themeBackgroundColorRef = useRef();

  const profilePictureRef = useRef();
  const [msg, setMsg] = useState({ message: "", isError: false });

  useEffect(() => {
    nameRef.current.value = user.name;
    pronounsRef.current.value = user.nouns;
    themeBackgroundColorRef.current.value = user.themeBackground;
    {
      /* themeHighlightColorRef.current.value = user.themeHighlight; */
    }
    symbolRef.current.value = user.symbol;
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = new FormData();
    if (profilePictureRef.current.files[0]) {
      formData.append("profilePicture", profilePictureRef.current.files[0]);
    }
    formData.append("name", nameRef.current.value);
    const res = await fetch("/api/user", {
      method: "PATCH",
      body: formData,
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      setMsg({ message: "Profile updated" });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
    setIsUpdating(false);
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    const body = {
      oldPassword: e.currentTarget.oldPassword.value,
      newPassword: e.currentTarget.newPassword.value,
    };
    e.currentTarget.oldPassword.value = "";
    e.currentTarget.newPassword.value = "";

    const res = await fetch("/api/user/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setMsg({ message: "Password updated" });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  async function sendVerificationEmail() {
    const res = await fetch("/api/user/email/verify", {
      method: "POST",
    });
    if (res.status === 200) {
      setMsg({ message: "An email has been sent to your mailbox" });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
      <style jsx>{`
        .feeds {
          margin: auto;
          margin-top: 5rem;
          width: 500px;
        }
        .tab-container {
          display: inline-block;
        }
        .tab-links {
          display: inline-block;
        }
      `}</style>
      <Head>
        <title>Settings</title>
      </Head>
      <section>
        {msg.message ? (
          <p
            style={{
              color: msg.isError ? "red" : "#0070f3",
              textAlign: "center",
            }}
          >
            {msg.message}
          </p>
        ) : null}
        {!user.emailVerified ? (
          <p>
            Your email has not been verify. {/* eslint-disable-next-line */}
            <button>
              <a role="button" onClick={sendVerificationEmail}>
                Send verification email
              </a>
            </button>
          </p>
        ) : null}

        {/* todo: @will Add Slack Channel ID and Name */}
        {/* todo: @will background iamge */}

        <Tabs disableInlineStyles={false} className="tabs">
          <div className="tab-container">
            <div className="tab-links">
              <TabLink to="tab1">Profile</TabLink>
            </div>
            <div className="tab-links">
              <TabLink to="tab2">Tiny Factories</TabLink>
            </div>
            <div className="tab-links">
              <TabLink to="tab3">Privacy</TabLink>
            </div>
            <div className="tab-links">
              <TabLink to="tab4">Membership</TabLink>
            </div>
          </div>
          <div className="fl w-50">
            <TabContent for="tab1">
              <div className="w-100 w-50-ns">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">
                    Name
                    <input
                      required
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      ref={nameRef}
                    />
                  </label>
                  <label htmlFor="pronouns">
                    Pronouns
                    <input
                      required
                      id="pronouns"
                      name="pronouns"
                      type="text"
                      placeholder="pronouns"
                      ref={pronounsRef}
                    />
                  </label>
                  <label htmlFor="avatar">
                    Profile picture
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      ref={profilePictureRef}
                    />
                  </label>
                  <label htmlFor="pronouns">
                    Symbol
                    <input
                      required
                      id="symbol"
                      name="symbol"
                      type="text"
                      placeholder="☺︎"
                      ref={symbolRef}
                    />
                  </label>
                  <label htmlFor="pronouns">
                    themeBackgroundColor
                    <input
                      required
                      id="themeBackgroundColor"
                      name="themeBackgroundColor"
                      type="text"
                      placeholder="#FFFFFF"
                      ref={themeBackgroundColorRef}
                    />
                  </label>
                  {/* <label htmlFor="pronouns">
                    themeHighlightColor
                    <input
                      required
                      id="themeHighlightColor"
                      name="themeHighlightColor"
                      type="text"
                      placeholder="#000000"
                      ref={themeHighlightColorRef}
                    />
                  </label> */}
                  <button disabled={isUpdating} type="submit">
                    Save
                  </button>{" "}
                </form>
              </div>
            </TabContent>
            <TabContent for="tab2">
              <div className="w-100 w-50-ns">
                <form onSubmit={handleSubmit}>
                  <h2>Coming Soon</h2>
                  <label htmlFor="tinyprofilecard">
                    TinyProfile Card
                    <input
                      type="file"
                      id="tinyProfileCard"
                      name="tinyProfileCard"
                      accept="image/png, image/jpeg"
                      ref={profilePictureRef}
                    />
                  </label>
                  <button disabled={isUpdating} type="submit">
                    Save
                  </button>
                </form>
              </div>
            </TabContent>
            <TabContent for="tab3">
              <div className="w-100 w-50-ns">
                <p>account password</p>

                <form onSubmit={handleSubmitPasswordChange}>
                  <label htmlFor="oldpassword">
                    Old Password
                    <input
                      type="password"
                      name="oldPassword"
                      id="oldpassword"
                      required
                    />
                  </label>
                  <label htmlFor="newpassword">
                    New Password
                    <input
                      type="password"
                      name="newPassword"
                      id="newpassword"
                      required
                    />
                  </label>

                  <button type="submit">Change Password</button>
                </form>
                <p>password protext profile</p>
                <p>delete account</p>
              </div>
            </TabContent>
            <TabContent for="tab4">
              <div className="w-100 w-50-ns">
                <form onSubmit={handleSubmit}>
                  <h2>Coming Soon</h2>
                  <button disabled={isUpdating} type="submit">
                    Save
                  </button>
                </form>
              </div>
            </TabContent>
          </div>
        </Tabs>
      </section>
    </>
  );
};

const SettingPage = () => {
  const [user] = useCurrentUser();

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    );
  }
  return (
    <>
      <h1>Settings</h1>
      <ProfileSection />
    </>
  );
};

export default SettingPage;
