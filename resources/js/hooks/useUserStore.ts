import React from "react";
import { UserStoreContext } from "../contexts/UserContext";

export const useUserStore = () => React.useContext(UserStoreContext);
