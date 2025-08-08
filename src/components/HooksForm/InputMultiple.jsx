import { debounce, get } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import validationRule from "../../helper/ValidationRule";
import { useEffect, useRef } from "react";

const defaultTransform = {
  output: (val) => val,
  input: (val) => val,
};

const InputMultiple = ({
  validation = [],
  validationMessage = [],
  prefix = null,
  suffix = null,
  name = "",
  defaultValue = "",
  placeholder = "",
  className = "",
  type = "text",
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
    return () => debouncedOnChange.cancel();
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
        field: { ref, onChange, value },
        formState: { errors },
      }) => {
        const handleChange = (e) => {
          const newValue = transformer.output?.(e.target?.value);
          onChange(newValue);
          isDebounce
            ? debouncedOnChange(newValue)
            : onChangeDebounced(newValue);
        };

        const error = get(errors, name);

        return (
          <div className="flex flex-col">
            <div className={`flex items-center border h-10 rounded-md shadow-sm justify-between 
                ${error ? "border-red-400 bg-red-100" : "border-gray-300"} 
                ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}>
              {prefix}
              <input
                ref={ref}
                name={name}
                type={type}
                value={transformer.input(value)}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                className={`flex-1 focus:outline-none placeholder-red-300 px-2 ${className}`}
                {...props}
              />
              {suffix && <div className="cursor-pointer">{suffix}</div>}
            </div>

            <div>
              {error ? (
                <p className="text-xs text-red-400 pt-1">
                  {error.message?.toString()}
                </p>
              ) : (
                info && <p className="text-xs text-gray-400 pt-1">{info}</p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default InputMultiple;
