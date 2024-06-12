import { ImageUploadField } from "../../../components/form/custom-fields/ImageUploadField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";

export const imageField: TFormField = {
	label: "image",
	id: TSpecificationName.Image,
	Component: ImageUploadField,
	ignoreInMatch: true,
	hideAsFilter: true,
	props: {},
	default: "",
	value: "",
};
