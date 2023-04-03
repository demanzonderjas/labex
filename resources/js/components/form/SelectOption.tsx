import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Icon } from "../base/Image";
import cx from "classnames";

type Props = { value: string; handleClick?: Function; isSelected?: boolean; isClear?: boolean };

export const SelectOption: React.FC<Props> = observer(
	({ value, handleClick, isSelected, isClear }) => {
		const { t } = useTranslationStore();

		return (
			<div
				className={cx("SelectOption", { undo: isClear })}
				onClick={handleClick ? () => handleClick() : undefined}
			>
				<span>{t(value)}</span>
				{isSelected && (
					<div className="image-wrapper">
						<Icon name="check" />
					</div>
				)}
			</div>
		);
	}
);
