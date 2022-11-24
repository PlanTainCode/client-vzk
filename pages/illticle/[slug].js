import React from "react";
// for data
import { fetchAPI } from "../../lib/api";
// Components
import Layout from "../../components/layout";
import { Content } from "../../components/content";
import Head from "next/head";

const Illticle = ({ illticle, submenuones, submenutwos }) => {


  return (
    <>
      <Head>
        <title>{illticle?.attributes.Title} | ВЗК</title>
        <meta property="og:title" content={illticle?.attributes.Title} />
        <meta property="og:site_name" content={illticle?.attributes.Title} />
        <meta property="og:url" content={'https://vzk.ru/illticle/' + illticle?.attributes.slug} />
        <meta property="og:description" content={illticle?.attributes.Description} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + illticle?.attributes.Pic.data.attributes.url} />
      </Head>
      <Layout submenuones={submenuones} submenutwos={submenutwos}>
        <main className="main tb">
          <div className="container-narrow tb__content">
            <h1 className="tb__title">{illticle?.attributes.Title}</h1>
            {illticle?.attributes.Content.map((illt) => (
              <Content content={illt} />
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const illticlesRes = await fetchAPI("/illticles", { fields: ["slug"] });

  return {
    paths: illticlesRes.data.map((illticle) => ({
      params: {
        slug: illticle.attributes.slug,
      },
    })),
    fallback: false,
    // fallback: true,
  };
}

export const getStaticProps = async ({ params }) => {

  const illticlesRes = await fetchAPI("/illticles", {
    filters: {
      slug: params.slug,
    },
    populate: "deep,5"
  });

  const [submenuonesRes, submenutwosRes  ] = await Promise.all([
    fetchAPI("/submenuones", { populate: "*" }),
    fetchAPI("/submenutwos", { populate: "*" }),
  ]);

  

  return {
    props: {
      illticle: illticlesRes.data[0],
      submenuones: submenuonesRes.data,
      submenutwos: submenutwosRes.data,
    },
    revalidate: 1,
  };
}

export default Illticle;