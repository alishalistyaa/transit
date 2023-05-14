import { ChangeEvent } from "react";

type componentProps = {
  isPassword: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
};

export default function InputField({
  isPassword,
  onChange,
  value,
  placeholder,
}: componentProps): JSX.Element {
  return (
    <input
      placeholder={placeholder}
      type={isPassword ? "password" : "text"}
      value={value}
      onChange={onChange}
      className="outline-none bg-GRAY-300 rounded-[14px] border border-BROWN-700 px-3.5 py-2.5 text-BROWN-600 font-poppinsLight text-xs"
    />
  );
}
