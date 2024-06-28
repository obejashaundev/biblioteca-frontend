import { PlusIcon } from "@heroicons/react/24/outline";
import AddButtonForm from "../../components/AddButtonForm";
import LoansList from "../../components/LoansList";
import { FormEvent, ReactNode, useState } from "react";
import FormField from "../../components/FormField";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SelectBook from "../../components/SelectBook";
import SelectPerson from "../../components/SelectPerson";
import { useNavigate } from "react-router-dom";
export default function Loans() {
  const api = process.env.VITE_APP_API_URL;
  const [returnDate, setReturnDate] = useState("");
  const [bookId, setBookId] = useState(0);
  const [personId, setPersonId] = useState(0);
  const navigator = useNavigate();
  async function handleSubmitNewPerson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const url = `${api}/BooksLoans/add`;
    const data = {
      bookId,
      personId,
      returnDate,
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
    navigator("/booksLoans", {
      replace: true,
    });
  }
  function handleChangeBook(optionSelected: null) {
    if (optionSelected) setBookId(parseInt(optionSelected.value));
  }
  function handleChangePerson(optionSelected: null) {
    if (optionSelected) setPersonId(parseInt(optionSelected.value));
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
                      <SelectBook
                        labelText="Select a book"
                        handleChange={handleChangeBook}
                      />
                    ),
                    (
                      <SelectPerson
                        labelText="Select a person"
                        handleChange={handleChangePerson}
                      />
                    ),
                    (
                      <FormField
                        key={1}
                        inputId="returnDate"
                        inputName="returnDate"
                        inputType="date"
                        labelText="Return Date"
                        isRequired={true}
                        placeholder="Return Date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    )
                  )
                }
                title="New book loan"
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
