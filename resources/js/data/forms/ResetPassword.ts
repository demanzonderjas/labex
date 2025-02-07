import { resetPassword } from "../../queries/resetPassword";
import { TForm, TFormFieldName } from "../../typings/forms";
import { emailField } from "./fields/email";
import { passwordField } from "./fields/user/password";

export const ResetPasswordForm: TForm = {
	fields: [emailField],
	handler: resetPassword,
	fullWidthFields: true,
};

export const ChangePasswordForm: TForm = {
	fields: [
		passwordField,
		{ ...passwordField, id: TFormFieldName.PasswordConfirm, label: "password_confirmation" },
	],
	handler: null,
	fullWidthFields: true,
	hasManualSubmitHandler: true,
};
