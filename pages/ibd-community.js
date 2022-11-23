import React from "react";
import Layout from "../components/layout";
import { fetchAPI } from "../lib/api";
import Image from "next/image";



const IbdCommunity = ({ submenuones, submenutwos, searches }) => {
  return (
    <Layout submenuones={submenuones} submenutwos={submenutwos} >
      <main className="main main--pt ta">
        <section className="group-search">
            <div className="container">
                <div className="group-search__content search">
                    <div className="search__header">
                        <h1 className="search__title">Поиск сообществ</h1>
                    </div>
                    <ul className="search__body">
                        {searches.map((search) => 
                            <li className="search__item mix" key={search.id}>
                                <article className="search__block block-search">
                                    <div className="block-search__header">
                                        <Image 
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + search.attributes.Pic.data.attributes.url} 
                                            width={search.attributes.Pic.data.attributes.width} 
                                            height={search.attributes.Pic.data.attributes.height}  
                                            alt={search.attributes.Pic.data.attributes.alternativeText}   
                                            className="block-search__img" 
                                        />
                                        <a href={search.attributes.Link} className="block-search__button"><span>Вступить</span></a>
                                        <Image 
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + search.attributes.icon.data.attributes.url} 
                                            width={search.attributes.icon.data.attributes.width} 
                                            height={search.attributes.icon.data.attributes.height}  
                                            alt={search.attributes.icon.data.attributes.alternativeText} 
                                            aria-hidden="true" 
                                            className="block-search__icon" 
                                        />
                                    </div>
                                    <h2 className="block-search__title">{search.attributes.Title}</h2>
                                    <p className="block-search__descr">{search.attributes.Description}</p>
                                    <div className="block-search__btn-cover"><a href={search.attributes.Link} className="block-search__button block-search__button--mobile"><span>Вступить</span></a></div>
                                </article>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const [submenuonesRes, submenutwosRes, searchesRes ] = await Promise.all([
    fetchAPI("/submenuones", { populate: "*" }),
    fetchAPI("/submenutwos", { populate: "*" }),
    fetchAPI("/searches", {populate: "*"}),
  ]);

  return {
    props: {
      submenuones: submenuonesRes.data,
      submenutwos: submenutwosRes.data,
      searches: searchesRes.data,
    },
    revalidate: 1,
  };
}

export default IbdCommunity;