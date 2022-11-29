import Link from "next/link";
import React from "react";

const Libro = ({ cartas }) => {
  console.log(cartas);


  return (
    <div className="grid  p-4  ">
      <div >
        <h1 className="text-white font-bold text-2xl">NOTA :</h1>
        <p className="text-white">Pulsa Sobre una carta para obtener mas informacion</p>
      </div>
      <div className=" grid grid-cols-4  gap-5 rounded-md p-6 py-7">
        {cartas.map(({ name, id, ruta, type, card_images }, index) => {
          return (
            <div className="mb-6 ">
              <Link key={id} href={"/libro/[name]"} as={`/libro/${ruta}`}>
                <div className="border-solid border-2 rounded-md cursor-pointer">
                  <div key={index} className="flex  flex-col">
                    <h1 className="text-white p-2 text-center">{name}</h1>
                    <div className="flex justify-center items-center mb-2">
                      <img
                        src={card_images[0].image_url}
                        alt={name}
                        className="w-8 h-10 object-contain"
                      />
                    </div>
                    <p className="text-center text-white pb-5">
                      {" "}
                      Type : {type}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
          n;
        })}
      </div>
    </div>
  );
};

export default Libro;

export async function getStaticProps() {
  const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php/`);
  const data = await res.json();
  const dataJson = data.data.slice(0, 100);

  const   cartas = dataJson.map((carta) =>{
    return {
      ...carta,
      ruta: carta.name.split(" ").join("-").toLowerCase()
    }
    
  })
  return {
    props: {
      cartas,
    },
  };
}
