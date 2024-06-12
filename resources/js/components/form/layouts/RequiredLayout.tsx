import { observer } from "mobx-react-lite";
import React from "react";
import { useFormStore } from "../../../hooks/useFormStore";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { FormFields } from "../FormFields";
import { fieldIsNotHidden, fieldMeetsDependencies } from "../../../utils/filters/fields";

export const RequiredFormLayout: React.FC = observer(() => {
	const { activeFields } = useFormStore();
	const { t } = useTranslationStore();
	const requiredFields = activeFields.filter((f) => f.required);
	const optionalFields = activeFields.filter((f) => !f.required);

	return (
		<div className="required_layout">
			<div className="section">
				<h2>{t("required")}</h2>
				<FormFields activeFields={requiredFields} />
			</div>
			{!!optionalFields
				.filter(fieldIsNotHidden)
				.filter((field, index) => fieldMeetsDependencies(field, index, activeFields))
				.length && (
				<div className="section">
					<h2>{t("optional")}</h2>
					<FormFields activeFields={optionalFields} />
				</div>
			)}
		</div>
	);
});
