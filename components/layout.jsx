import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";
import Navagation from "@/components/navagation";
import Footer from "@/components/footer";

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
        <meta name="title" content="🌱 Tiny Garden" />
        <meta
          name="description"
          content="Tiny Garden is a public facing community around Tiny Factories."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://garden.tinyfactories.space/" />
        <meta property="og:title" content="🌱 Tiny Garden" />
        <meta
          property="og:description"
          content="Tiny Garden is a public facing community around Tiny Factories."
        />
        <meta property="og:image" content="/public/tinygarden-opengraph.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://garden.tinyfactories.space"
        />
        <meta property="twitter:title" content="🌱 Tiny Garden" />
        <meta
          property="twitter:description"
          content="Tiny Garden is a public facing community around Tiny Factories."
        />
        <meta
          property="twitter:image"
          content="/public/tinygarden-opengraph.png"
        />
        <script async defer data-website-id="fc6b6113-ad42-45f5-99c1-a36b8667e440" src="https://umami.tinyfactories.space/umami.js"></script>
        <script
          src="https://unpkg.com/website-carbon-badges@1.1.1/b.min.js"
          defer
        ></script>
      </Head>
      <header>
        <Navagation />
      </header>

      <main>{children}</main>
      <Footer />
    </>
  );
}
