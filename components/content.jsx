import React from "react";
import Image from "next/image";
import Acordion from "./news/acordion";
import ReactMarkdown from "react-markdown";

export const Content = ({content}) => {
    console.log(content)

    return (
        <div className="content">
            {content.__component === "acordion.quote" ? (
                <div class="user">
                    <div class="user__prew">
                        <Image 
                            width={content.Pic.data.attributes.width}
                            height={content.Pic.data.attributes.height}
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + content.Pic.data.attributes.url} 
                            alt={content.Pic.data.attributes.alternativeText || ""} 
                        />
                    </div>
                    <div class="user__content">
                        <div class="user__name">{content.Title}</div>
                        <div class="user__post">{content.Who}</div>
                        <div class="user__text">{content.Description}</div>
                    </div>
                </div>
            ) : ''}
            {content.__component === "acordion.acordion" ? (<Acordion acord={content} />) : ""}
            {content.__component === "acordion.markdown" ? (
                <article>
                    <ReactMarkdown children={content.Text} />
                </article>
            ) : ""}
            {content.__component === "acordion.picture" ? (
                <article style={{width: "100%"}}>
                    <Image
                        width={content.Pic.data.attributes.width}
                        height={content.Pic.data.attributes.height}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + content.Pic.data.attributes.url} 
                        alt={content.Pic.data.attributes.alternativeText || ""} 
                        style={{width: `${content.Percent}%`}}
                    />
                </article>
            ): ""}
            {content.__component === "acordion.download" ? (
                <article>
                    <a href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + content.File.data.attributes.url} className="download">
                        <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.84468 38.0342H29.1019C30.7386 38.0342 32.0816 36.6588 32.0816 34.9829V10.0351C32.0816 8.42252 30.8313 7.09446 29.2872 7.01526V3.63217C29.2872 1.67182 27.7431 0.0908203 25.8286 0.0908203H4.84468C2.12697 0.0908203 -0.0808105 2.33589 -0.0808105 5.13404C-0.0802505 4.81921 -0.067369 9.21731 -0.0808105 32.9908C-0.0808105 35.7731 2.12697 38.034 4.84468 38.034V38.0342ZM21.7208 29.2913H16.363C15.5136 29.2913 14.8189 28.58 14.8189 27.7103C14.8189 26.8407 15.5136 26.1293 16.363 26.1293H21.7208C22.5702 26.1293 23.2649 26.8407 23.2649 27.7103C23.2646 28.5797 22.5699 29.2913 21.7208 29.2913ZM23.527 22.0822H14.5567C13.7073 22.0822 13.0126 21.3708 13.0126 20.5012C13.0126 19.6158 13.7073 18.9202 14.5567 18.9202H23.527C24.3917 18.9202 25.0711 19.6158 25.0711 20.5012C25.0711 21.3705 24.3917 22.0822 23.527 22.0822ZM4.84432 3.25312H25.8282C26.0287 3.25312 26.1987 3.41139 26.1987 3.63246V7.00006H4.84418C2.6994 6.99978 2.25838 3.25312 4.84418 3.25312H4.84432ZM3.02243 9.814H3.05324C3.44892 9.99434 4.13193 10.1618 4.8443 10.1618H6.01791L6.01763 34.8718H4.8443C3.84038 34.8718 3.007 34.034 3.007 32.9906C3.0084 30.6208 3.00112 41.5757 3.02241 9.81394L3.02243 9.814Z" fill="#4896D2"/>
                        </svg>
                        <span className="download__span">?????????????????????? ???????????????? c ?????????????????? ??????????????????</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 13V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V13M15 8L10 13M10 13L5 8M10 13V1" stroke="#4896D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </article>
            ) : ""}
            
        </div>
    )
}