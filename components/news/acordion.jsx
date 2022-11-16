import React from 'react'
import ReactMarkdown from "react-markdown";


const Acordion = ({acord}) => {
    const [button, setButton] = React.useState(0)
    
  return (
    <div className={button ? "faq faq--active" : "faq"}>
          <div className="faq__button" onClick={() => setButton(!button)}>
            <span className="faq__button-text">{acord.Title}</span>
            <div className="faq__button-ind"></div>
          </div>
          {acord.Markdown.map((mark) => 
            <ReactMarkdown className={button ? "faq__content faq__content--active" : "faq__content"} children={mark.Text} />
          )}
    </div>
  )
}

export default Acordion