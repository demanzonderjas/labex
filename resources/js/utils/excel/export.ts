import {
	TExchangeAttempt,
	TExchangeAttemptType,
	TExportableOffer,
	TSpecificationName
} from "../../typings/exchanges";
import { TTypeSpec } from "../../typings/specifications";

export async function exportToExcel(rows: any, name: string) {
	const XLSX = await import("xlsx");

	const worksheet = XLSX.utils.json_to_sheet(rows);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "ATEXExport");
	XLSX.writeFile(workbook, "ATEX-Export.xlsx", { compression: true });
}

export function convertValidOffersToOrigin(
	shownOffers: TExchangeAttempt[],
	allOffers: TExchangeAttempt[]
): TExportableOffer[] {
	return shownOffers.reduce((base, offer) => {
		const type = offer.specifications.find(s => s.key === TSpecificationName.ExchangeType);
		const amount = offer.specifications.find(s => s.key === TSpecificationName.Amount);
		const totalAmount = +amount.value;
		const adoptionAmount = offer.adoption_info?.amount || 0;

		const baseOffer = {
			...offer,
			offered: totalAmount,
			matched: offer.is_match ? totalAmount : 0,
			adopted: adoptionAmount,
			remaining: offer.is_match ? 0 : totalAmount - adoptionAmount
		};

		if (!offer.origin_id || !type || type.value !== TTypeSpec.Animal) {
			base.push(baseOffer);
		} else {
			const addedToOrigin = addUpToOrigin(baseOffer, allOffers);
			const originIndex = base.findIndex(origin => origin.id === baseOffer.origin_id);
			if (originIndex === -1) {
				base.push(addedToOrigin);
			} else {
				base[originIndex] = addedToOrigin;
			}
		}

		return base;
	}, [] as TExportableOffer[]);
}

export function addUpToOrigin(
	offer: TExportableOffer,
	offers: TExchangeAttempt[]
): TExportableOffer {
	const originOffer = offers.find(o => o.id === offer.origin_id);
	const amount = originOffer.specifications.find(s => s.key === TSpecificationName.Amount);
	const totalAmount = +amount.value;
	const adoptionAmount = originOffer.adoption_info?.amount || 0;

	const newBaseOffer = {
		...originOffer,
		offered: totalAmount,
		matched: originOffer.is_match ? totalAmount + offer.matched : offer.matched,
		adopted: offer.adopted + adoptionAmount,
		remaining: originOffer.is_match
			? 0
			: totalAmount - adoptionAmount - offer.matched - offer.adopted
	};

	return originOffer.origin_id ? addUpToOrigin(newBaseOffer, offers) : newBaseOffer;
}
