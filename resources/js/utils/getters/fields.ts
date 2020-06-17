import { FormField } from "../../typings/Form";

export function getFieldById(id: string, fields: FormField[]) {
	return fields.find(field => field.id == id);
}

export function getAgeRangeValue(fields) {
	const ageMin = getFieldById("age_min", fields);
	const ageMax = getFieldById("age_max", fields);
	const ageType = getFieldById("age_type", fields);

	return `${ageMin.value} - ${ageMax.value} ${ageType.value}`;
}
