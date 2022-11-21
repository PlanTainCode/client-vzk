import React from 'react'
import ReactMarkdown from "react-markdown";
import Image from 'next/image';

const Acordion = ({acord}) => {
    const [button, setButton] = React.useState(0)
    
  return (
    <article>
      <div className={button ? "faq faq--active" : "faq"}>
            <div className="faq__button" onClick={() => setButton(!button)}>
              <span className="faq__button-text">{acord.Title}</span>
              <div className="faq__button-ind"></div>
            </div>
            {acord.Markdown.map((mark) => 
            <div className={button ? "faq__content faq__content--active" : "faq__content"}>
              <ReactMarkdown children={mark?.Text} />
              {mark.Pic.data !== null ? (
                <Image 
                  width={mark.Pic.data.attributes.width}
                  height={mark.Pic.data.attributes.height}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + mark.Pic.data.attributes.url} 
                  alt={mark.Pic.data.attributes.alternativeText || ""} 
                  style={{marginTop: "20px"}}
                />
              ) : ""}
              
            </div>
            )}
      </div>
    </article>
  )
}

export default Acordion