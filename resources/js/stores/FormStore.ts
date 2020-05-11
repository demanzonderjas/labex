import { observable, toJS, action } from "mobx";
import { FormField, Form } from "../typings/Form";
import { FormEvent } from "react";

export class FormStore {
	@observable fields: FormField[] = [];
	@observable handler: Function = null;

	constructor(form: Form) {
		this.fields = form.fields;
		this.handler = form.handler;
	}

	@action.bound setFieldValue(id: string, value: any) {
		const fieldIdx = this.fields.findIndex(field => field.id == id);
		const fields = [...this.fields];
		fields[fieldIdx] = { ...fields[fieldIdx], value };
		this.fields = fields;
	}

	@action.bound submit(e: FormEvent) {
		e.preventDefault();
		this.handler(this.generateKeyValuePairs());
	}

	generateKeyValuePairs() {
		return this.fields.reduce((base, field) => {
			base[field.id] = field.value;
			return base;
		}, {});
	}

	@action.bound addField(field: FormField) {
		const fields = [...this.fields];
		fields.push(field);
		this.fields = fields;
	}

	@action.bound removeField(id: string) {
		this.fields = this.fields.filter(field => field.id != id);
	}
}
