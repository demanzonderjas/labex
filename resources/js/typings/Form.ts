import React from "react";

export type TForm = {
	fields: FormField[];
	handler: Function;
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
	description?: string;
}

export type FormFieldDependency = {
	id: string;
	validate: Function;
};
