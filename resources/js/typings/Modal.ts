import { TForm } from "./Form";

export type TModal = {
	header?: string;
	description?: string;
	form?: TForm;
	handleConfirm: Function;
};
