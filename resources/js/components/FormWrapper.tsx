import React, { useState } from "react";
import { FormStore } from "../stores/FormStore";
import { TForm } from "../typings/Form";
import FormStoreProvider from "../contexts/FormContext";
import { Form } from "./Form";

type Props = { form: TForm };

export const FormWrapper: React.FC<Props> = ({ form }) => {
	const [formStore] = useState(new FormStore(form));

	return (
		<FormStoreProvider store={formStore}>
			<Form header={form.header} />
		</FormStoreProvider>
	);
};
