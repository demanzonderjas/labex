import { TSpecification } from "./overviews";

export type TAlert = {
	id: number;
	user_id: number;
	specifications: TSpecification[];
};
