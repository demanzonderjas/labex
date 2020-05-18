import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type ClickHandler = (...args: any[]) => void;

type Props = {
	isSubmit?: boolean;
	label: string;
	handleClick?: ClickHandler;
};

export const Button: React.FC<Props> = ({ isSubmit, label, handleClick }) => {
	const { t } = useTranslationStore();
	return (
		<div className="Button" onClick={handleClick}>
			<button type={isSubmit ? "submit" : "button"}>{t(label)}</button>
		</div>
	);
};

export const SubmitButton: React.FC<Props> = (props: Props) => {
	return <Button {...props} isSubmit={true} />;
};
