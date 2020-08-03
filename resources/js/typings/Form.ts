import React from "react";
import { TSpecMatch } from "./Sample";

export type TForm = {
	header: string;
	intro: string;
	submitLabel?: string;
	fields: FormField[];
	matchable?: boolean;
	hideSubmit?: boolean;
	handler: Function;
	handleSuccess?: Function;
	handleUpdate?: Function;
};

export enum InputType {
	Number = "number",
	Text = "text",
	Date = "date"
}

export interface FormFieldData {
	label: string;
	id: string;
	value: string;
	validate?: Function;
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
}

export type FormFieldDependency = {
	id: string;
	validate: Function;
};
