import { observable, toJS, action } from "mobx";
import { FormField, TForm } from "../typings/Form";
import { FormEvent } from "react";

export class FormStore {
	@observable fields: FormField[] = [];
	@observable handler: Function = null;
	@observable errors: any = {};

	constructor(form: TForm) {
		this.fields = form.fields;
		this.handler = form.handler;
	}

	@action.bound setFieldValue(id: string, value: any) {
		const fieldIdx = this.fields.findIndex(field => field.id == id);
		const fields = [...this.fields];
		fields[fieldIdx] = { ...fields[fieldIdx], value };
		this.fields = fields;
		this.setFieldError(id, null);
	}

	@action.bound validate() {
		const errors = this.fields.reduce((base, field) => {
			if (field.validate && !field.validate(field.value)) {
				base[field.id] = "field_not_valid";
			}
			if (field.required && field.value == "") {
				base[field.id] = "field_required";
			}
			return base;
		}, {});
		this.errors = errors;
		return Object.keys(errors).length === 0;
	}

	@action setFieldError(id, label) {
		const errors = { ...this.errors };
		errors[id] = label;
		this.errors = errors;
	}

	@action.bound submit(e: FormEvent) {
		e.preventDefault();
		if (this.validate()) {
			this.handler(this.generateKeyValuePairs());
		}
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
