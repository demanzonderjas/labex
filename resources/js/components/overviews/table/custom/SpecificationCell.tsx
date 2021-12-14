import React from "react";
import { useTranslationStore } from "../../../../hooks/useTranslationStore";
import { TAlert } from "../../../../typings/alerts";
import { TSpecification } from "../../../../typings/overviews";

type Props = {
	value: TSpecification[];
	alert: TAlert;
};

export const SpecificationCell: React.FC<Props> = ({ value, alert }) => {
	const { t } = useTranslationStore();
	return (
		<td className="SpecificationCell">
			{value.map(v => (
				<span className="value" key={v.key}>
					{t(v.value)}
				</span>
			))}
		</td>
	);
};
