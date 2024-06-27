import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

type Props = {
  labelText: string;
  inputType: string;
  inputId: string;
  inputName: string;
  value: string | number | readonly string[] | undefined;
  onClick?: MouseEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
  isRequired?: boolean;
};
export default function FormField({
  labelText,
  inputType,
  inputId,
  inputName,
  value,
  onClick,
  onChange,
  onFocus,
  onKeyDown,
  onKeyUp,
  placeholder,
  isRequired,
}: Props) {
  return (
    <>
      <label
        htmlFor={inputId}
        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <input
          type={inputType}
          id={inputId}
          name={inputName}
          value={value}
          onClick={onClick}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
          placeholder={labelText}
          required={isRequired}
        />

        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          {labelText}
        </span>
      </label>
    </>
  );
}
