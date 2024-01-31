export type TUser = {
	id: number;
	name: string;
	email: string;
	organisation: string;
};

export type TUserProfile = {
	user: TUser;
	mine: boolean;
};
