import { BookmarkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FormEventHandler, ReactNode } from "react";

type Props = {
  title: string;
  helpText?: string;
  buttonActionIcon: ReactNode;
  buttonActionText: string;
  formFields: Array<ReactNode>;
  buttonSubmitText?: string;
  handleSubmit?: FormEventHandler<HTMLFormElement> | undefined;
};

export default function AddButtonForm({
  title,
  buttonActionIcon,
  buttonActionText,
  formFields,
  buttonSubmitText,
  handleSubmit,
}: Props) {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-blue-500 hover:text-blue-700 focus:relative"
        // className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        data-hs-overlay="#addFormOffCanvas"
      >
        {buttonActionIcon}
        {buttonActionText}
      </button>

      <div
        id="addFormOffCanvas"
        className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[80] bg-white border-e"
        tabIndex={-1}
      >
        <div className="flex justify-between items-center py-3 px-4 border-b">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <button
            type="button"
            className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-overlay="#addFormOffCanvas"
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="flex-shrink-0 size-4" />
          </button>
        </div>
        <div className="p-4">
          <form action="#" onSubmit={handleSubmit}>
            {formFields.map((formField) => {
              return <div className="my-5">{formField}</div>;
            })}
            <button
              type="submit"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              {buttonSubmitText ? buttonSubmitText : "Save"}
              <BookmarkIcon className="flex-shrink-0 size-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
