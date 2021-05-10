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
      <footer className="fl w-100">
        <Link href="https://tinyfactories.space">
          <a>Crafted by Tiny Factories ↗</a>
        </Link>
        <div>
          <Link href="/code-of-conduct">
            <a className="nav-item">Code of Conduct</a>
          </Link>
          <Link href="/privacy">
            <a className="nav-item">Privacy</a>
          </Link>
          <Link href="https://buttondown.email/TinyGarden/rss">
            <a className="nav-item">RSS ↗</a>
          </Link>
          <Link href="https://buttondown.email/TinyGarden">
            <a className="nav-item">Newsletter ↗</a>
          </Link>
          <Link href="https://github.com/tiny-factories/tiny-garden">
            <a className="nav-item">GitHub ↗</a>
          </Link>
          <Link href="/carbon">
            <a className="nav-item">Carbon ↗</a>
          </Link>
        </div>
      </footer>
    </>
  );
}
