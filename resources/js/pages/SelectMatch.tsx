import React, { useState, useEffect } from "react";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { useQuery } from "../hooks/useQuery";
import { ExchangeOffer } from "../data/forms/ExchangeOffer";
import { ExchangeRequest } from "../data/forms/ExchangeRequest";
import { observer } from "mobx-react-lite";

export const SelectMatchPage: React.FC = observer(() => {
	const [sampleStore] = useState(new SampleStore());
	const { loadFiltersFromKeyValuePairs, setFilters, filters } = sampleStore;
	const filterParams = useQuery();

	useEffect(() => {
		setFilters(ExchangeRequest.fields);
		loadFiltersFromKeyValuePairs(filterParams);
	}, []);

	console.log(filters);

	return <SampleStoreProvider store={sampleStore}>MATCH ME! :D</SampleStoreProvider>;
});
