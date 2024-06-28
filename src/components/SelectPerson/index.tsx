import AsyncSelect from "react-select/async";
import axios from "axios";

const api = process.env.VITE_APP_API_URL;
const url = `${api}/persons/search`;
const token = localStorage.getItem("token");
const promiseOptions = (inputValue: string) =>
  new Promise<[]>((resolve) =>
    axios
      .get(`${url}?query=${inputValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => resolve(response.data))
  );
type Props = {
  labelText: string;
  handleChange: (value: null) => void;
};
export default function SelectPerson({ labelText, handleChange }: Props) {
  return (
    <>
      <AsyncSelect
        placeholder={labelText}
        onChange={(newValue) => handleChange(newValue)}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
    </>
  );
}
