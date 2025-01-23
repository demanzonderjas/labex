import JoditEditor from "jodit-react";
import React, { useRef } from "react";
import { useFormStore } from "../../hooks/useFormStore";
import { TFormFieldData } from "../../typings/forms";
import { observer } from "mobx-react-lite";

const listOfButtons = "bold,italic,underline,ul,ol,indent,outdent,left,link,source";

const joditConfig = {
	readonly: false,
	buttons: listOfButtons,
	buttonsSM: listOfButtons,
	buttonsMD: listOfButtons,
	buttonsXS: listOfButtons,
	textAlign: "left",
	width: "100%",
	askBeforePasteHTML: false,
	askBeforePasteFromWord: false,
};

interface Props extends TFormFieldData {}

export const RichTextField: React.FC<Props> = observer(({ id, value }: Props) => {
	const editor = useRef(null);
	const { setFieldValue } = useFormStore();

	return (
		<div className="RichTextField">
			<JoditEditor
				ref={editor}
				value={value}
				config={joditConfig}
				onBlur={(newContent) => setFieldValue(id, newContent)}
			/>
		</div>
	);
});
