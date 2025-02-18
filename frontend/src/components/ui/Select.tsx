import { ComponentProps, ReactNode, useId } from "react";
import { IoChevronDown } from "react-icons/io5";

export interface IOption {
  value: string;
  label: string | ReactNode;
}
interface SelectProps extends ComponentProps<"select"> {
  label?: string;
  labelStyle?: string;
  left?: ReactNode;
  placeholder?: string;
  isLoading?: boolean;
  error?: string | ReactNode;
}

export default function Select(props: SelectProps) {
  const {
    label,
    labelStyle,
    left,
    placeholder,
    isLoading,
    disabled,
    onChange,
    value = "",
    error,
    ...rest
  } = props;
  const id = useId();
  const isDisabled = disabled || isLoading;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`${props.className}`}>
      {label && (
        <label
          className={`text-[#64748A] text-sm font-normal mb-1 ${labelStyle}`}
          htmlFor={props.id ?? id}
        >
          {label}
        </label>
      )}
      <div
        className={`w-full flex items-center px-4 ${
          error ? "border-red-400 bg-red-50" : "border-[#E5E9F0] bg-slate-50"
        } ${isDisabled ? "bg-slate-300" : ""} border rounded-xl`}
      >
        {left && <>{left}</>}
        <select
          disabled={isDisabled}
          {...rest}
          className={`appearance-none outline-none w-full py-[13px] text-black disabled:bg-slate-300  ${
            error ? "border-red-400 bg-red-50" : "bg-slate-50 "
          }`}
          id={props.id ?? id}
          value={value}
          onChange={handleChange}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {props.children}
        </select>
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border border-t border-white  border-t-gray-900 "></div>
        ) : (
          <IoChevronDown/>
        )}
      </div>
      {Boolean(error) &&
        (typeof error === "string" ? (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        ) : (
          error
        ))}
    </div>
  );
}