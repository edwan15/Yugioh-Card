import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./../components/Card";
import { BsBookHalf } from "react-icons/bs";

export default function Home({ array2 }) {
  console.log(array2);
  // console.log(tipos);

  const [Carta, setCarta] = useState(array2);
  const [filtro, setfiltro] = useState("");

  let tipos = array2.filter((tipo) => {
    {
      tipo.type;
    }
  });

  const addUser = (e) => {
    setfiltro(e.target.value);
  };

  const busqueda = (elTipo) => {
    setCarta(array2);

    if (elTipo === "borrar") {
      setCarta(array2);
    }
  };

  let results = [];

  if (!filtro) {
    results = array2;
  } else {
    results = array2.filter((dato) =>
      dato.name.toLowerCase().includes(filtro.toLocaleLowerCase())
    );
  }
  useEffect(() => {
    array2;
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        <Link href={"/libro"}>
          <button
            className="p-1 px-2 rounded-xl bg-boton flex items-center gap-3 justify-center mt-3"
            onClick={() => busqueda("borrar")}
          > <BsBookHalf/>
            Libro de Cartas
          </button>
        </Link>
      </div>

      <div className="p-5 mx-auto max-w-xs ">

        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Busqueda de Cartas"
              required
              value={filtro}
              onChange={addUser}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-4 p-4 gap-10  ">
        <Card array2={array2} key={array2.id} results={results} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php/`);

  const data = await res.json();
  const respuesta = await data.data;

  let array1 = respuesta;

  let array2 = [...array1].slice(0, 100);

  return {
    props: {
      array2,
    },
  };
}
