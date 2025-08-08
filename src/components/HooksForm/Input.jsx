import { debounce, get } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import validationRule from "../../helper/ValidationRule";
import { useEffect, useRef } from "react";

const defaultTransform = {
  output: (val) => val,
  input: (val) => val,
};

const Input = ({
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
  disabled = false, // Add disabled prop with default value false
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
          const newValue = transformer.output?.(e);
          console.log(newValue)
          // transformer.input(newValue)      // Update internal state
          onChange(newValue);        // Update React Hook Form

          if (isDebounce) {
            debouncedOnChange(newValue); // Call debounced callback
          } else {
            onChangeDebounced(newValue)
          }
        };
        return (
          <div className="flex flex-col">
            <div className={`${errors?.[fieldInput?.name] ? "border border-red-400 bg-red-100" : ""
              } flex ${disabled ? "bg-[#e5e7eb]" : ""} items-center border border-gray-300 h-10 rounded-md shadow-sm justify-between`}>
              {prefix}
              <input
                {...fieldInput}
                type={type}
                ref={ref}
                disabled={disabled} // Apply disabled prop to the input
                className={`focus:outline-0 placeholder-red-300 flex-1 ${className} ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`} // Add disabled styles
                onChange={handleChange}
                value={transformer.input(value)}
                placeholder={placeholder}
                {...props}
              />
              <div className="cursor-pointer">
                {suffix}
              </div>
            </div>
            <div>
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
          </div >
        );
      }}
    />
  );
};

export default Input;

