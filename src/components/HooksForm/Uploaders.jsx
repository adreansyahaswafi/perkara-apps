import { FileUploader } from "react-drag-drop-files";
import { get } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import validationRule from "../../helper/ValidationRule";
import { useEffect } from "react";

const Uploaders = ({
    validation = [],
    validationMessage = [],
    prefix = null,
    name = "",
    defaultValue = "",
    fileTypes = ["JPG", "PNG", "GIF"],
    info = "",
    disabled = false,
    shouldUnregister = false,
    ...props
}) => {
    const {
        control,
        getFieldState,
        getValues,
        setValue,
        setError,
        trigger,
        watch,
    } = useFormContext();

    const { isDirty } = getFieldState(name);
    const currentValue = watch(name);

    // force revalidation if dirty
    useEffect(() => {
        if (isDirty) {
            trigger(name);
        }
    }, [isDirty, name, trigger, currentValue]);

    // handle file input
    const handleInputChange = (file) => {
        const pickedFile = Array.isArray(file) ? file[0] : file;

        if (pickedFile instanceof File) {
            setValue(name, pickedFile, {
                shouldValidate: true,
                shouldDirty: true,
            });
        } else {
            setError(name, {
                type: "manual",
                message: "Invalid file",
            });
        }
    };

    return (
        <Controller
            shouldUnregister={shouldUnregister}
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={validationRule(
                { rule: validation, validationMessage },
                getValues,
                name
            )}
            render={({ formState: { errors } }) => {
                // console.log(value);
                return (
                    <div className="">
                        <div
                            className={`${errors?.[name]
                                ? "border border-red-400 bg-red-100"
                                : ""
                                } flex ${disabled ? "bg-[#e5e7eb]" : ""} items-center border border-gray-300 h-10 rounded-md shadow-sm justify-between`}
                        >
                            {prefix}

                            <div className="flex-1">
                                <FileUploader
                                    name={name}
                                    handleChange={handleInputChange}
                                    onTypeError={(err) =>
                                        setError(name, {
                                            type: "manual",
                                            message: err.toString(),
                                        })
                                    }
                                    onSizeError={(err) =>
                                        setError(name, {
                                            type: "manual",
                                            message: err.toString(),
                                        })
                                    }
                                    types={fileTypes}
                                    disabled={disabled}
                                    {...props}
                                />
                            </div>
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

export default Uploaders;
