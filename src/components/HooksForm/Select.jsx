import { Controller, useFormContext } from "react-hook-form";
import Select from "react-tailwindcss-select";
import validationRule from "../../helper/ValidationRule";
import { get } from "lodash";

const SelectField = ({
    validation = [],
    validationMessage = [],
    options = [],
    name = "",
    shouldUnregister = false,
    defaultValue = "",
    info = null,
    ...props
}) => {
    const { control, setValue, trigger, getValues, ...otherForm } = useFormContext();
    return (
        <Controller
            shouldUnregister={shouldUnregister}
            control={control}
            rules={validationRule(
                { rule: validation, validationMessage },
                getValues,
                name
            )}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { ref, value, ...fieldInput }, formState: { errors } }) => {
                return (
                    <div>
                        <Select
                            ref={ref}
                            {...props}
                            {...fieldInput}
                            name={name}
                            options={options}
                            value={
                                (Array.isArray(value) ?
                                    options.filter((obj) => value.includes(obj.value))?.sort((obj1, obj2) => {
                                        let index1 = value.indexOf(obj1.value);
                                        let index2 = value.indexOf(obj2.value);
                                        return index1 - index2;
                                    }) :
                                    (value !== null && value !== undefined && value !== "") ?
                                        options.filter(obj => obj.value.toString() === value.toString())?.[0] : null)}
                            onChange={selected => {
                                /* in case for multiple select */
                                if (Array.isArray(selected)) {
                                    selected = selected.length > 0 ? selected : null;
                                    let value_new = selected?.map(obj => (typeof obj === 'object') ? obj.value : obj);
                                    setValue(name, value_new, { shouldValidate: true })
                                } else {
                                    setValue(name, selected?.value ?? null, { shouldValidate: true })
                                }
                                trigger(name);
                                props.onChange && props.onChange(selected, { setValue, trigger, ...otherForm })
                            }}
                            classNames={{
                                menu: "border-1 border-gray-300 py-2 absolute bg-white w-full z-50 rounded-md shadow-lg",
                                menuButton: ({ isDisabled }) => (
                                    `  ${errors?.[fieldInput?.name] ? "border-red-400 bg-red-100" : ""
                                    } text-sm flex h-10 des:h-12 py-0 des:py-1 text-md ${isDisabled
                                        ? "bg-gray-200"
                                        : ""
                                    } text-gray-500 border-gray-200 rounded-md border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none`
                                ),
                                listItem: ({ isSelected }) => (
                                    `block px-4 text-sm transition my-1 text-left duration-200 py-2 cursor-pointer select-none truncate rounded ${isSelected
                                        ? `text-white bg-blue-400`
                                        : `text-gray-500 hover:bg-blue-400 hover:text-white`
                                    }`
                                ),
                            }}
                        />
                        {
                            get(errors, name) ? (
                                <p className="text-xs text-red-400 pt-1">
                                    {errors?.[fieldInput?.name]?.message?.toString()}
                                </p>
                            ) : (
                                <p className="text-xs text-gray-400 pt-1">{info}</p>
                            )
                        }
                    </div>
                );
            }}
        />
    );
};

export default SelectField;
