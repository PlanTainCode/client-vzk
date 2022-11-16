import React from "react";
import Link from "next/link";

const Newcats = ({ categories }) =>  (
    <div className="news-cat">
        {categories.map((category) => 
            <Link key={category.id} href={`/category/${category.attributes.slug}`} className="news-cat__link">{category.attributes.name}</Link>
        )}
    </div>
);

export default Newcats;