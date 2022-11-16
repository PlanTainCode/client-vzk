import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchAPI } from "../lib/api";

import Layout from "../components/layout";

import Fone from '../img/template-img.png'

const Illness = ({ submenuones, submenutwos, illness }) => {

    console.log(submenuones)

    return (
        <Layout submenuones={submenuones} submenutwos={submenutwos}>
            <main className="main ta">

                <section className="ta-first-section">
                    <div className="container ta-first-section__inner">
                        <div className="ta-first-section__content">
                            <h1 className="ta-first-section__title">{illness.attributes.Title}</h1>
                            <p className="ta-first-section__desc">{illness.attributes.Description}</p>
                        </div>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + illness.attributes.Pic.data.attributes.url} 
                            alt={illness.attributes.Pic.data.attributes.alternativeText}  
                            width={illness.attributes.Pic.data.attributes.width}
                            height={illness.attributes.Pic.data.attributes.height}
                            className="ta-first-section__img" 
                        />
                    </div>
                </section>

                <section className="ta-grid">
                    <div className="container ta-grid__inner">
                        {submenuones.map((item) => 
                          <Link href={`illnesses/${item.attributes.slug}`} class="article">
                            <div class="article__prew">
                                <Image 
                                  width={item.attributes.Pic.data.attributes.width}
                                  height={item.attributes.Pic.data.attributes.height}
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + item.attributes.Pic.data.attributes.url} 
                                  alt={item.attributes.Pic.data.attributes.alternativeText || ""}
                                />
                            </div>
                            <div class="article__title">{item.attributes.Title}</div>
                            <div class="article__text">{item.attributes.Description}</div>
                            <div class="article__read-more">
                                <span>Перейти</span>
                                <svg width="43" height="13" viewBox="0 0 43 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M35.9697 0.929143C36.2626 0.636249 36.7374 0.636249 37.0303 0.929143L42.0708 5.96957C42.3636 6.26246 42.3636 6.73733 42.0708 7.03023L37.0303 12.0707C36.7374 12.3635 36.2626 12.3635 35.9697 12.0707C35.6768 11.7778 35.6768 11.3029 35.9697 11.01L39.7298 7.2499H1C0.585786 7.2499 0.25 6.91411 0.25 6.4999C0.25 6.08568 0.585786 5.7499 1 5.7499H39.7298L35.9697 1.9898C35.6768 1.69691 35.6768 1.22204 35.9697 0.929143Z" fill="#4896D2"/>
                                </svg>
                            </div>
                          </Link>
                        )}
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [submenuonesRes, submenutwosRes, illnessRes ] = await Promise.all([
      fetchAPI("/submenuones", { populate: "*" }),
      fetchAPI("/submenutwos", { populate: "*" }),
      fetchAPI("/illness", { populate: "*" }),
    ]);
  
    return {
      props: {
        submenuones: submenuonesRes.data,
        submenutwos: submenutwosRes.data,
        illness: illnessRes.data,
      },
      revalidate: 1,
    };
  }

export default Illness;