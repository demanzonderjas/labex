import React from "react";

export type Form = {
	fields: FormField[];
	handler: Function;
};

export type FormField = {
	label: string;
	id: string;
	Component: React.FC;
	props: any;
	value: string;
};
