import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { TFormFieldData, InputType } from "../../typings/forms";
import cx from "classnames";
import { blockEnter } from "../../utils/dom/keyboard";

interface Props extends TFormFieldData {
	type: InputType;
	allowEnter?: boolean;
}

export const InputField: React.FC<Props> = observer(
	({ id, value, validate, type, allowEnter, ...props }) => {
		const { setFieldValue } = useFormStore();
		const isCorrect = validate ? validate(value) && value : !!value;
		return (
			<div className="InputField">
				<input
					className={cx({ correct: isCorrect })}
					type={type}
					value={value}
					onKeyPress={allowEnter ? undefined : blockEnter}
					onChange={(e) => setFieldValue(id, e.target.value)}
					{...props}
				/>
			</div>
		);
	}
);
