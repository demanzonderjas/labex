import { TSpecificationName } from "../../typings/exchanges";
import { TFormField } from "../../typings/forms";

export function getFieldById(id: TSpecificationName, fields: TFormField[]) {
	return fields.find(field => field.id == id);
}

export function getAgeRangeValue(fields) {
	const ageMin = getFieldById(TSpecificationName.AgeMin, fields);
	const ageMax = getFieldById(TSpecificationName.AgeMax, fields);
	const ageType = getFieldById(TSpecificationName.AgeType, fields);

	return `${ageMin.value} - ${ageMax.value} ${ageType.value}`;
}
