import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import IMGS2 from '../img/whatisit-img.png'

import IMGS3P1 from '../img/base-card-1.png'
import IMGS3P2 from '../img/base-card-2.png'

import IMGS4P1 from '../img/info-1.png'
import IMGS4P2 from '../img/info-2.png'
import IMGS4P3 from '../img/info-3.png'

import IMGF1P1 from '../img/fons/dec-top.svg'
import IMGF1P2 from '../img/fons/dec-bottom.svg'

import IMGL1 from '../img/fons/line-1.png'
import IMGL2 from '../img/fons/line-2.png'


import axios from 'axios'
import { fetchAPI } from "../lib/api";


import Layout from '../components/layout'
import Moment from 'react-moment'
export default function Home({ submenuones, submenutwos, article, articles }) {
  // console.log(submenuones[0].attributes.Pic.data.attributes)
  // console.log(articles.map((item) => item.attributes.Pic.data?.attributes))
  return (
    <Layout submenuones={submenuones} submenutwos={submenutwos}>
      <Head>
        <title>VZK</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="./../public/favicon.png" />
      </Head>

      <main className='main'>

        <section className="main-first-screen">
          <div className="container">
            <div className="main-first-screen__subtitle">онлайн платформа</div>
            <h1 className="main-first-screen__title">Для всех, кто столкнулся с Болезнью крона или язвенным колитом</h1>
            <div className="main-first-screen__desc">Поможем узнать о заболевании и улучшить качество жизни</div>
          </div>
        </section>

        <section className="whatisit">
          <div className="container whatisit__inner">
            <div className="whatisit__wrap">
              <Image src={IMGS2} alt="whatisit-img" className="whatisit__img" />
              <div className="whatisit__content">
                <div className="whatisit__title">Что такое ВЗК</div>
                <div className="whatisit__desc">Среди всех заболеваний желудочно-кишечного тракта 3 место занимают воспалительные заболевания кишечника (ВЗК).</div>
              </div>
            </div>
            <div className="whatisit__link">
              <p className="whatisit__link-title">Выделяют 3 основные формы ВЗК:</p>
              <div className="whatisit__link-wrap">
                <a href="#" className="whatisit__link-item">Болезнь Крона</a>
                <a href="#" className="whatisit__link-item">Язвенный колит</a>
                <a href="#" className="whatisit__link-item">Микроскопический колит</a>
              </div>
            </div>
          </div>
        </section>

        <section className="base-card">
          <div className="container base-card__grid">
            <a href="#" className="base-card__item">
              <div className="base-card__title">Как получить диагноз?</div>
              <div className="base-card__desc">Этапы диагностики болезни Крона и Язвенного колита</div>
              <Image src={IMGS3P1} alt="desc img" className="base-card__item-img" />
            </a>
            <a href="#" className="base-card__item">
              <div className="base-card__title">Новый диагноз</div>
              <div className="base-card__desc">Столкнувшись с заболеванием можно растеряться. Наша информация поможет вам разобраться с первыми шагами</div>
              <Image src={IMGS3P2} alt="desc img" className="base-card__item-img" />
            </a>
          </div>
        </section>

        <section className="info">
          <div className="container">
            <h2 className="info__title">Узнайте больше о заболевании</h2>
            <div className="info__grid">
              <a href="#" className="info__item">
                <div className="info__item-img">
                  <Image src={IMGS4P1} alt="info-1" />
                </div>
                <div className="info__item-name">Язвенный <br /> колит</div>
              </a>
              <a href="#" className="info__item">
                <div className="info__item-img">
                  <Image src={IMGS4P2} alt="info-2" />
                </div>
                <div className="info__item-name">Болезнь <br /> Крона</div>
              </a>
              <a href="#" className="info__item">
                <div className="info__item-img">
                  <Image src={IMGS4P3} alt="info-3" />
                </div>
                <div className="info__item-name">Микроскопический <br /> колит</div>
              </a>
            </div>
          </div>
        </section>

        <section className="info-mini">
          <div className="container info-mini__grid">
            {submenuones.length > 5 ?
              submenuones.map((submenuone) => 
                <Link href={`/illnesses/${submenuone.attributes.Link}`} className="info-mini__item">
                  <Image 
                    width={submenuone.attributes.Pic.data.attributes.width}
                    height={submenuone.attributes.Pic.data.attributes.height}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + submenuone.attributes.Pic.data.attributes.url} 
                    alt={submenuone.attributes.Pic.data.attributes.alternativeText || ""}
                    className="info-mini__icon"
                  />
                  <div className="info-mini__name">{submenuone.attributes.Title}</div>
                </Link>
              ).splice(0, 5)
              :
              submenuones.map((submenuone) => 
                <Link href={`/illnesses/${submenuone.attributes.Link}`} className="info-mini__item">
                  <Image 
                    width={submenuone.attributes.Pic.data.attributes.width}
                    height={submenuone.attributes.Pic.data.attributes.height}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + submenuone.attributes.Pic.data.attributes.url} 
                    alt={submenuone.attributes.Pic.data.attributes.alternativeText || ""}
                    className="info-mini__icon"
                  />
                  <div className="info-mini__name">{submenuone.attributes.Title}</div>
                </Link>
              )
            }
          </div>
        </section>

        <section className="news">
          <div className="container">
            
            <h2 className="news__title">Некоторые новости из сферы ВЗК</h2>
          </div>
          <div className="container news__inner">
              {article.length === 0 ? 
                <div className="news__item2">
                  <a href="#" className="news__item2-prew">
                      <Image 
                        width={articles[0].attributes.Pic.data.attributes.width}
                        height={articles[0].attributes.Pic.data.attributes.height}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + articles[0].attributes.Pic.data.attributes.url} 
                        alt={articles[0].attributes.Pic.data.attributes.alternativeText || ""}
                      />
                  </a>
                  <div className="news__item2-content">
                    <div className="news__item2-header">
                      <Moment  format='DD MMM YYYY' className="news__item2-date">
                        {articles[0].attributes.publishedAt}
                      </Moment>
                      <Link href={`/article/${articles[0].attributes.slug}`} className="news__item2-name">{articles[0].attributes.Title}</Link>
                    </div>
                    <div className="news__item2-text">{articles[0].attributes.Description}</div>
                    <Link href="/news" className="btn-two">Читать все новости</Link>
                  </div>
                </div>
                :
                <div className="news__item2">
                  <a href="#" className="news__item2-prew">
                      <Image 
                        width={article[0].attributes.Pic.data.attributes.width}
                        height={article[0].attributes.Pic.data.attributes.height}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + article[0].attributes.Pic.data.attributes.url} 
                        alt={article[0].attributes.Pic.data.attributes.alternativeText || ""}
                      />
                  </a>
                  <div className="news__item2-content">
                    <div className="news__item2-header">
                      <Moment  format='DD MMM YYYY' className="news__item2-date">
                        {article[0].attributes.publishedAt}
                      </Moment>
                      <Link href={`/article/${article[0].attributes.slug}`} className="news__item2-name">{article[0].attributes.Title}</Link>
                    </div>
                    <div className="news__item2-text">{article[0].attributes.Description}</div>
                    <Link href="/news" className="btn-two">Читать все новости</Link>
                  </div>
                </div>
              }

            <div className="news__wrap">
              
              { articles.map((item) => 
                <Link href={`/article/${item.attributes.slug}`} className="news__item">
                  <div className="news__item-prew">
                    <Image 
                      width={item.attributes.Pic.data.attributes.width}
                      height={item.attributes.Pic.data.attributes.height}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + item.attributes.Pic.data.attributes.url} 
                      alt={item.attributes.Pic.data.attributes.alternativeText || ""}
                    />
                  </div>
                  <div className="news__item-content">
                    <div className="news__item-header">
                      <Moment  format='DD MMM YYYY' className="news__item-date">
                        {item.attributes.publishedAt}
                      </Moment>
                      <div className="news__item-name">{item.attributes.Title}</div>
                    </div>
                    <div className="news__item-text">{item.attributes.Description}</div>
                  </div>
                </Link>
              ).splice(1, 2)}
              
            </div>

            <Link href="/" className="btn-two news__btn">Читать все новости</Link>
          </div>

          <Image src={IMGF1P1} alt="dec-top" className="tb__dec-top" />
          <Image src={IMGF1P2} alt="dec-bottom" className="tb__dec-bottom" />
        </section>

        <Image src={IMGL1} alt="decore-line-1" className="decore-line-1" />
        <Image src={IMGL2} alt="decore-line-2" className="decore-line-2" />
      </main>
    </Layout>
  )
}



export async function getStaticProps() {
  // Run API calls in parallel
  const [submenuonesRes, submenutwosRes] = await Promise.all([
    fetchAPI("/submenuones", { populate: "*" }),
    fetchAPI("/submenutwos", { populate: "*" }),
  ]);
  const articlesRes = await fetchAPI("/articlemains", {
    sort: "publishedAt:desc",
    populate: "*",
    pagination: {
      page: 1,
      pageSize: 3,
    },
  });

  const articlemainRes = await fetchAPI("/articlemains", {
    filters: {
      Main: true,
    },
    populate: "*"
  });

  


  return {
    props: {
      submenuones: submenuonesRes.data,
      submenutwos: submenutwosRes.data,
      articles: articlesRes.data,
      article: articlemainRes.data,
      
    },
    revalidate: 1,
  };
}