import React from "react";

export type TForm = {
	header: string;
	submitLabel?: string;
	fields: FormField[];
	matchable?: boolean;
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
	hidden?: boolean;
	default: string;
	description?: string;
}

export type FormFieldDependency = {
	id: string;
	validate: Function;
};
