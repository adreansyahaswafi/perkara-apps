import { Controller, useFormContext } from 'react-hook-form'
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import validationRule from '../../helper/ValidationRule';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const get = (obj, path, def) => (() => typeof path === 'string' ? path.replace(/\[(\d+)]/g, '.$1') : path.join('.'))()
    .split('.')
    .filter(Boolean)
    .every(step => ((obj = obj[step]) !== undefined)) ? obj : def

const DatePicker = ({
    validation = [],
    placeholder = "Select Date",
    validationMessage = [],
    name,
    defaultValue = null,
    ...props
}) => {
    const { control, setValue, trigger, watch, getValues } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={validationRule({ rule: validation, validationMessage }, getValues, name)}
            render={({ field: { ref, ...fieldInput }, formState: { errors } }) => {
                const index1 = fieldInput?.name?.split(".")[0];
                const index2 = fieldInput?.name?.split(".")[1];
                const index3 = fieldInput?.name?.split(".")[2];
                console.log(ref);
                return (
                    <div id="my-portal" className="w-full flex flex-col gap-t">
                        <ReactDatePicker
                            {...props}
                            {...fieldInput}
                            selected={watch(name) ? new Date(watch(name)) : null}
                            onChange={(date) => {
                                setValue(name, date);
                                trigger(name);
                                props?.onChange && props.onChange(date);
                            }}
                            placeholderText={placeholder}
                            autoComplete="off"
                            showIcon
                            icon={<CalendarDaysIcon className="!h-6 cursor-pointer !w-auto !px-2 text-gray-400" />}
                            toggleCalendarOnIconClick
                            calendarClassName="z-[9999]"
                            popperClassName="z-[9999]"
                            portalId="my-portal"
                            className={`border text-sm border-gray-300 focus:outline-none w-full h-10 !px-10 rounded-md ${get(errors, name) ? "border-red-400 bg-red-100" : ""}`}
                        />
                        {
                            get(errors, name) ? (
                                <p className="text-xs text-red-400 pt-1">
                                    {errors?.[fieldInput?.name] ? errors?.[fieldInput?.name]?.message?.toString() :
                                        errors[index1]?.[index2]?.[index3]?.message?.toString()}
                                </p>
                            ) : null
                        }
                    </div>
                )
            }}
        />
    )
}

export default DatePicker