import React from "react";
import { TFormField } from "../typings/forms";
import { useTranslationStore } from "../hooks/useTranslationStore";
import cx from "classnames";
import { useState } from "react";
import { InfoIcon } from "./icons/InfoIcon";
import { useFormStore } from "../hooks/useFormStore";
import { useModalStore } from "../hooks/useModalStore";
import { infoModal } from "../data/modals/info";

type Props = {
	field: TFormField;
	error: null | string;
};

export const FormFieldWithLabel: React.FC<Props> = ({ field, error }) => {
	const { t } = useTranslationStore();
	const { fields } = useFormStore();
	const isCorrect = field.validate
		? field.validate(field.value, fields) && field.value
		: !!field.value;
	const { setModal, setModalData } = useModalStore();

	return (
		<div className={cx("TFormFieldWithLabel", { correct: isCorrect })}>
			<div className="label-wrapper">
				<label>
					{t(field.label)}
					{field.required && <span className="required">*</span>}
					{field.description && (
						<InfoIcon
							toggleShow={() => {
								setModalData({
									header: field.label,
									description: field.description,
								});
								setModal(infoModal);
							}}
						/>
					)}
				</label>
			</div>
			{error && <p className="error">{t(error)}</p>}

			<div className="field-wrapper">
				<field.Component
					{...field.props}
					id={field.id}
					label={field.label}
					value={field.transform ? field.transform(field.value) : field.value}
					required={field.required}
				/>
			</div>
		</div>
	);
};
