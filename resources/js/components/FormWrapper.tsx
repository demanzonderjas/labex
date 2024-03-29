import React, { useState } from "react";
import { FormStore } from "../stores/FormStore";
import { TForm } from "../typings/forms";
import FormStoreProvider from "../contexts/FormContext";
import { Form } from "./Form";

type Props = { form: TForm; handleSuccess?: Function; handleUpdate?: Function };

export const FormWrapper: React.FC<Props> = ({ form, handleSuccess, handleUpdate }) => {
	const [formStore] = useState(new FormStore(form, handleSuccess, handleUpdate));

	return (
		<FormStoreProvider store={formStore}>
			<Form
				intro={form.intro}
				header={form.header}
				hideSubmit={form.hideSubmit}
				submitLabel={form.submitLabel}
				allowCancel={form.allowCancel}
				matchable={form.matchable}
				fullWidthFields={form.fullWidthFields}
				infoModal={form.infoModal}
			/>
		</FormStoreProvider>
	);
};
