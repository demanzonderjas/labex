import { TFormField } from "../../typings/forms";
import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { convertNameToSlug } from "../../utils/excel/import";

export const FieldMapper: React.FC<TFormField & {
	handleSelect: Function;
	importedFields: string[];
}> = ({ id, label, importedFields, handleSelect, value }) => {
	const { t } = useTranslationStore();
	return (
		<div className="FieldMapper">
			<label>{t(label)}</label>
			<select onChange={(e: any) => handleSelect(id, e.target.value)} value={value}>
				<option value=""></option>
				{importedFields
					.filter(fieldName => !!fieldName)
					.map(fieldName => (
						<option key={fieldName} value={convertNameToSlug(fieldName)}>
							{fieldName}
						</option>
					))}
			</select>
		</div>
	);
};
