// standart imports
import React from "react";
import Image from 'next/image'
import Link from 'next/link'
// for data
import axios from 'axios'
import { fetchAPI } from "../../lib/api";
// Components
import Seo from "../../components/news/seo";
import Layout from "../../components/layout";
import { Content } from "../../components/content";
// Fons
import IMGF1 from '../../img/fons/dec-bottom.svg'
import IMGF2 from '../../img/fons/dec-bottom.svg'

const Article = ({ articlemain, categories, submenuones, submenutwos }) => {

  const [articles, setArticles] = React.useState([])

  const [currentPage, setCurrentPage] = React.useState(0)
  const [fetching, setFetching] = React.useState(true)


  React.useEffect(() => {
    if (fetching) {
      axios.get(`https://strapi.vzk.ru/api/articlemains?pagination[pageSize]=2&pagination[page]=${currentPage}&populate=*`)
        .then(res => {
          setArticles([...articles, ...res.data.data])
          setCurrentPage(prevState => prevState + 1)
        })
        .finally(() => setFetching(false))
    }

    
  }, [fetching])


  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function() {
      document.removeEventListener("scroll", scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  return (
    <Layout categories={categories.data} submenuones={submenuones} submenutwos={submenutwos}>
      <Seo article={articlemain} />
      <main className="main tb">
        <div className="container-narrow tb__content">
          <h1 className="tb__title">{articlemain.attributes.Title}</h1>
          {articlemain.attributes?.Content.map((illt) => (
            <Content content={illt} />
          ))}
        </div>
        <section className="ta-grid ta-grid--gray">
            <div className="container-narrow">
              <div className="tb__subtitle">Читайте также</div>
            </div>
            <div className="container-narrow ta-grid__inner ">
              {articles.map((article) => 
                <Link href={`/article/${article.attributes.slug}`} className="article" key={article.id}>
                  <div className="article__prew">
                      <Image 
                        width={article.attributes.Pic.data.attributes.width}
                        height={article.attributes.Pic.data.attributes.height}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + article.attributes.Pic.data.attributes.url} 
                        alt={article.attributes.Pic.data.attributes.alternativeText || ""}
                      />
                  </div>
                  <div className="article__title">{article.attributes.Title}</div>
                  <div className="article__text">{article.attributes.Description}</div>
                  <div className="article__read-more">
                      <span>Читать полностью</span>
                      <svg width="43" height="13" viewBox="0 0 43 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M35.9697 0.929143C36.2626 0.636249 36.7374 0.636249 37.0303 0.929143L42.0708 5.96957C42.3636 6.26246 42.3636 6.73733 42.0708 7.03023L37.0303 12.0707C36.7374 12.3635 36.2626 12.3635 35.9697 12.0707C35.6768 11.7778 35.6768 11.3029 35.9697 11.01L39.7298 7.2499H1C0.585786 7.2499 0.25 6.91411 0.25 6.4999C0.25 6.08568 0.585786 5.7499 1 5.7499H39.7298L35.9697 1.9898C35.6768 1.69691 35.6768 1.22204 35.9697 0.929143Z" fill="#4896D2"/>
                      </svg>
                  </div>
                </Link>
              )}

            </div>

            <Image src={IMGF1} alt="dec-top" className="tb__dec-top" />
            <Image src={IMGF2} alt="dec-bottom" className="tb__dec-bottom" />
          </section>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articlemainsRes = await fetchAPI("/articlemains", { fields: ["slug"] });

  return {
    paths: articlemainsRes.data.map((articlemain) => ({
      params: {
        slug: articlemain.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {

  const articlemainsRes = await fetchAPI("/articlemains", {
    filters: {
      slug: params.slug,
    },
    populate: "deep,5"
  });
  const categoriesRes = await fetchAPI("/categories");

  const [submenuonesRes, submenutwosRes  ] = await Promise.all([
    fetchAPI("/submenuones", { populate: "*" }),
    fetchAPI("/submenutwos", { populate: "*" }),
  ]);

  

  return {
    props: {
      articlemain: articlemainsRes.data[0], 
      categories: categoriesRes,
      submenuones: submenuonesRes.data,
      submenutwos: submenutwosRes.data,
    },
    revalidate: 1,
  };
}

export default Article;