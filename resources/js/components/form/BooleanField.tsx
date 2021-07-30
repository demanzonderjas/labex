import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import cx from "classnames";
import { TFormFieldData } from "../../typings/Form";
import { useTranslationStore } from "../../hooks/useTranslationStore";

interface Props extends TFormFieldData {}

export const BooleanField: React.FC<Props> = observer(({ id, value }) => {
	const { setFieldValue } = useFormStore();
	const { t } = useTranslationStore();

	return (
		<div className="BooleanField">
			<div
				className={cx("choice yes", { active: value == "yes" })}
				onClick={() => setFieldValue(id, "yes")}
			>
				<span>{t("yes")}</span>
			</div>
			<div
				className={cx("choice no", { active: value == "no" })}
				onClick={() => setFieldValue(id, "no")}
			>
				<span>{t("no")}</span>
			</div>
		</div>
	);
});
