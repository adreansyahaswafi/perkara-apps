import { FormProvider, useForm } from "react-hook-form";

const formatValue = (value) => {
  if (value instanceof File) return value; // ✅ don't mutate file

  if (typeof value === 'object' && value !== null) {
    const formattedValue = Array.isArray(value) ? [...value] : { ...value };
    for (const key in formattedValue) {
      formattedValue[key] = formatValue(formattedValue[key]);
    }
    return formattedValue;
  }

  if (typeof value === 'string') return value.trim();

  return value;
};

const Form = ({
  onError = () => null,
  onSubmit,
  children,
  defaultValues = {},
  form: formProps = null,
  ...props
}) => {
  const defaultForm = useForm({ defaultValues });
  const form = formProps || defaultForm;

  const handleSubmit = (data) => {
    Object.keys(data).forEach((key) => {
      data[key] = formatValue(data[key]);
    });
    if (onSubmit) {
      return onSubmit(data, form);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        {...props}
        onSubmit={form.handleSubmit(handleSubmit, onError)}
        autoComplete="false"
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
