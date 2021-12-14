import { createAlert } from "../../queries/alerts";
import { TSpecificationName } from "../../typings/exchanges";
import { TForm } from "../../typings/forms";
import { FilterRequestsForm } from "./ExchangeAttemptRequest";
import { attemptTypeAlertField } from "./fields/attemptType";

const alertFields = FilterRequestsForm.fields.filter(
	f => f.id !== TSpecificationName.Amount && f.id !== TSpecificationName.AttemptType
);
alertFields.unshift(attemptTypeAlertField);

export const AddNewAlertForm: TForm = {
	fields: alertFields,
	handler: createAlert,
	submitLabel: "add_new_alert"
};
