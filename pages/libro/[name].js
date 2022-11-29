import React from "react";

const Segundo = ({ cartaUnica }) => {

  console.log(cartaUnica)
  return (
    <div className="p-4 flex justify-center items-center mb-3 ">
      <div className=" p-4 flex flex-col max-w-lg items-center justify-center border-solid border-2  bg-cardOverlay rounded-md  ">
        <img
          width={300}
          height={300}
          src={cartaUnica.card_images[0].image_url}
        ></img>
        <h2 className="text-white">{cartaUnica.name}</h2>
        <p className="text-white">{cartaUnica.desc}</p>
      </div>
    </div>
  );
};

export default Segundo;

export async function getStaticPaths(){

  const res = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php/");
  const data = await res.json()
   const paths = data.data.map((carta) => ({
     params: { name: carta.name.split(" ").join("-").toLowerCase() },
   }));
 
return{
  paths,
  fallback:false
}

}

export async function getStaticProps({params}) {

  console.log("params",params)
 
  const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php/`);
  const data = await res.json();
  const dataJson = data.data.slice(0, 100);
  const cartas = dataJson.map((carta) => {
    return {
      ...carta,
      ruta: carta.name.split(" ").join("-").toLowerCase(),
    };
  });
 let cartasFiltrado = cartas.filter((carta) => (carta.ruta == params.name))
 let cartaUnica  = cartasFiltrado[0]
  return {
    props: {
      cartaUnica,
    },
  };
}
