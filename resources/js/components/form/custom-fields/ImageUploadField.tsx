import React, { useState } from "react";
import { Button } from "../../base/Button";
import { deleteImageFromServer, uploadImage } from "../../../queries/uploadImage";
import { UploadedImage } from "../../base/Image";
import { useFormStore } from "../../../hooks/useFormStore";

export const ImageUploadField: React.FC<{ id: string; value: string }> = ({ id, value }) => {
	const { setFieldValue } = useFormStore();

	const upload = async (e) => {
		if (!e.target || !e.target.files || !e.target.files.length) {
			return;
		}
		const file = e.target.files[0];
		const response = await uploadImage(file);
		if (value) {
			await deleteImage();
		}
		if (response.success) {
			setFieldValue(id, response.path);
		}
	};

	const deleteImage = async () => {
		if (!value) return;

		const response = await deleteImageFromServer(value);
		if (response.success) {
			setFieldValue(id, null);
		}
	};

	return (
		<div className="ImageUploadField">
			<div className="upload-wrapper">
				<Button label="choose_image" classes={{ tertiary: true, nomargin: true }} />
				<input type="file" accept="image/*" onChange={upload} />
			</div>
			{!!value && (
				<div className="image-wrapper">
					<UploadedImage path={value} />
					<div className="button">
						<Button
							label="x"
							classes={{ small: true, danger: true, nomargin: true }}
							handleClick={deleteImage}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
