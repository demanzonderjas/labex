import { createSignUp } from "../../queries/createSignUp";
import { TForm } from "../../typings/forms";
import { emailField } from "./fields/email";
import { nameField } from "./fields/name";
import { organisationSelectField } from "./fields/user/organisation";

export const SignUpForm: TForm = {
	fields: [nameField, emailField, organisationSelectField],
	handler: createSignUp,
	fullWidthFields: true
};
