import React from "react";
import { formStoreContext } from "../contexts/FormContext";

export const useFormStore = () => React.useContext(formStoreContext);
