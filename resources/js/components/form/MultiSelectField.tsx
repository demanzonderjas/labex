import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData, TSelectOption } from "../../typings/Form";
import { SelectOption } from "./SelectOption";

interface Props extends FormFieldData {
    options: TSelectOption[];
    startsEmpty?: boolean;
}

export const MultiSelectField: React.FC<Props> = observer(({ id, value, options, startsEmpty }) => {
    const { setFieldValue } = useFormStore();
    
    return (
        <div className="MultiSelectField">
            <select value={value} onChange={e => setFieldValue(id, e.target.value)}>
                {startsEmpty && <option value="" />}
                {options.map(option => (
                    <SelectOption key={option.label} {...option} />
                ))}
            </select>
        </div>
    )
}