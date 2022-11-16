import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from './../img/logo.svg'

export default function Header({ submenuones, submenutwos }) {


  const [subtoogle, setSubtoogle] = React.useState(false);
  const [subtoogle2, setSubtoogle2] = React.useState(false);
  // 
  const [toggle, setToggle] = React.useState(false);
  
  React.useEffect(() => {
  if (toggle) {
    document.querySelector("body").classList.add("body--overlay")
  } else {
    document.querySelector("body").classList.remove("body--overlay")
  }

  })

  // 
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // 
  return (
    <header className={scroll < 100 ? "header" : "header scrolled"}>
        <div className="container">
          <div className="header__inner">
            <Link href="/" className="logo">
              <Image src={Logo} alt="Logo VZKportal" />
            </Link>

            <div className={toggle && window.innerWidth < 1024 ? "header-nav header-nav--active" : "header-nav"}>
              <div className="header-nav__content">
                <div className={subtoogle2 && window.innerWidth < 1024 ? "header-nav__item header-nav__item--submenu header-nav__item--active" : "header-nav__item header-nav__item--submenu"} onClick={() => setSubtoogle2(!subtoogle2)}>
                {/* <div className={resize} onClick={() => setSubtoogle2(!subtoogle2)}> */}
                  <Link href="/illness" className="header-nav__link"><span>О заболевании</span></Link>
                  <div className={subtoogle2 && window.innerWidth < 1024 ? "header-nav__submenu--active" : "header-nav__submenu"}>
                  {/* <div className={resize2}> */}
                    {/*  */}
                    {submenuones.map((submenuone) =>
                      <div className="header-nav__submenu-item" key={submenuone.id}>
                        <Link href={`illnesses/${submenuone.attributes.slug}`} className="header-nav__submenu-link">
                          <div className="header-nav__submenu-link-prew">
                            <Image 
                                  width={submenuone.attributes.Pic.data.attributes.width}
                                  height={submenuone.attributes.Pic.data.attributes.height}
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + submenuone.attributes.Pic.data.attributes.url} 
                                  alt={submenuone.attributes.Pic.data.attributes.alternativeText || ""}
                            />
                          </div>
                          <div className="header-nav__submenu-link-content">
                            <div className="header-nav__submenu-link-title">{submenuone.attributes.Title}</div>
                            <div className="header-nav__submenu-link-text">{submenuone.attributes.Description}</div>
                          </div>
                        </Link>
                      </div>
                    )}
                    {/*  */}
                  </div>
                </div>
                <div className={subtoogle && window.innerWidth < 1024 ? "header-nav__item header-nav__item--submenu header-nav__item--active" : "header-nav__item header-nav__item--submenu"} onClick={() => setSubtoogle(!subtoogle)}>
                  <p style={{cursor: "pointer"}} className="header-nav__link"><span>Пациентам</span></p>
                  <div className={subtoogle && window.innerWidth < 1024 ? "header-nav__submenu--active" : "header-nav__submenu"}>
                    {/*  */}
                    {submenutwos.map((submenutwo) =>
                        <div className="header-nav__submenu-item" key={submenutwo.id}>
                          <Link href={submenutwo.attributes.Link} className="header-nav__submenu-link">
                            <div className="header-nav__submenu-link-prew">
                              <Image 
                                  width={submenutwo.attributes.Pic.data.attributes.width}
                                  height={submenutwo.attributes.Pic.data.attributes.height}
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + submenutwo.attributes.Pic.data.attributes.url} 
                                  alt={submenutwo.attributes.Pic.data.attributes.alternativeText || ""}
                              />
                            </div>
                            <div className="header-nav__submenu-link-content">
                              <div className="header-nav__submenu-link-title">{submenutwo.attributes.Title}</div>
                              <div className="header-nav__submenu-link-text">{submenutwo.attributes.Description}</div>
                            </div>
                          </Link>
                        </div>
                    )}
                    {/*  */}
                  </div>
                </div>
                <div className="header-nav__item"><Link href="/community" className="header-nav__link">Community</Link></div>
                <div className="header-nav__item"><Link href="/news" className="header-nav__link">Новости</Link></div>
                <div className="header-nav__item header-nav__item--mobile"><Link href="/" className="header-nav__link">Главная</Link></div>
                <div className="header-nav__item header-nav__item--mobile"><Link href="/about" className="header-nav__link">О нас</Link></div>
                <div className="header-nav__item header-nav__item--mobile"><Link href="/contacts" className="header-nav__link">Контакты</Link></div>
              </div>
              <div className="social">
                <div className="social__item">
                  <Link href="/" className="social__link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1504 8.7002C10.2404 8.7002 8.69043 10.2502 8.69043 12.1602C8.69043 14.0702 10.2404 15.6202 12.1504 15.6202C14.0604 15.6202 15.6104 14.0702 15.6104 12.1602C15.6104 10.2502 14.0604 8.7002 12.1504 8.7002Z" fill="#4896D2"/>
                            <path d="M16.53 2H7.78C4.59 2 2 4.59 2 7.78V16.53C2 19.72 4.59 22.31 7.78 22.31H16.53C19.72 22.31 22.31 19.72 22.31 16.53V7.78C22.31 4.59 19.72 2 16.53 2ZM12.15 17.36C9.28001 17.36 6.95 15.03 6.95 12.16C6.95 9.29 9.28001 6.96 12.15 6.96C15.02 6.96 17.35 9.29 17.35 12.16C17.36 15.03 15.02 17.36 12.15 17.36ZM17.58 7.91C16.89 7.91 16.33 7.35 16.33 6.66C16.33 5.97 16.89 5.41 17.58 5.41C18.27 5.41 18.83 5.97 18.83 6.66C18.83 7.35 18.27 7.91 17.58 7.91Z" fill="#4896D2"/>
                            <path d="M12.1504 15.6202C10.2404 15.6202 8.69043 14.0702 8.69043 12.1602C8.69043 10.2502 10.2404 8.7002 12.1504 8.7002C14.0604 8.7002 15.6104 10.2502 15.6104 12.1602C15.6104 14.0702 14.0604 15.6202 12.1504 15.6202Z" fill="#4896D2"/>
                        </svg>
                  </Link>
                </div>
                <div className="social__item">
                  <Link href="/" className="social__link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7453 18.946H13.1772C13.1772 18.946 13.6068 18.8937 13.8318 18.6531C14.0363 18.4335 14.0261 18.0046 14.0261 18.0046C14.0261 18.0046 13.9954 16.038 14.8955 15.7452C15.7751 15.4627 16.9103 17.6489 18.107 18.4858C19.0172 19.1238 19.7025 18.9879 19.7025 18.9879L22.9038 18.946C22.9038 18.946 24.5811 18.8414 23.7834 17.492C23.722 17.377 23.3231 16.4983 21.4003 14.6677C19.3854 12.764 19.6616 13.0673 22.0856 9.77231C23.5584 7.76393 24.1516 6.54007 23.9675 6.00659C23.7936 5.50449 22.7095 5.64048 22.7095 5.64048L19.0991 5.6614C19.0991 5.6614 18.8331 5.61956 18.6286 5.74508C18.4343 5.86015 18.3115 6.14257 18.3115 6.14257C18.3115 6.14257 17.7388 7.70116 16.9819 9.01916C15.3762 11.8121 14.7318 11.9585 14.4659 11.7807C13.8522 11.3727 14.0057 10.1593 14.0057 9.29113C14.0057 6.58191 14.4045 5.46265 13.2283 5.16976C12.8397 5.07562 12.5431 5.01286 11.5408 5.0024C10.2521 4.99194 9.16793 5.0024 8.54404 5.31621C8.13493 5.52542 7.81787 5.97521 8.0122 6.00659C8.24744 6.03797 8.78951 6.15303 9.07588 6.55053C9.44408 7.06308 9.43386 8.22418 9.43386 8.22418C9.43386 8.22418 9.64864 11.4041 8.9327 11.8016C8.44177 12.0736 7.77696 11.5192 6.34508 8.98778C5.60868 7.6907 5.05639 6.25764 5.05639 6.25764C5.05639 6.25764 4.95411 5.98567 4.75978 5.84968C4.52454 5.67186 4.20748 5.61956 4.20748 5.61956L0.781193 5.64048C0.781193 5.64048 0.269807 5.65094 0.0754803 5.88107C-0.0881634 6.07981 0.0652524 6.50869 0.0652524 6.50869C0.0652524 6.50869 2.74492 12.9313 5.79278 16.174C8.57473 19.1448 11.7453 18.946 11.7453 18.946Z" fill="#4896D2"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <button className="btn-reset mobile-menu-btn" onClick={() => setToggle(!toggle)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
  )
}