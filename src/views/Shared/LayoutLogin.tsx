import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function LayoutLogin({ children }: Props) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Write your credentials!
          </h1>
          {children}
        </div>
      </div>
    </>
  );
}
