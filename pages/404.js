import React from "react"
import Image from "next/image"
import Link from "next/link"
import IMGF1 from '../img/fons/decore-404-line-1.png'
import IMGF2 from '../img/fons/decore-404-line-2.png'
import Error from "../components/404"


export default function Custom404() {

    React.useEffect(() => {
        document.querySelector("body").classList.add("page-404")
    })
    


    return (
        <div className="page-404__wrapper">
            <Error />
            <h1 className="page-404__title">Упс... Страница не найдена</h1>
            <p className="page-404__desc">Что-то пошло не по плану, но мы обязательно разберемся с этим недоразумением!</p>
            <Link href="/" className="btn">Вернуться на главную</Link>

            <Image src={IMGF1} alt="decore-404-line-1" className="page-404__decore-1" />
            <Image src={IMGF2} alt="decore-404-line-2" className="page-404__decore-2" />
        </div>
        
)}