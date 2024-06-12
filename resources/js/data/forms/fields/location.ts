import { TFormField, InputType } from "../../../typings/forms";
import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";

export const locationBuildingField: TFormField = {
	label: "location_building",
	id: TSpecificationName.LocationBuilding,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text,
	},
	default: "",
	value: "",
};

export const locationRoomField: TFormField = {
	label: "location_room",
	id: TSpecificationName.LocationRoom,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text,
	},
	default: "",
	value: "",
};
