export async function exportToExcel(rows: any, name: string) {
	const XLSX = await import("xlsx");

	const worksheet = XLSX.utils.json_to_sheet(rows);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "ATEXExport");
	XLSX.writeFile(workbook, "ATEX-Export.xlsx", { compression: true });
}
