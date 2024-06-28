import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function PersonsList() {
  const api = process.env.VITE_APP_API_URL;
  const url = `${api}/persons`;
  const token = localStorage.getItem("token");
  const [persons, setPersons] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pending, setPending] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function handleEditClick(id: number) {
      navigate(`/persons/edit/${id}`, { replace: true });
    }
    async function handleDeleteClick(id: number) {
      const isConfirmed = confirm("¿Are you sure to make this action?");
      if (isConfirmed) {
        const api = process.env.VITE_APP_API_URL;
        const url = `${api}/persons/${id}`;
        const token = localStorage.getItem("token");
        const response = await toast.promise(
          axios.delete(url, {
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
          toast.error(`${response.data.message} => ${response.data.errors}`);
          return false;
        }
        navigate("/persons", {
          replace: true,
        });
      }
    }
    async function getpersons() {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPersons(response.data);
      setColumns([
        {
          name: "Fullname",
          selector: (row) => row.fullName,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.email,
          sortable: true,
        },
        {
          name: "Cellphone",
          selector: (row) => row.cellPhone,
          sortable: true,
        },
        {
          name: "Options",
          selector: (row) => row.id,
          cell: (row) => {
            return (
              <>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-yellow-500 hover:text-yellow-700 focus:relative"
                  onClick={() => {
                    handleEditClick(row.id);
                  }}
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-red-500 hover:text-red-700 focus:relative"
                  onClick={() => {
                    handleDeleteClick(row.id);
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </>
            );
          },
        },
      ]);
      setPending(false);
    }
    getpersons();
  }, [token, url]);

  return (
    <>
      <DataTable columns={columns} data={persons} progressPending={pending} />
    </>
  );
}
