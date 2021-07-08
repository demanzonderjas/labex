import { useState } from "react";
import { loadFromFile } from "../../utils/excel/import";
import { Button } from "../base/Button";
import React from "react";

export const ExcelImport = () => {
	const [tempFile, setTempFile] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [rows, setRows] = useState([]);

	const handleUpload = async e => {
		if (!e.target.files || !e.target.files.length) {
			return;
		}
		const file = e.target.files[0];
		const uploadedRows = await loadFromFile(file);
		setRows(uploadedRows);
		setTempFile("");
		setShowModal(true);

		console.log(uploadedRows);
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
