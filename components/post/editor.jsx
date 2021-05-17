import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/index";
import dynamic from "next/dynamic";
{
  /* import Dropdowns from "@/components/editor-dropdown"; */
}

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

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
          .card {
            margin: auto;
            width: 100%;
            background: #eaf9ff;
            border: 1px solid #2860cc;
            border-radius: 3px;
          }
          .meta {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
          }
          .meta > * {
            flex: 1 1 160px;
            margin: 15px;
          }
          textarea {
            margin-top: 15px;
            margin-left: 15px;
            margin-right: 15px;
            width: calc(100% - 30px);
            background: #ffffff;
            border: 1px solid #2860cc;
            border-radius: 3px;
            font-family: IBMPlexMono;
            font-size: 18px;
            color: #000000;
          }
          input {
            background: #ffffff;
            border: 1px solid #2860cc;
            border-radius: 3px;
            font-family: IBMPlexMono;
            font-size: 18px;
            color: #000000;
          }
          select {
            display: inline-block;
          }
          .select-selected {
            background-color: DodgerBlue;
          }
          label {
            display: inline-block;
          }
          button {
            font-family: IBMPlexMono;
            font-size: 18px;
            color: #000000;
            text-align: center;
            background: #ffffff;
            border: 1px solid #eaf9ff;
            border-radius: 3px;
          }
          button:hover {
          }
        `}
      </style>
      <div
        className="card"
        style={{
          background: `${user.themeBackground}`,
          border: `1px solid ${user.themeHighlight}`,
        }}
      >
        <p>{msg}</p>
        {/* <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
<QuillNoSSRWrapper value={this.state.value} modules={modules} formats={formats} theme="snow" /> */}

        <form onSubmit={hanldeSubmit} autoComplete="off">
          <label htmlFor="content">
            <textarea
              style={{
                border: `1px solid ${user.themeHighlight}`,
              }}
              name="content"
              type="text"
              placeholder="write and share a lil note, or life upddate, or sth silly"
            />
          </label>
          <div className="meta">
            <label htmlFor="url">
              <input
                name="url"
                type="url"
                placeholder="optional url, or source"
                style={{
                  border: `1px solid ${user.themeHighlight}`,
                }}
              />
            </label>
            {/* <label htmlFor="inPlaylists">
              <select id="postType">
                <option name="inPlaylists" value="Blog">
                  Blog
                </option>
                <option name="inPlaylists" value="Changelog">
                  Changelog
                </option>
              </select>
            </label> */}
            <button
              type="submit"
              style={{
                border: `1px solid ${user.themeHighlight}`,
              }}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
