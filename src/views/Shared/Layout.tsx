import { FormEvent, ReactNode } from "react";
import {
  BookOpenIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  const navigate = useNavigate();
  async function handleSubmitLogOut(event: FormEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="flex flex-row">
      <div className="basis-4 flex flex-col h-screen justify-between border-e bg-white">
        <div>
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              L
            </span>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              <ul className="space-y-1 border-t border-gray-100 pt-4">
                <li>
                  <button className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <BookOpenIcon className="size-5 opacity-75" />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Books
                    </span>
                  </button>
                </li>

                <li>
                  <button className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <UserGroupIcon className="size-5 opacity-75" />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Persons
                    </span>
                  </button>
                </li>

                <li>
                  <button className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <CalendarIcon className="size-5 opacity-75" />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Loans
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <form action="#" onSubmit={handleSubmitLogOut}>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <ArrowRightStartOnRectangleIcon className="size-5 opacity-75" />

              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Logout
              </span>
            </button>
          </form>
        </div>
      </div>
      <div className="basis-auto m-16">{children}</div>
    </div>
  );
}
