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
	dependencies?: FormFieldDependency[];
}

export type FormFieldDependency = {
	id: string;
	value: any;
};
