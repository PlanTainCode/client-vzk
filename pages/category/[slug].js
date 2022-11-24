import Layout from "../../components/layout";
import Newcats from "../../components/newcats";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { fetchAPI } from "../../lib/api";

const Category = ({ submenuones, submenutwos, category, categories }) => {

  return (
    <>
      <Head>
        <title>Новости | ВЗК</title>
        <meta property="og:title" content="Новости" />
        <meta property="og:site_name" content="Новости" />
        <meta property="og:description" content="Здесь вы можете почитать самые из сферы ВЗК" />
      </Head>
      <Layout categories={categories.data} submenuones={submenuones} submenutwos={submenutwos} classNameForDiv={`page-news`} >
        <main className='main'>
              <div className="container">
                  <h1 className="page-news__title">{category.attributes.name}</h1>
                  <Newcats categories={categories.data} />
                  <section class="ta-grid">
                      <div class="ta-grid__inner">
                          {category.attributes.articlemains.data.map((item) => 
                            <Link href={`/article/${item.attributes.slug}`} class="article" key={item.attributes.slug}>
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
                                  <span>Читать полностью</span>
                                  <svg width="43" height="13" viewBox="0 0 43 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M35.9697 0.929143C36.2626 0.636249 36.7374 0.636249 37.0303 0.929143L42.0708 5.96957C42.3636 6.26246 42.3636 6.73733 42.0708 7.03023L37.0303 12.0707C36.7374 12.3635 36.2626 12.3635 35.9697 12.0707C35.6768 11.7778 35.6768 11.3029 35.9697 11.01L39.7298 7.2499H1C0.585786 7.2499 0.25 6.91411 0.25 6.4999C0.25 6.08568 0.585786 5.7499 1 5.7499H39.7298L35.9697 1.9898C35.6768 1.69691 35.6768 1.22204 35.9697 0.929143Z" fill="#4896D2"/>
                                  </svg>
                              </div>
                            </Link>
                          )} 
                          
                      </div>
                  </section>
              </div>
          </main>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });
  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      articlemains: {
        populate: "*",
      },
    },
  });

  const allCategories = await fetchAPI("/categories", { populate: {articlemains: {
    populate: "*",
  },} });

  const [submenuonesRes, submenutwosRes,] = await Promise.all([
      fetchAPI("/submenuones", { populate: "*" }),
      fetchAPI("/submenutwos", { populate: "*" }),
  ]);
  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
      submenuones: submenuonesRes.data,
      submenutwos: submenutwosRes.data,
    },
    revalidate: 1,
  };
}

export default Category;