import {
  ArrowLeftEndOnRectangleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "../../../components/FormField";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Person() {
  const { id } = useParams();
  const [person, setPerson] = useState({
    fullName: "",
    email: "",
    cellPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPerson() {
      try {
        const api = process.env.VITE_APP_API_URL;
        const token = localStorage.getItem("token");
        const response = await axios.get(`${api}/persons/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPerson(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the person data:", error);
      }
    }

    fetchPerson();
  }, [id]);

  if (loading) {
    return <div className="font-bold text-5xl">Loading...</div>;
  }

  function handleGoBackClick() {
    navigate("/persons");
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const api = process.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const response = await toast.promise(
      axios.put(
        `${api}/persons/${id}`,
        { ...person },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        pending: "Processing...",
        success: "👌",
        error: "Oh oh 🤯",
      }
    );
    if (response.status != 200) {
      toast.error(`${response.data.message} => ${response.data.errors}`);
      return false;
    }
  }
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <div className="basis-3/6">
            <div className="font-bold text-5xl">Editing person</div>
          </div>
          <div className="basis-3/6 text-right">
            <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-green-500 hover:text-green-700 focus:relative"
                onClick={handleGoBackClick}
              >
                <ArrowLeftEndOnRectangleIcon />
                Go back
              </button>
            </div>
          </div>
        </div>
        <div>
          <form action="#" onSubmit={handleSubmit}>
            <FormField
              inputId="fullName"
              inputName="fullName"
              inputType="text"
              labelText="Fullname"
              value={person.fullName}
              isRequired={true}
              onChange={(e) =>
                setPerson({ ...person, fullName: e.target.value })
              }
            />
            <FormField
              inputId="email"
              inputName="email"
              inputType="email"
              labelText="Email"
              value={person.email}
              isRequired={true}
              onChange={(e) => setPerson({ ...person, email: e.target.value })}
            />
            <FormField
              inputId="cellPhone"
              inputName="cellPhone"
              inputType="number"
              labelText="CellPhone"
              value={person.cellPhone}
              isRequired={true}
              minValue={1}
              onChange={(e) =>
                setPerson({ ...person, cellPhone: e.target.value })
              }
            />
            <button
              type="submit"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save
              <BookmarkIcon className="flex-shrink-0 size-5" />
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        stacked
      />
    </>
  );
}
