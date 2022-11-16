import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import IMGF1 from '../../img/fons/dec-top.svg'
import IMGF2 from '../../img/fons/dec-bottom.svg'

const More = ({ articles }) => {
  return (
    <section className="ta-grid ta-grid--gray">
      <div className="container">
        <div className="tb__subtitle">Читайте также</div>
      </div>
      <div className="container ta-grid__inner">
        {articles.map((article) => 
          <Link href={`/article/${article.attributes.slug}`} className="article">
            <div className="article__prew">
                <Image 
                  width={article.attributes.Pic.data.attributes.width}
                  height={article.attributes.Pic.data.attributes.height}
                  src={`http://localhost:1337` + article.attributes.Pic.data.attributes.url} 
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
  )
}

export default More;