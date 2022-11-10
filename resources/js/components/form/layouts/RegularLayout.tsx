import { observer } from "mobx-react-lite";
import React from "react";
import { useFormStore } from "../../../hooks/useFormStore";
import { FormFields } from "../FormFields";

export const RegularFormLayout: React.FC = observer(() => {
	const { activeFields } = useFormStore();

	const sortedFields = [...activeFields].sort((a, b) => (a.required && !b.required ? -1 : 1));

	return (
		<div className="fields">
			<FormFields activeFields={sortedFields} />
		</div>
	);
});
