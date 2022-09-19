import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../../hooks/useFormStore";
import { IconSelectField } from "../IconSelectField";
import { AGE_TYPES } from "../../../data/configs/matches";
import { getFieldById } from "../../../utils/getters/fields";
import { RangeField } from "../RangeField";
import { TSpecificationName } from "../../../typings/exchanges";

export const AgeRangeField: React.FC = observer(() => {
	const { fields } = useFormStore();
	const ageType = getFieldById(TSpecificationName.AgeType, fields);

	return (
		<div className="AgeRangeField">
			<IconSelectField
				value={ageType.value}
				id={TSpecificationName.AgeType}
				label="age_type"
				options={AGE_TYPES}
			/>
			<RangeField
				min={0}
				max={20}
				minId={TSpecificationName.AgeMin}
				maxId={TSpecificationName.AgeMax}
			/>
		</div>
	);
});
