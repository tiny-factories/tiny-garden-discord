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
            padding: 15px;
            width: 100%;
            background: #eaf9ff;
            border: 1px solid #2860cc;
            border-radius: 3px;
          }
          .meta {
            width: 100%;
          }
          textarea {
            width: 100%;
            background: #ffffff;
            border: 1px solid #2860cc;
            border-radius: 3px;
            font-family: IBMPlexMono;
            font-size: 18px;
            color: #000000;
          }
          input {
            width: 70%;
            background: #ffffff;
            border: 1px solid #2860cc;
            border-radius: 3px;
            font-family: IBMPlexMono;
            font-size: 18px;
            color: #000000;
          }
          select {
          }
          .select-selected {
            background-color: DodgerBlue;
          }

          /*style the arrow inside the select element:*/
          .select-selected:after {
            position: absolute;
            content: "";
            top: 14px;
            right: 10px;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-color: #fff transparent transparent transparent;
          }

          /*point the arrow upwards when the select box is open (active):*/
          .select-selected.select-arrow-active:after {
            border-color: transparent transparent #fff transparent;
            top: 7px;
          }

          /*style the items (options), including the selected item:*/
          .select-items div,
          .select-selected {
            color: #ffffff;
            padding: 8px 16px;
            border: 1px solid transparent;
            border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
            cursor: pointer;
            user-select: none;
          }

          /*style items (options):*/
          .select-items {
            position: absolute;
            background-color: DodgerBlue;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 99;
          }

          /*hide the items when the select box is closed:*/
          .select-hide {
            display: none;
          }

          .select-items div:hover,
          .same-as-selected {
            background-color: rgba(0, 0, 0, 0.1);
          }
          button {
            width: 30%;
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
            <label htmlFor="inPlaylists">
              <select id="postType">
                <option name="inPlaylists" value="Blog">
                  Blog
                </option>
                <option name="inPlaylists" value="Changelog">
                  Changelog
                </option>
              </select>
            </label>
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
