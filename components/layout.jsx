import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";
import Navagation from "@/components/navagation";

export default function Layout({ children }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };
  return (
    <>
      <Head>
        <title>🌱 Tiny Garden</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="Tiny Garden"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta property="og:title" content="Next.js + MongoDB App" />
        <meta
          property="og:Tiny Garden"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
        <script
          async
          defer
          data-website-id="fc6b6113-ad42-45f5-99c1-a36b8667e440"
          src="https://umami.tiny-factories.vercel.app/umami.js"
        ></script>
      </Head>
      <header>
        <Navagation />
      </header>

      <main>{children}</main>
      <footer>
        <p>
          A{" "}
          <a href="https://github.com/hoangvvo/nextjs-mongodb-app">
            tiny factories
          </a>{" "}
          project based on an open source{" "}
          <a href="https://github.com/hoangvvo/nextjs-mongodb-app">project</a>.
        </p>
      </footer>
    </>
  );
}
