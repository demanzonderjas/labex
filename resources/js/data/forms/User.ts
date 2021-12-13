import { createUser } from "../../queries/admin/users";
import { TForm } from "../../typings/forms";
import { emailField } from "./fields/email";
import { nameField } from "./fields/name";
import { organisationField } from "./fields/user/organisation";
import { passwordField } from "./fields/user/password";

export const CreateUserForm: TForm = {
	fields: [nameField, emailField, organisationField, passwordField],
	handler: createUser,
	fullWidthFields: true,
	submitLabel: "save_new_user"
};
