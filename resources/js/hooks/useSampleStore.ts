import React from "react";
import { sampleStoreContext } from "../contexts/SampleContext";

export const useSampleStore = () => React.useContext(sampleStoreContext);
