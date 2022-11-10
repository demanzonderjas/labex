import { observable, action, computed, toJS } from "mobx";
import { TFormField, TForm } from "../typings/forms";
import { FormEvent } from "react";
import { fieldMeetsDependencies } from "../utils/filters/fields";
import { fillFieldsWithKeyValuePairs } from "../utils/formatting/matches";
import { parseQueryString } from "../utils/formatting/query";

export class FormStore {
	@observable fields: TFormField[] = [];
	@observable handler: Function = null;
	@observable handleSuccess: Function = null;
	@observable handleUpdate: Function = null;
	@observable errors: any = {};
	@observable isLoading = false;
	@observable form: TForm = null;
	@observable serverError = null;
	@observable isCollapsed = false;
	@observable activeFilter: string | null = null;

	constructor(form: TForm, handleSuccess?: Function, handleUpdate?: Function) {
		this.form = form;
		this.fields = form.fields;
		this.handler = form.handler;
		this.handleSuccess = handleSuccess;
		this.handleUpdate = handleUpdate;

		if (window.location.search) {
			this.fields = fillFieldsWithKeyValuePairs(this.fields, parseQueryString());
		}
		if (this.handleUpdate) {
			this.handleUpdate(this.fields);
		}
	}

	@computed get activeFields() {
		if (!this.activeFilter) {
			return this.fields;
		}

		return this.fields.filter(field => field.id == this.activeFilter);
	}

	@computed get filters() {
		return this.fields.filter(fieldMeetsDependencies).filter(field => field.value != "");
	}

	@action.bound setActiveFilter(id) {
		this.activeFilter = id;
	}

	@action.bound setIsLoading(isLoading) {
		this.isLoading = isLoading;
	}

	@action.bound setIsCollapsed(isCollapsed) {
		this.isCollapsed = isCollapsed;

		if (isCollapsed) {
			this.setActiveFilter(null);
		}
	}

	@action.bound setFieldValue(id: string, value: any) {
		const fieldIdx = this.fields.findIndex(
			field => field.id == id && fieldMeetsDependencies(field, 0, this.fields)
		);
		const fields = [...this.fields];
		fields[fieldIdx] = { ...fields[fieldIdx], value };
		this.fields = fields;
		this.setFieldError(id, null);
		this.serverError = null;

		if (this.handleUpdate) {
			this.handleUpdate(this.fields);
		}
	}

	@action.bound validate() {
		const errors = this.fields.filter(fieldMeetsDependencies).reduce((base, field) => {
			if (field.validate && !field.validate(field.value, this.fields)) {
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

	@action.bound async submit(e: FormEvent) {
		e.preventDefault();
		if (this.validate()) {
			this.setIsLoading(true);
			const data = this.generateKeyValuePairs();
			const response = await this.handler(data);
			if (!response.success) {
				this.serverError = response.message;
				this.setIsLoading(false);
			} else {
				setTimeout(() => {
					this.setIsLoading(false);
					this.resetForm();
					this.handleSuccess(response);
				}, 1000);
			}
		} else {
			console.log(this.errors, this.serverError);
		}
	}

	@action.bound resetForm() {
		this.fields = this.fields.map(field => {
			return { ...field, value: field.default };
		});
		this.serverError = null;
		this.errors = {};

		if (this.handleUpdate) {
			this.handleUpdate(this.fields);
		}
	}

	generateKeyValuePairs() {
		return this.fields.filter(fieldMeetsDependencies).reduce((base, field) => {
			base[field.id] = field.value;
			return base;
		}, {});
	}

	@action.bound addField(field: TFormField) {
		const fields = [...this.fields];
		fields.push(field);
		this.fields = fields;
	}

	@action.bound removeField(id: string) {
		this.fields = this.fields.filter(field => field.id != id);
	}
}
