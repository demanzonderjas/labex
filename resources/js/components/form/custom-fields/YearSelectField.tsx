import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React from "react";
import { useExchangeAttemptStore } from "../../../hooks/useExchangeAttemptStore";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormFieldData } from "../../../typings/forms";
import { SelectField } from "../SelectField";

export const YearSelectField: React.FC<TFormFieldData> = observer(({ id, value }) => {
	const { offers } = useExchangeAttemptStore();

	const options = offers.reduce((base, offer) => {
		const date = offer.specifications.find(
			s => s.key === TSpecificationName.DateAvailableStart
		);

		if (!date) {
			return base;
		}

		const year = dayjs(date.value).year();
		return base.every(_year => _year !== year) ? [...base, year] : base;
	}, []);

	return (
		<div className="YearSelectField">
			<SelectField
				id={id}
				label="year"
				options={options}
				startsEmpty={true}
				allowOther={false}
				value={value}
			/>
		</div>
	);
});
