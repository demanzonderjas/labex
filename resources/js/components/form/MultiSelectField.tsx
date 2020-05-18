import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData } from "../../typings/Form";
import { SelectOption } from "./SelectOption";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { LocalImage } from "../base/Image";

interface Props extends FormFieldData {
	options: string[];
	startsEmpty?: boolean;
	allowOther?: boolean;
}

export const MultiSelectField: React.FC<Props> = observer(
	({ id, value, options, startsEmpty, allowOther }) => {
		const { setFieldValue } = useFormStore();
		const { t } = useTranslationStore();

		const addSelection = (e: any) => {
			const selectionExistsAlready = value.match(e.target.value);
			if (selectionExistsAlready) {
				return;
			}
			const totalSelection = `${value},${e.target.value}`;
			setFieldValue(id, totalSelection);
		};

		const removeSelection = selection => {
			const filteredSelection = selectionArray.filter(s => s != selection).join(",");
			setFieldValue(id, filteredSelection);
		};

		const selectionArray = value.split(",");
		const lastSelected = selectionArray[selectionArray.length - 1];

		return (
			<div className="MultiSelectField SelectField">
				<div className="select-wrapper">
					<select value={lastSelected} onChange={e => addSelection(e)}>
						{startsEmpty && <option value="" />}
						{options.map(option => (
							<SelectOption key={option} value={option} />
						))}
						{allowOther && <SelectOption value="other" />}
					</select>
					<LocalImage path="icons/arrow-down.svg" />
				</div>
				<div className="selections">
					{selectionArray
						.filter(selection => !!selection)
						.map(selection => (
							<div
								key={selection}
								onClick={() => removeSelection(selection)}
								className="selection"
							>
								{t(selection)}
							</div>
						))}
				</div>
			</div>
		);
	}
);
