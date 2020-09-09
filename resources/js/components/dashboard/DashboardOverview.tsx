import React from "react";
import cx from "classnames";

export const DashboardOverview: React.FC<{ isActive: boolean }> = ({ isActive, children }) => {
	return <div className={cx("DashboardOverview", { active: isActive })}>{children}</div>;
};
