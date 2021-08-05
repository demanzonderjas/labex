import React from "react";
import { exchangeAttemptContext } from "../contexts/ExchangeAttemptContext";

export const useExchangeAttemptStore = () => React.useContext(exchangeAttemptContext);
