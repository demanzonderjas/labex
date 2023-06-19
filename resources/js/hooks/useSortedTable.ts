import { useState } from "react";

export function useSortedTable(rows: any[], defaultKey?: string, filter?: string) {
	const [sortingKey, setSortingKey] = useState<string>(defaultKey || "id");
	const [reverse, setReverse] = useState(true);

	const sortByColumn = (byColumn: string) => {
		if (sortingKey === byColumn) {
			setReverse(!reverse);
		} else {
			setSortingKey(byColumn);
		}
	};

	const sorted = rows
		.filter(
			s =>
				!filter ||
				s.name.toLowerCase().match(filter.toLowerCase()) ||
				s.email.toLowerCase().match(filter.toLowerCase())
		)
		.sort((a, b) => {
			if (!sortingKey) {
				return 0;
			}
			if (sortingKey === "date_available") {
				const timeA = new Date(a.date_available_start).getTime();
				const timeB = new Date(b.date_available_start).getTime();
				console.log(timeA, timeB);
				if (timeA < timeB) {
					return reverse ? 1 : -1;
				} else if (timeA > timeB) {
					return reverse ? -1 : 1;
				} else {
					return 0;
				}
			}
			if (a[sortingKey] < b[sortingKey]) {
				return reverse ? 1 : -1;
			}
			if (a[sortingKey] > b[sortingKey]) {
				return reverse ? -1 : 1;
			}
			return 0;
		});
	return { sorted, sortByColumn };
}
