import React from "react";
import { matchStoreContext } from "../contexts/MatchContext";

export const useMatchStore = () => React.useContext(matchStoreContext);
