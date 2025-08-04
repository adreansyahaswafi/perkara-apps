import { debounce, get } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import validationRule from "../../helper/ValidationRule";
import { useEffect, useRef } from "react";

const defaultTransform = {
    output: (val) => val,
    input: (val) => val,
};

const Textarea = ({
    validation = [],
    validationMessage = [],
    prefix = null,
    suffix = null,
    name = "",
    defaultValue = "",
    placeholder = "",
    className = "",
    rows = 4,
    info = "",
    transform = defaultTransform,
    isDebounce = false,
    onChangeDebounced = () => { },
    disabled = false,
    ...props
}) => {
    const { control, getValues } = useFormContext();
    const transformer = { ...defaultTransform, ...transform };
    const debouncedOnChange = useRef(debounce(onChangeDebounced, 500)).current;

    useEffect(() => {
        return () => {
            debouncedOnChange.cancel();
        };
    }, [debouncedOnChange]);

    return (
        <Controller
            shouldUnregister={true}
            control={control}
            defaultValue={defaultValue}
            name={name}
            rules={validationRule(
                { rule: validation, validationMessage },
                getValues,
                name
            )}
            render={({
                field: { ref, onChange, value, ...fieldInput },
                formState: { errors },
            }) => {
                const handleChange = (e) => {
                    const val = transformer.output?.(e.target.value);
                    onChange(val);

                    if (isDebounce) debouncedOnChange(val);
                    else onChangeDebounced(val);
                };

                return (
                    <div className="flex flex-col">
                        <div className={`${errors?.[name] ? "border border-red-400 bg-red-100" : ""
                            } relative border border-gray-300 rounded-md shadow-sm ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}>
                            {prefix && <div className="absolute left-2 top-2">{prefix}</div>}
                            <textarea
                                {...fieldInput}
                                ref={ref}
                                disabled={disabled}
                                rows={rows}
                                className={`w-full p-2 resize-none focus:outline-none ${className}`}
                                value={transformer.input(value)}
                                onChange={handleChange}
                                placeholder={placeholder}
                                {...props}
                            />
                            {suffix && <div className="absolute right-2 top-2">{suffix}</div>}
                        </div>
                        <div>
                            {get(errors, name) ? (
                                <p className="text-xs text-red-400 pt-1">
                                    {errors?.[name]?.message?.toString()}
                                </p>
                            ) : (
                                <p className="text-xs text-gray-400 pt-1">{info}</p>
                            )}
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default Textarea;
