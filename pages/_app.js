import App from "next/app";
import Head from "next/head";
import "../styles/main.scss";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
          <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;