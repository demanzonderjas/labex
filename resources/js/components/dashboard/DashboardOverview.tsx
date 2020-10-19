import React from "react";
import cx from "classnames";

export const Overview: React.FC<{ isActive: boolean }> = ({ isActive, children }) => {
	return <div className={cx("Overview", { active: isActive })}>{children}</div>;
};
