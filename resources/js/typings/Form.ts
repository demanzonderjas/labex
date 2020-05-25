import React from "react";

export type TForm = {
	header: string;
	fields: FormField[];
	handler: Function;
	handleSuccess: Function;
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
}

export interface FormField extends FormFieldData {
	Component: React.FC;
	props: any;
	required?: boolean;
	dependencies?: FormFieldDependency[];
	hidden?: boolean;
	default: string;
	description?: string;
	validate?: Function;
}

export type FormFieldDependency = {
	id: string;
	validate: Function;
};
