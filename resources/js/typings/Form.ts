import React from "react";

export type Form = {
	fields: FormField[];
	handler: Function;
};

export enum InputType {
	Number = "number",
	Text = "text"
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
}

export type FormFieldDependency = {
	id: string;
	validate: Function;
};

export type TSelectOption = {
	label: string;
	value: string;
};
