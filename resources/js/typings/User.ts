export type TUser = {
	name: string;
	organisation: string;
};

export type TUserProfile = {
	user: TUser;
	mine: boolean;
};
