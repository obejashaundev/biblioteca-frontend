import { FormEvent, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormField from "../../../components/FormField";
import "react-toastify/dist/ReactToastify.min.css";

export default function Login() {
  const api = process.env.VITE_APP_API_URL;
  const url = `${api}/auth/login`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onHandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!email || !password) {
      toast.warning("Please, complete the fields and try it again.");
      return false;
    }
    const data = {
      email,
      password,
    };
    const response = await toast.promise(axios.post(url, data), {
      pending: "Processing...",
      success: "👌",
      error: "Oh oh 🤯",
    });
    if (response.status != 200) {
      toast.error(`${response.data.message}`);
      return false;
    }
    localStorage.setItem("token", response.data.token);
    navigate("/home");
  }

  return (
    <>
      <form action="#" onSubmit={onHandleSubmit}>
        <div className="mb-4">
          <FormField
            inputId="email"
            inputName="email"
            inputType="email"
            isRequired={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelText="Email Adress"
          />
        </div>
        <div className="mb-4">
          <FormField
            inputId="password"
            inputName="password"
            inputType="password"
            isRequired={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelText="Password"
          />
        </div>
        <div className="flex items-center justify-between mb-4"></div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
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
      <div className="flex items-center"></div>
      <button
        onClick={() => {
          navigate("/register");
        }}
        className="text-sm text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        ¿You don't have an account? Register here!
      </button>
    </>
  );
}
