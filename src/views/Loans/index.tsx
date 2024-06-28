import { PlusIcon } from "@heroicons/react/24/outline";
import AddButtonForm from "../../components/AddButtonForm";
import LoansList from "../../components/LoansList";
import { FormEvent, ReactNode, useState } from "react";
import FormField from "../../components/FormField";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";
export default function Loans() {
  const api = process.env.VITE_APP_API_URL;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cellPhone, setCellphone] = useState("");
  async function handleSubmitNewPerson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const url = `${api}/booksLoans/add`;
    const data = {
      fullName,
      email,
      cellPhone,
    };
    const token = localStorage.getItem("token");
    const response = await toast.promise(
      axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        pending: "Processing...",
        success: "👌",
        error: "Oh oh 🤯",
      }
    );
    if (response.status != 200) {
      toast.error(`${response.data.message}`);
      return false;
    }
  }
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <div className="basis-4/6">
            <div className="font-bold text-5xl">Books loans</div>
          </div>
          <div className="basis-2/6 text-right">
            <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
              <AddButtonForm
                buttonActionIcon={<PlusIcon className="h-4 w-4" />}
                buttonActionText="Add"
                formFields={
                  new Array<ReactNode>(
                    (
                      <FormField
                        key={1}
                        inputId="fullName"
                        inputName="fullName"
                        inputType="text"
                        labelText="Full name"
                        isRequired={true}
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    ),
                    (
                      <FormField
                        key={2}
                        inputId="Email"
                        inputName="Email"
                        inputType="text"
                        labelText="Email"
                        isRequired={true}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ),
                    (
                      <FormField
                        key={3}
                        inputId="Cellphone"
                        inputName="Cellphone"
                        inputType="tel"
                        labelText="Cellphone"
                        isRequired={true}
                        placeholder="Cellphone"
                        value={cellPhone}
                        onChange={(e) => setCellphone(e.target.value)}
                      />
                    )
                  )
                }
                title="Add a new loan"
                buttonSubmitText="Save"
                handleSubmit={handleSubmitNewPerson}
              />
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
            </div>
          </div>
        </div>
        <div className="mt-10">
          <LoansList />
        </div>
      </div>
    </>
  );
}
