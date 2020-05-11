import React from "react";
import { FormField } from "../typings/Form";

type Props = {
	field: FormField;
};

export const FormFieldWithLabel: React.FC<Props> = ({ field }) => {
	return (
		<div className="FormFieldWithLabel">
			<div className="label-wrapper">
				<label>{field.label}</label>
			</div>
			<div className="field-wrapper">
				<field.Component
					{...field.props}
					id={field.id}
					label={field.label}
					value={field.value}
				/>
			</div>
		</div>
	);
};
