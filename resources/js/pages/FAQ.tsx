import React, { useEffect, useState } from "react";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getFAQ } from "../queries/getFaq";
import cx from "classnames";
import { SubmenuView } from "../components/overviews/SubmenuView";
import { FAQItem } from "./FAQItem";

export const FAQPage: React.FC = () => {
	const [categories, setCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);
	const { t } = useTranslationStore();

	useEffect(() => {
		(async () => {
			const response = await getFAQ();
			setCategories(response.categories);
			setActiveCategory(response.categories[0].name);
		})();
	}, []);

	return (
		<div className="FAQPage">
			<PageIntro header="faq_header" paddingLeft={320} boldHeader={true}>
				<p>{t("faq_intro")}</p>
			</PageIntro>
			<div className="submenu-with-overviews faq">
				<div className="submenu">
					<h2>{t("table_of_contents")}</h2>
					{categories.map(category => (
						<h3
							key={category.name}
							className={cx({
								active: activeCategory === category.name
							})}
							onClick={() => setActiveCategory(category.name)}
						>
							{category.name}
						</h3>
					))}
				</div>
				<div className="overviews">
					{categories.map(category => (
						<SubmenuView isActive={category.name == activeCategory} key={category.name}>
							{category.faq_items.map(item => (
								<FAQItem item={item} key={item.id} />
							))}
						</SubmenuView>
					))}
				</div>
			</div>
		</div>
	);
};
