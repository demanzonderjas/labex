import React, { useState } from "react";
import { Button } from "../../base/Button";
import { deleteImageFromServer, uploadImage } from "../../../queries/uploadImage";
import { UploadedImage } from "../../base/Image";

export const ImageUploadField: React.FC = (props) => {
	const [path, setPath] = useState(null);

	const upload = async (e) => {
		if (!e.target.files || !e.target.files.length) {
			setPath(null);
			return;
		}
		const file = e.target.files[0];
		console.log("file?", file);
		const response = await uploadImage(file);
		if (response.success) {
			setPath(response.path);
		}
	};

	const deleteImage = async () => {
		if (!path) return;

		const response = await deleteImageFromServer(path);
		if (response.success) {
			setPath(null);
		}
	};

	return (
		<div className="ImageUploadField">
			Path: {path}
			{/* <Button label="upload!" handleClick={upload} /> */}
			<input type="file" accept="image/*" onChange={upload} />
			{!!path && (
				<div className="image-wrapper">
					<UploadedImage path={path} />
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
