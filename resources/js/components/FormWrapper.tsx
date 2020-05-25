import React, { useState } from "react";
import { FormStore } from "../stores/FormStore";
import { TForm } from "../typings/Form";
import FormStoreProvider from "../contexts/FormContext";
import { Form } from "./Form";

type Props = { form: TForm; handleSuccess: Function };

export const FormWrapper: React.FC<Props> = ({ form, handleSuccess }) => {
	const [formStore] = useState(new FormStore(form, handleSuccess));

	return (
		<FormStoreProvider store={formStore}>
			<Form header={form.header} />
		</FormStoreProvider>
	);
};
