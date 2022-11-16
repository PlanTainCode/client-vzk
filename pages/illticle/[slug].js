import React from "react";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import Image from 'next/image'
import Link from 'next/link'
// for data
import axios from 'axios'
import { fetchAPI } from "../../lib/api";
// Components
import Seo from "../../components/news/seo";
import Layout from "../../components/layout";
import Acordion from "../../components/news/acordion";
// Fons
import IMGF1 from '../../img/fons/dec-bottom.svg'
import IMGF2 from '../../img/fons/dec-bottom.svg'

const Illticle = ({ illticle, submenuones, submenutwos }) => {


  return (
    <Layout submenuones={submenuones} submenutwos={submenutwos}>
      <Seo article={illticle} />
      <main className="main tb">
        <div className="container-narrow tb__content">
          <h1 className="tb__title">{illticle.attributes.Title}</h1>
          <article>
            <p>{illticle.attributes.Description}</p>
          </article>
        </div>
      </main>
    </Layout>
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
  };
}

export async function getStaticProps({ params }) {

  const illticlesRes = await fetchAPI("/illticles", {
    filters: {
      slug: params.slug,
    },
    populate: "*"
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