import Head from "next/head";

const Seo = ({ article }) => {

  return (
    <Head>
        <title>{article.attributes.Title}</title>
        <meta property="og:title" content={article.attributes.Title} />
        <meta name="twitter:title" content={article.attributes.Title} />

        <meta name="description" content={article.attributes.Description} />
        <meta property="og:description" content={article.attributes.Description} />
        <meta name="twitter:description" content={article.attributes.Description} />

        <meta property="og:image" content={'http://localhost:1337' + article.attributes.Pic.data.attributes.url} />
        <meta name="twitter:image" content={'http://localhost:1337' + article.attributes.Pic.data.attributes.url} />
        <meta name="image" content={'http://localhost:1337' + article.attributes.Pic.data.attributes.url} />
    </Head>
  );
};

export default Seo;