import React from "react";
import { TUser } from "../../../../typings/user";

type Props = {
	value: TUser;
};

export const UserCell: React.FC<Props> = ({ value: user }) => {
	return (
		<td>
			{user.name}
			<br />
			{user.email}
		</td>
	);
};
