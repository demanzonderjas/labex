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

	@action.bound setFieldValue(id, value) {
		const fieldIdx = this.fields.findIndex(field => field.id == id);
		const fields = [...this.fields];
		fields[fieldIdx] = { ...fields[fieldIdx], value };
		this.fields = fields;
	}

	@action.bound submit(e: FormEvent) {
		e.preventDefault();
		console.log(this.generateKeyValuePairs());
	}

	generateKeyValuePairs() {
		return this.fields.reduce((base, field) => {
			base[field.id] = field.value;
			return base;
		}, {});
	}
}
