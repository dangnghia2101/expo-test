import { useFormik, FormikConfig, FormikValues } from 'formik';

type ValidateConfig<T extends FormikValues> = FormikConfig<T>;

export const useValidate = <T extends FormikValues>(
  {
    validateOnMount = true,
    ...props
  }: ValidateConfig<T> = {} as ValidateConfig<T>
) => {
  const { setFieldTouched, setFieldValue, touched, errors, ...rest } =
    useFormik<T>({
      validateOnMount,
      ...props
    });

  const onChange =
    (field: string) =>
    (value: T[keyof T]): void => {
      setFieldValue(field, value);
      setFieldTouched(field, true, false);
    };

  const error = (name: string): string | undefined => {
    return touched[name] && (errors[name] as string);
  };

  return {
    onChange,
    error,
    setFieldTouched,
    setFieldValue,
    touched,
    errors,
    ...rest
  };
};
