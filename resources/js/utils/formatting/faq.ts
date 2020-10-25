import { faqItemCells } from "../../data/tables/faq";

export function mapFaqItemsToOverviewData(items) {
	return items.map(item => {
		return faqItemCells.map(cell => {
			return { ...cell, value: item[cell.id] || cell.value };
		});
	});
}