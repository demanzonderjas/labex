import { createUser, loginUser } from "../../queries/admin/users";
import { TForm } from "../../typings/forms";
import { emailField } from "./fields/email";
import { nameField } from "./fields/name";
import { organisationField } from "./fields/user/organisation";
import { passwordField, passwordGeneratorField } from "./fields/user/password";

export const CreateUserForm: TForm = {
	fields: [nameField, emailField, passwordGeneratorField],
	handler: createUser,
	fullWidthFields: true,
	submitLabel: "save_new_user",
};

export const LoginUserForm: TForm = {
	fields: [emailField, passwordField],
	handler: loginUser,
	fullWidthFields: true,
	submitLabel: "log_in",
};
