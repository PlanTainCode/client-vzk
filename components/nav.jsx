import React from "react";
import Link from "next/link";

const Nav = ({ categories }) => {
  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <span>Strapi Blog</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link href={`/category/${category.attributes.slug}`}>
                    <span className="uk-link-reset">{category.attributes.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;