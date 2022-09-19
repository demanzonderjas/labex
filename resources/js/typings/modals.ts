import { TForm } from "./forms";

export type TModal = {
	header?: string;
	description?: string;
	form?: TForm;
	Component?: React.FC;
	props?: any;
	handleConfirm: Function;
	align?: string;
	isDefault?: boolean;
};
