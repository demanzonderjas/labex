import { TSpecification } from "./overviews";
import { TUser } from "./user";

export type TAlert = {
	id: number;
	user_id: number;
	user?: TUser;
	specifications: TSpecification[];
};
