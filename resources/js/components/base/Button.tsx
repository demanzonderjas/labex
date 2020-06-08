import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import cx from "classnames";
import { ClickHandler } from "../../typings/Utils";

type Props = {
	isSubmit?: boolean;
	label: string;
	handleClick?: ClickHandler;
	classes?: object;
};

export const Button: React.FC<Props> = ({ isSubmit, label, handleClick, classes = {} }) => {
	const { t } = useTranslationStore();
	return (
		<span className={cx("Button", classes)} onClick={handleClick}>
			<button type={isSubmit ? "submit" : "button"}>{t(label)}</button>
		</span>
	);
};

export const SubmitButton: React.FC<Props> = (props: Props) => {
	return <Button {...props} classes={{ primary: true }} isSubmit={true} />;
};

export const ConfirmButton: React.FC<Props> = (props: Props) => {
	return <Button {...props} classes={{ confirm: true }} />;
};

export const DangerButton: React.FC<Props> = (props: Props) => {
	return <Button {...props} classes={{ danger: true }} />;
};
