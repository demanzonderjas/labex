import { ExcelUpload } from "../../components/modals/ExcelUpload";
import { TModal } from "../../typings/modals";

export const excelImportModal: TModal = {
	header: "import_excel",
	description: null,
	Component: ExcelUpload,
	handleConfirm: null,
	align: "left"
};
