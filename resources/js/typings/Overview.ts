export type TExchangeOfferCard = {
	id: number;
	animal_species: string;
	date_available: string;
	amount: string;
	gender: string;
	origin: string;
};

export type TExchangeRequestCard = {
	id: number;
	animal_species: string;
	date_requested: string;
	amount: string;
	gender: string;
	origin: string;
};
