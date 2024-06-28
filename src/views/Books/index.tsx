import { PlusIcon } from "@heroicons/react/24/outline";
import AddButtonForm from "../../components/AddButtonForm";
import BooksList from "../../components/BooksList";
import { FormEvent, ReactNode, useState } from "react";
import FormField from "../../components/FormField";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Books() {
  const api = process.env.VITE_APP_API_URL;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState(0);
  const navigator = useNavigate();
  async function handleSubmitNewBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const url = `${api}/books/add`;
    const data = {
      title,
      author,
      copies,
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
    navigator("/books", { replace: true });
  }
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <div className="basis-4/6">
            <div className="font-bold text-5xl">Books</div>
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
                        inputId="Title"
                        inputName="Title"
                        inputType="text"
                        labelText="Title"
                        isRequired={true}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    ),
                    (
                      <FormField
                        key={2}
                        inputId="Author"
                        inputName="Author"
                        inputType="text"
                        labelText="Author"
                        isRequired={true}
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    ),
                    (
                      <FormField
                        key={3}
                        inputId="Copies"
                        inputName="Copies"
                        inputType="number"
                        labelText="Copies"
                        isRequired={true}
                        placeholder="Copies"
                        value={copies}
                        minValue={1}
                        onChange={(e) => setCopies(parseInt(e.target.value))}
                      />
                    )
                  )
                }
                title="Add a new book"
                buttonSubmitText="Save"
                handleSubmit={handleSubmitNewBook}
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
          <BooksList />
        </div>
      </div>
    </>
  );
}
