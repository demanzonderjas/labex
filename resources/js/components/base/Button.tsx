import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import cx from "classnames";
import { ClickHandler } from "../../typings/utils";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { observer } from "mobx-react-lite";

type Props = {
	isSubmit?: boolean;
	label: string;
	handleClick?: ClickHandler;
	disabled?: boolean;
	classes?: object;
};

export const Button: React.FC<Props> = ({
	isSubmit,
	label,
	handleClick,
	classes = {},
	disabled = false,
}) => {
	const { t } = useTranslationStore();
	return (
		<span className={cx("Button", { ...classes, primary: true })} onClick={handleClick}>
			<button disabled={disabled} type={isSubmit ? "submit" : "button"}>
				{t(label)}
			</button>
		</span>
	);
};

export const SubmitButton: React.FC<Props> = (props: Props) => {
	return (
		<Button
			{...props}
			classes={props.classes ? { ...props.classes, primary: true } : { primary: true }}
			isSubmit={true}
		/>
	);
};

export const BlankButton: React.FC<Props> = (props: Props) => {
	return (
		<Button
			{...props}
			classes={props.classes ? { ...props.classes, blank: true } : { blank: true }}
		/>
	);
};

export const ConfirmButton: React.FC<Props> = (props: Props) => {
	return (
		<Button
			{...props}
			classes={props.classes ? { ...props.classes, confirm: true } : { confirm: true }}
		/>
	);
};

export const DangerButton: React.FC<Props> = (props: Props) => {
	return (
		<Button
			{...props}
			classes={props.classes ? { ...props.classes, danger: true } : { danger: true }}
		/>
	);
};

export const SecondaryButton: React.FC<Props> = (props: Props) => {
	return <Button {...props} classes={{ secondary: true }} />;
};

export const MatchableButton: React.FC<Props> = observer(({ label }) => {
	const { totalMatches } = useExchangeAttemptStore();
	const { t } = useTranslationStore();

	if (totalMatches > 0) {
		return null;
	}

	return (
		<div className="MatchableButton">
			<SubmitButton label={label} classes={{ inline: true }} />
			<span className="no-matches">{t("no_matches_found")}</span>
		</div>
	);
});
