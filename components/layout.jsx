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
          content="Tiny Garden is a public facing community around tiny factories."
        />
        <meta property="og:title" content="Tiny Garden" />
        <meta
          property="og:Tiny Garden"
          content="Tiny Garden is a public facing community around tiny factories."
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
        <div id="wcb" className="carbonbadge"></div>
        <script
          src="https://unpkg.com/website-carbon-badges@1.1.1/b.min.js"
          defer
        ></script>
      </footer>
    </>
  );
}
