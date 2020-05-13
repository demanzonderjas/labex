import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData, TSelectOption } from "../../typings/Form";
import { SelectOption } from "./SelectOption";

interface Props extends FormFieldData {
	options: TSelectOption[];
	startsEmpty?: boolean;
}

export const MultiSelectField: React.FC<Props> = observer(({ id, value, options, startsEmpty }) => {
	const { setFieldValue } = useFormStore();

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
		<div className="MultiSelectField">
			<select value={lastSelected} onChange={e => addSelection(e)}>
				{startsEmpty && <option value="" />}
				{options.map(option => (
					<SelectOption key={option.label} {...option} />
				))}
			</select>
			<div className="selections">
				{selectionArray
					.filter(selection => !!selection)
					.map(selection => (
						<div
							key={selection}
							onClick={() => removeSelection(selection)}
							className="selection"
						>
							{selection}
						</div>
					))}
			</div>
		</div>
	);
});
