import React from "react";
import Head from "next/head";
export default function Seo(props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}

Seo.defaultProps = {
  title: "Gaming- tus juegos favoritos",
  description: "tus juegos favoritos para tus plataformas favoritas",
};
