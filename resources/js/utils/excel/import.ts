export async function loadFromFile(file) {
	const workbook = await createWorkbookFromFile(file);
	const rows = await convertWorkbookToJson(workbook);
	return rows;
}

export async function createWorkbookFromFile(file: File) {
	const XLSX = await import("xlsx");
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			resolve(workbook);
		};
		reader.readAsArrayBuffer(file);
	});
}

export async function convertWorkbookToJson(workbook: any) {
	const XLSX = await import("xlsx");
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];
	return XLSX.utils.sheet_to_json(sheet, { header: 1 });
}
