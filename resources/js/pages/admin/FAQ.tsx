import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/base/Button";
import { faqItemColumns } from "../../data/tables/faq";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { getFaqItems } from "../../queries/admin/getFaqItems";
import { mapFaqItemsToOverviewData } from "../../utils/formatting/faq";

export const AdminFAQPage = observer(() => {
	const { t } = useTranslationStore();
	const [faqItems, setFaqItems] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const response = await getFaqItems();
			setFaqItems(response.items);
		})();
	}, []);

	const faqItemsWithCells = mapFaqItemsToOverviewData(faqItems);

	return (
		<div className="AdminFAQPage">
			<h1>{t("faq")}</h1>
			<div className="button-wrapper margin-20">
				<Button label="create_faq_item" handleClick={() => navigate("/admin/faq/create")} />
			</div>
			<table className="not-centered">
				<thead>
					<tr>
						{faqItemColumns.map((column) => (
							<th key={column}>{t(column)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{faqItemsWithCells.map((cells, idx) => (
						<tr key={idx}>
							{cells.map((cell, cellIdx) => (
								<cell.Component
									key={cellIdx}
									rowIndex={idx}
									value={cell.value}
									item={faqItems[idx]}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
});
