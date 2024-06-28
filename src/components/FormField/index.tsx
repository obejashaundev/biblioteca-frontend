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
  hidden?: boolean | undefined;
  disabled?: boolean | undefined;
  value: string | number | readonly string[] | undefined;
  minValue?: string | number | undefined;
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
  hidden,
  disabled,
  value,
  minValue,
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
      <div className="relative my-5">
        <input
          type={inputType}
          id={inputId}
          name={inputName}
          value={value}
          min={minValue}
          onClick={onClick}
          onFocus={onFocus}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          required={isRequired}
          hidden={hidden}
          disabled={disabled}
          placeholder={placeholder}
          className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2"
        />
        <label
          htmlFor={inputId}
          className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
        >
          {labelText}
        </label>
      </div>
    </>
  );
}
