import React from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "../components/layout"
import { fetchAPI } from "../lib/api";

const Contacts = ({submenuones, submenutwos, conitems}) => {
    console.log(conitems)

    const [submitform, setSubmitform] = React.useState([])

    const submitForm = async (Adress, Name, Tel, Surname, Comments, Email) => {
        const result = await axios.post("https://strapi.vzk.ru/api/forms", {
            Adress: Adress,
            Name: Name,
            Tel: Tel,
            Surname: Surname,
            Comments: Comments,
            Email: Email,
        });
        setSubmitform([...submitform, result?.data])
    }
    return (
        <Layout submenuones={submenuones} submenutwos={submenutwos}>
            <main className="main main--arrow main--pt ta">
                <section className="page-contacts">
                    <div className="container">
                        <h1 className="page-contacts__title">Контакты</h1>
                        <div className="page-contacts__body">
                            <ul className="page-contacts__list">
                                {conitems.map((conitem) => 
                                    <li className="page-contacts__item item-contacts">
                                        <Link className="item-contacts__link" href={conitem.attributes.href}>
                                            <div className="item-contacts__preview">
                                                <Image 
                                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + conitem.attributes.media.data.attributes.url} 
                                                    alt={conitem.attributes.media.data.attributes.alternativeText}
                                                    width={conitem.attributes.media.data.attributes.width}
                                                    height={conitem.attributes.media.data.attributes.height}
                                                    className="item-contacts__img"
                                                />
                                            </div>
                                            <span className="item-contacts__descr">{conitem.attributes.title}</span>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            <form action="" method="POST" className="page-contacts__form form-contacts">
                                <h2 className="form-contacts__title">Связаться с нами</h2>
                                <div className="form-contacts__body">
                                    <label className="form-contacts__item">
                                        <span className="form-contacts__descr">Адрес <span className="required">*</span></span>
                                        <input type="text" className="form-contacts__input" id="Adress" name="Adress" />
                                    </label>
                                    <label className="form-contacts__item">
                                        <span className="form-contacts__descr">Имя <span className="required">*</span></span>
                                        <input type="text" className="form-contacts__input" id="Name" name="Name" />
                                    </label>
                                    <label className="form-contacts__item">
                                        <span className="form-contacts__descr">Номер телефона <span className="required">*</span></span>
                                        <input type="tel" className="form-contacts__input" placeholder="+7 (___) ___-__-__" id="Tel" name="Tel" />
                                    </label>
                                    <label className="form-contacts__item">
                                        <span className="form-contacts__descr">Фамилия <span className="required">*</span></span>
                                        <input type="text" className="form-contacts__input" id="Surname" name="Surname" />
                                    </label>
                                    <label className="form-contacts__item form-contacts__item--textarea">
                                        <span className="form-contacts__descr">Ваше обращение <span className="required">*</span></span>
                                        <textarea className="form-contacts__input" id="Comments" name="Comments"></textarea>
                                    </label>
                                    <label className="form-contacts__item">
                                        <span className="form-contacts__descr">Email <span className="required">*</span></span>
                                        <input type="mail" className="form-contacts__input" id="Email" name="Email" />
                                    </label>
                                </div>
                                <button type="submit" className="form-contacts__submit" 
                                onClick={() => {submitForm(Adress.value, Name.value, Tel.value, Surname.value, Comments.value, Email.value);
                                Adress.value = ""; Name.value = ""; Tel.value = ""; Surname.value = ""; Comments.value = ""; Email.value = ""; }}><span>Отправить</span></button>
                            </form>
                        </div>
                        <h2 className="page-contacts__subtitle">Давайте сотрудничать!</h2>
                    </div>
                </section>
            </main>
        </Layout>

    )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [submenuonesRes, submenutwosRes, conitemsRes] = await Promise.all([
      fetchAPI("/submenuones", { populate: "*" }),
      fetchAPI("/submenutwos", { populate: "*" }),
      fetchAPI("/conitems", { populate: "*" }),
    ]);
  
    return {
      props: {
        submenuones: submenuonesRes.data,
        submenutwos: submenutwosRes.data,
        conitems: conitemsRes.data,
      },
      revalidate: 1,
    };
  }

export default Contacts;