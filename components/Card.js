import React, { useState } from "react";



const Card = ({ array2, results }) => {
  const [descripcion, setDescripcion] = useState("");

  const handleClick = () => {
    console.log("hola mundo");
  };

  return (
    <>
      {results.map((cartas) => {
        return (
          <div key={cartas.id}>
            <div className="mt-10">
              <div className="flex justify-center">
                <img
                  src={cartas.card_images[0].image_url}
                  alt={cartas.name}
                  className="w-48 "
                />
              </div>
              <div className="flex items-center justify-center mt-5">
                <button
                  className="p-1 px-2 rounded-lg bg-boton flex justify-center items-center cursor-pointer"
                  onClick={handleClick}
                >
                  {cartas.name}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
