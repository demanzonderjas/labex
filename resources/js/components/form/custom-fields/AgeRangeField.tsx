import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../../hooks/useFormStore";
import { IconSelectField } from "../IconSelectField";
import { AGE_TYPES } from "../../../data/configs/matches";
import { getFieldById } from "../../../utils/getters/fields";
import { RangeField } from "../RangeField";

export const AgeRangeField: React.FC = observer(() => {
	const { fields } = useFormStore();
	const ageType = getFieldById("age_type", fields);

	return (
		<div className="AgeRangeField">
			<IconSelectField
				value={ageType.value}
				id="age_type"
				label="age_type"
				options={AGE_TYPES}
			/>
			<RangeField />
		</div>
	);
});
