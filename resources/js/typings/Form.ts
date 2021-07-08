import React from "react";
import { TModal } from "./Modal";
import { TSpecMatch } from "./Sample";

export type TForm = {
	header?: string;
	intro?: string;
	submitLabel?: string;
	fields: FormField[];
	matchable?: boolean;
	hideSubmit?: boolean;
	handler: Function;
	handleSuccess?: Function;
	handleUpdate?: Function;
	fullWidthFields?: boolean;
	infoModal?: TModal;
	allowCancel?: boolean;
};

export enum InputType {
	Number = "number",
	Text = "text",
	Date = "date",
	Email = "email"
}

export interface FormFieldData {
	label: string;
	id: string;
	value: string;
	validate?: Function;
}

export interface SelectFieldData extends FormFieldData {
	options: string[];
	allowOther: boolean;
	startsEmpty: boolean;
	required?: boolean;
}

export interface FormField extends FormFieldData {
	Component: React.FC;
	props: any;
	required?: boolean;
	dependencies?: FormFieldDependency[];
	isMatch?: Function;
	isHardFilter?: boolean;
	hidden?: boolean;
	default: string;
	match?: TSpecMatch;
	description?: string;
	customValue?: Function;
	ignoreInMatch?: boolean;
	synonyms?: string[];
}

export type FormFieldDependency = {
	id: string;
	validate: Function;
};
