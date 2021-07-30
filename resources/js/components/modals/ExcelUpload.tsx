import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SubmitOfferForm } from "../../data/forms/ExchangeAttemptOffer";
import { useModalStore } from "../../hooks/useModalStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { makeEducatedFieldNameGuess } from "../../utils/excel/import";
import { FieldMapper } from "../excel/FieldMapper";

export const ExcelUpload = observer(() => {
	const { t } = useTranslationStore();
	const { data: importedRows } = useModalStore();
	const [mappedFields, setMappedFields] = useState(SubmitOfferForm.fields);
	const hasRows = !!importedRows && Array.isArray(toJS(importedRows)) && !!importedRows.length;

	useEffect(() => {
		if (hasRows) {
			const fieldsWithGuess = mappedFields.map(field => ({
				...field,
				value: makeEducatedFieldNameGuess(field, importedRows[0])
			}));
			setMappedFields(fieldsWithGuess);
		}
	}, [hasRows]);

	const handleSelect = (id: string, value: string) => {
		const fieldIdx = mappedFields.findIndex(f => f.id === id);
		const fieldsCopy = [...mappedFields];
		fieldsCopy[fieldIdx] = { ...fieldsCopy[fieldIdx], value };
		setMappedFields(fieldsCopy);
	};

	return (
		<>
			<p>{t("excel_import_intro")}</p>
			{mappedFields.map(field => (
				<FieldMapper
					key={field.label}
					{...field}
					handleSelect={handleSelect}
					importedFields={hasRows ? importedRows[0] : []}
				/>
			))}
		</>
	);
});
