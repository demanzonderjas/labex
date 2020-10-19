import React, { useEffect, useState } from "react";
import { getFAQ } from "../queries/getFaq";

export const FAQPage: React.FC = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getFAQ();
            setCategories(response.categories);
        })();

    }, []);

    console.log("categories", categories);

    return (
        <div className="FAQPage">
            FAQQQ
        </div>
    )
}