import { createSignUp } from "../../queries/createSignUp";
import { TForm } from "../../typings/forms";
import { emailField } from "./fields/email";
import { nameField } from "./fields/name";
import { passwordField } from "./fields/user/password";

export const SignUpForm: TForm = {
	fields: [nameField, emailField, passwordField],
	handler: createSignUp,
	fullWidthFields: true,
};
