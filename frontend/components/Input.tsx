import { InputHTMLAttributes } from "react";
import { maxLength, minLength } from "zod";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export default function Input({
  type,
  onChange,
  placeholder,
  name,
  label,
  autoComplete,
  id,
  required,
  maxLength,
  minLength,
}: Props) {
  return (
    <div>
      {!label ? "" : <label htmlFor={name}>{label}</label>}
      <input
        className="border rounded-2xl border-gray-400 focus:border-2 focus:border-blue-500 p-2 w-full mb-2"
        type={type}
        onChange={onChange ? onChange : undefined}
        placeholder={placeholder ? placeholder : undefined}
        name={name}
        id={id}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
}
