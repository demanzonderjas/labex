import React from "react";
import { TSpecificationName } from "./exchanges";
import { TModal } from "./modals";
import { TSpecStatus, TSpecMatch } from "./specifications";

export type TForm = {
	header?: string;
	intro?: string;
	submitLabel?: string;
	fields: TFormField[];
	matchable?: boolean;
	hideSubmit?: boolean;
	handler: Function;
	handleSuccess?: Function;
	handleUpdate?: Function;
	fullWidthFields?: boolean;
	infoModal?: TModal;
	allowCancel?: boolean;
	splitByRequired?: boolean;
};

export enum InputType {
	Number = "number",
	Text = "text",
	Password = "password",
	Date = "date",
	Email = "email",
	Hidden = "hidden"
}

export interface TFormFieldData {
	label: string;
	id: TSpecificationName | TFormFieldName;
	value: string;
	validate?: Function;
}

export enum TFormFieldName {
	Email = "email",
	Name = "name",
	Content = "content",
	Category = "category",
	ID = "id",
	Show = "show",
	Title = "title",
	Organisation = "organisation",
	Password = "password",
	AdoptionCode = "adoption_code",
	AdoptionAmount = "adoption_amount",
	User = "user"
}

export interface SelectFieldData extends TFormFieldData {
	options: string[];
	allowOther: boolean;
	startsEmpty: boolean;
	required?: boolean;
}

export interface TFormField extends TFormFieldData {
	Component: React.FC;
	props: any;
	required?: boolean;
	dependencies?: TFormFieldDependency[];
	isMatch?: (
		givenValue: any,
		targetValue: any,
		filters?: TFormField[],
		fields?: TFormField[]
	) => TSpecStatus;
	matchVia?: TSpecificationName;
	isHardFilter?: boolean;
	hidden?: boolean;
	default: string;
	match?: TSpecMatch;
	description?: string;
	customValue?: Function;
	ignoreInMatch?: boolean;
	synonyms?: string[];
}

export type TFormFieldDependency = {
	id: string;
	validate: Function;
};
