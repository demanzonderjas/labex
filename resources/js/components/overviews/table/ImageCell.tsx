import React from "react";
import { UploadedImage } from "../../base/Image";

type Props = {
	value: string;
};

export const ImageCell: React.FC<Props> = ({ value }) => {
	return <td>{!!value && <UploadedImage path={value} />}</td>;
};
