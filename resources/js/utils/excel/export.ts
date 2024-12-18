import { TExchangeAttempt, TExportableOffer, TSpecificationName } from "../../typings/exchanges";
import { TTypeSpec } from "../../typings/specifications";

export async function exportToExcel(rows: any, name: string) {
	const XLSX = await import("xlsx");

	const worksheet = XLSX.utils.json_to_sheet(rows);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "LABEXUSExport");
	XLSX.writeFile(workbook, "LABEXUS-Export.xlsx", { compression: true });
}

export function convertValidOffersToOrigin(
	shownOffers: TExchangeAttempt[],
	allOffers: TExchangeAttempt[]
): TExportableOffer[] {
	return shownOffers.reduce((base, offer) => {
		const type = offer.specifications.find((s) => s.key === TSpecificationName.ExchangeType);

		const baseOffer = {
			...offer,
		};

		if (!offer.origin_id || !type || type.value !== TTypeSpec.Equipment) {
			base.push(baseOffer);
		} else {
			const addedToOrigin = addUpToOrigin(baseOffer, allOffers);
			const originIndex = base.findIndex((origin) => origin.id === baseOffer.origin_id);
			if (originIndex === -1) {
				base.push({ ...addedToOrigin, id: baseOffer.origin_id });
			} else {
				base[originIndex] = { ...addedToOrigin, id: baseOffer.origin_id };
			}
		}

		return base;
	}, [] as TExportableOffer[]);
}

export function addUpToOrigin(
	offer: TExportableOffer,
	offers: TExchangeAttempt[]
): TExportableOffer {
	const originOffer = offers.find((o) => o.id === offer.origin_id);

	const newBaseOffer = {
		...originOffer,
	};

	return originOffer.origin_id ? addUpToOrigin(newBaseOffer, offers) : newBaseOffer;
}
