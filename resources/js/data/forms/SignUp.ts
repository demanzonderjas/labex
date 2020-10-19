import { createSignUp } from "../../queries/createSignUp";
import { TForm } from "../../typings/Form";
import { emailField } from "./fields/email";
import { nameField } from "./fields/name";

export const SignUpForm: TForm = {
    fields: [
        nameField,
        emailField
    ],
    handler: createSignUp,
    fullWidthFields: true
}