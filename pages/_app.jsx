import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import "../styles/base.css";
import "../styles/tinyfactories.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>🌱 Tiny Garden</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
