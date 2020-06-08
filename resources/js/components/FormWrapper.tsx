import React, { useState } from "react";
import { FormStore } from "../stores/FormStore";
import { TForm } from "../typings/Form";
import FormStoreProvider from "../contexts/FormContext";
import { Form } from "./Form";

type Props = { form: TForm; handleSuccess: Function; handleUpdate: Function };

export const FormWrapper: React.FC<Props> = ({ form, handleSuccess, handleUpdate }) => {
	const [formStore] = useState(new FormStore(form, handleSuccess, handleUpdate));

	return (
		<FormStoreProvider store={formStore}>
			<Form header={form.header} submitLabel={form.submitLabel} />
		</FormStoreProvider>
	);
};
