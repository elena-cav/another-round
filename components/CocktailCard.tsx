import React from "react";

export default function CocktailCard({ cocktail }) {
  const ingredients = Object.entries(cocktail).filter(([k, v]) => {
    return k.startsWith("strIngredient") && v;
  });
  console.log("COCKTAIL", cocktail);
  return (
    <div className="flex flex-col md:flex-row rounded-lg bg-white shadow-lg">
      <img
        className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
        src={cocktail.strDrinkThumb}
        alt=""
      />
      <div className="p-6 flex flex-col justify-start">
        <h5 className="text-yellow-800 text-xl font-medium mb-2">
          {cocktail.strDrink}
        </h5>
        <p className="text-gray-700 text-base mb-4">
          {cocktail.strInstructions}
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <svg
              width="30px"
              height="30px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="#2b4d3f"
                d="M432 240c53 0 96-43 96-96s-43-96-96-96c-35.5 0-66.6 19.3-83.2 48H296.2C316 40.1 369.3 0 432 0c79.5 0 144 64.5 144 144s-64.5 144-144 144c-27.7 0-53.5-7.8-75.5-21.3l35.4-35.4c12.2 5.6 25.8 8.7 40.1 8.7zM1.8 142.8C5.5 133.8 14.3 128 24 128H392c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-177 177V464h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H208 120c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V345.9L7 169c-6.9-6.9-8.9-17.2-5.2-26.2z"
              />
            </svg>
            <p className="text-gray-600 text-s">{cocktail.strGlass}</p>
          </div>
          <div className="flex gap-6 items-center">
            <svg
              width="30px"
              height="30px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#2b4d3f"
                d="M393.4 9.4c12.5-12.5 32.8-12.5 45.3 0l64 64c12.5 12.5 12.5 32.8 0 45.3c-11.8 11.8-30.7 12.5-43.2 1.9l-9.5 9.5-48.8 48.8c-9.2 9.2-11.5 22.9-8.6 35.6c9.4 40.9-1.9 85.6-33.8 117.5L197.3 493.3c-25 25-65.5 25-90.5 0l-88-88c-25-25-25-65.5 0-90.5L180.2 153.3c31.9-31.9 76.6-43.1 117.5-33.8c12.6 2.9 26.4 .5 35.5-8.6l48.8-48.8 9.5-9.5c-10.6-12.6-10-31.4 1.9-43.2zM99.3 347.3l65.4 65.4c6.2 6.2 16.4 6.2 22.6 0l97.4-97.4c6.2-6.2 6.2-16.4 0-22.6l-65.4-65.4c-6.2-6.2-16.4-6.2-22.6 0L99.3 324.7c-6.2 6.2-6.2 16.4 0 22.6z"
              />
            </svg>
            <ul className="list-disc list-outside">
              {ingredients.map(([_, v], i) => (
                <li key={i} className="text-gray-600 text-s">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
