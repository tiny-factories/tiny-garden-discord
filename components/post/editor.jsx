import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/index";

export default function PostEditor() {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        {/* Please sign in to post */}
      </div>
    );
  }

  async function hanldeSubmit(e) {
    e.preventDefault();
    const body = {
      type: "post",
      content: e.currentTarget.content.value,
      url: e.currentTarget.url.value,
      discordChannelId: "",
    };
    if (!e.currentTarget.content.value) return;
    e.currentTarget.content.value = "";

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg("Posted!");
      setTimeout(() => setMsg(null), 5000);
    }
  }

  return (
    <>
      <style jsx>
        {`
          div {
            margin: auto;
            width: 500px;
          }
          input {
            background: #ffffff;
            border: 1px solid #000000;
            box-sizing: border-box;
            height: 40px;
          }
          button {
            background: #000000;
            height: 40px;
            margin-left: 0.5rem;
          }
        `}
      </style>
      <div>
        <p>{msg}</p>
        <form
          onSubmit={hanldeSubmit}
          style={{ flexDirection: "row" }}
          autoComplete="off"
        >
          <label htmlFor="name">
            <input
              name="content"
              type="text"
              placeholder="write and share a lil note, or life upddate, or sth silly"
            /> <input
            name="url"
            type="url"
            placeholder="optional url, or source"
          />
          </label>
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
}
