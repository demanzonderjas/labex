import React, { useEffect, useState } from "react";
import { getFAQ } from "../../../queries/getFaq";
import { SelectFieldData } from "../../../typings/forms";
import { SelectField } from "../SelectField";

export const CategorySelectField: React.FC<SelectFieldData> = props => {
	const [options, setOptions] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await getFAQ();
			const _options = response.categories.map(category => category.name);
			setOptions(_options);
		})();
	}, []);

	return <SelectField {...props} options={options} />;
};
