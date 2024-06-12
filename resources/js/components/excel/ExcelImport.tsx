import { useState } from "react";
import { loadFromFile } from "../../utils/excel/import";
import { Button } from "../base/Button";
import React from "react";
import { useModalStore } from "../../hooks/useModalStore";
import { excelImportModal } from "../../data/modals/import";

export const ExcelImport = () => {
	const [tempFile, setTempFile] = useState("");
	const { setModal, setModalData } = useModalStore();

	const handleUpload = async (e) => {
		if (!e.target.files || !e.target.files.length) {
			return;
		}
		const file = e.target.files[0];
		const uploadedRows = await loadFromFile(file);
		setTempFile("");
		setModal(excelImportModal);
		setModalData(uploadedRows);
	};

	return (
		<div className="ExcelUploadField">
			<div className="upload-wrapper">
				<div className="button-wrapper">
					<Button label="import_excel" />
					<input
						accept=".xls,.xlsx"
						type="file"
						value={tempFile}
						onChange={handleUpload}
					/>
				</div>
			</div>
		</div>
	);
};
