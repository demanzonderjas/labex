import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import cx from "classnames";
import { FormFieldData } from "../../typings/Form";

interface Props extends FormFieldData {}

export const BooleanField: React.FC<Props> = observer(({ id, value }) => {
	const { setFieldValue } = useFormStore();

	return (
		<div className="BooleanField">
			<div
				className={cx("choice yes", { active: value == "yes" })}
				onClick={() => setFieldValue(id, "yes")}
			>
				<span>yes</span>
			</div>
			<div
				className={cx("choice no", { active: value == "no" })}
				onClick={() => setFieldValue(id, "no")}
			>
				<span>no</span>
			</div>
		</div>
	);
});
