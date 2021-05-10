import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import "react-quill/dist/quill.snow.css";
import "tachyons/css/tachyons.css";
import "tachyons/css/tachyons.min.css";
import "@ibm/plex/css/ibm-plex-sans-kr.css";
import "@ibm/plex/css/ibm-plex-sans-kr.min.css";
import "@ibm/plex/css/ibm-plex.css";
import "@ibm/plex/css/ibm-plex.min.css";

import "../styles/base.css";
import "../styles/tinygarden.css";

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
