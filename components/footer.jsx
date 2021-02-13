import React from "react";
import { useCurrentUser } from "@/hooks/index";
import Link from "next/link";

export default function Footer({ post }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };
  return (
    <>
      <style jsx>
        {`
          .footer {
            padding: 0;
            margin-top: 20px;
            list-style: none;
            text-align: center;
          }

          .footer-item {
            display: inline-block;
            margin-right: 1em;
          }

          .footer-item a[href]:not(:hover) {
            text-decoration: none;
          }

          .footer-item a[href]:hover {
            text-decoration: none;
            font-weight: 500;
          }

          .footer-item-active {
            font-weight: 500;
          }
        `}
      </style>
      <footer className="">
        {/* <Link href="https://github.com/tiny-factories/code-of-conduct">
          <a className="nav-item">privacy /</a>
        </Link> */}
        <Link href="https://github.com/tiny-factories/code-of-conduct">
          <a className="nav-item">code of conduct /</a>
        </Link>
        <Link href="https://github.com/tiny-factories/tiny-garden">
          <a className="nav-item">source code /</a>
        </Link>
        <Link href="https://www.websitecarbon.com/website/tiny-garden/">
          <a className="nav-item">carbon</a>
        </Link>
      </footer>
    </>
  );
}
