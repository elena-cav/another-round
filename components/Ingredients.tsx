import React from "react";
import { Ingredient } from "../pages/index";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import CocktailCard from "./CocktailCard";
import {
  getCocktailsIds,
  getCocktailsData,
  getAdditionalIds,
} from "../utils/fetchData";
const ingredientTypes = {
  "Soft Drinks": "Soft_Drink",
  Spirit: "Spirit",
  Juice: "Juice",
  Liquer: "Liqueur",
  ["Wines & Champagne"]: "Wines_Champagne",
  ["Beers & Cider"]: "Beers_Cider",
  "Bar Stock": "Bar_Stock",
  Syrup: "Syrup",
  Other: "Other",
};

type IngredientsProps = {
  ingredients: Ingredient[];
};

export default function Ingredients(props: IngredientsProps) {
  const [ingredientTypeText, setIngredientTypeText] = useState(
    "Select an ingredient type"
  );
  const [ingredientText, setIngredientText] = useState("Select an ingredient");
  const [ingredients, setIngredients] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [additionalCocktails, setAdditionalCocktails] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState(null);
  const [notFoundText, setNotFoundText] = useState("");

  const selectIngredientType = (k, v) => {
    setIngredientTypeText(k);
    const filtered = props.ingredients
      .filter(({ type }) => type === v)
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    setFilteredIngredients(filtered);
  };

  const fetchCocktails = async () => {
    let fetchedCocktails;
    let additionalFetchedCocktails;
    try {
      fetchedCocktails = await getCocktailsIds(ingredients);
      additionalFetchedCocktails = await (
        await getAdditionalIds(ingredients)
      ).flat();
    } catch (e) {
      console.log(e);
    }
    if (fetchedCocktails === "None Found") {
      setNotFoundText(
        "No cocktails with your selected combination of ingredients were found. Can still pop to the supermarket? Check out these suggestions."
      );
      const additionalData = await getCocktailsData(additionalFetchedCocktails);
      setAdditionalCocktails(additionalData);
    } else {
      const mainData = await getCocktailsData(fetchedCocktails);
      const additionalData = await getCocktailsData(additionalFetchedCocktails);
      setCocktails(mainData);
      setAdditionalCocktails(additionalData);
    }
  };

  return (
    <div className="flex gap-2 pt-10 content-center justify-items-center justify-center flex-col">
      <ul className="text-yellow-500 font-bold list-disc list-inside">
        {ingredients &&
          ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
      </ul>
      {/* <div className="grid m-auto grid-cols-1	md:grid-cols-2 gap-3"> */}
      <button
        className="bg-emerald-800 text-white hover:bg-emerald-900 text-gray-900 py-2 px-4 rounded"
        onClick={() => {
          setNotFoundText("");
          setIngredientTypeText("Select an ingredient type");
          setIngredientText("Select an ingredient");
          setFilteredIngredients(null);
          setIngredients([]);
          setCocktails([]);
          setAdditionalCocktails([]);
        }}
      >
        Reset
      </button>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          disabled={filteredIngredients ? true : false}
          className="bg-emerald-800 hover:bg-emerald-700 inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {ingredientTypeText}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
        <Menu.Items className="bg-white absolute left-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {Object.entries(ingredientTypes).map(([k, v], i) => (
            <Menu.Item key={i} as={Fragment}>
              {({ active }) => (
                <button
                  onClick={() => {
                    selectIngredientType(k, v);
                  }}
                  className={`${
                    active ? "text-gray-800 bg-yellow-600" : "text-gray-900"
                  } text-left group flex w-full rounded-md px-2 py-2 text-sm w-72`}
                >
                  {k}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
      {filteredIngredients && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-emerald-800 hover:bg-emerald-900 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {ingredientText}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
          <Menu.Items className="bg-white absolute left-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {filteredIngredients.map(({ name, id }) => (
              /* Use the `active` state to conditionally style the active item. */
              <Menu.Item key={id} as={Fragment}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setIngredientText(name);
                    }}
                    className={`${
                      active ? "text-gray-800 bg-yellow-600" : "text-gray-900"
                    } text-left group flex w-full rounded-md px-2 py-2 text-sm w-72`}
                  >
                    {name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      )}
      <button
        onClick={() => {
          setIngredientTypeText("Select an ingredient type");
          setIngredientText("Select an ingredient");
          setFilteredIngredients(null);
          setIngredients([...ingredients, ingredientText]);
        }}
        disabled={ingredientText === "Select an ingredient" ? true : false}
        className="disabled:bg-yellow-900 bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 rounded"
      >
        Add
      </button>
      <button
        onClick={() => {
          fetchCocktails();
        }}
        disabled={ingredients.length < 1}
        className="disabled:bg-yellow-900 bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 rounded"
      >
        Find cocktails
      </button>
      {/* </div> */}
      <p className="text-white text-center pt-5">{notFoundText}</p>
      <div className="grid m-auto grid-cols-1	md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {cocktails.length > 0 &&
          cocktails.map((cocktail) => {
            return <CocktailCard cocktail={cocktail} />;
          })}
      </div>
      {additionalCocktails.length > 0 && ingredients.length > 1 && (
        <h2 className="text-center text-3xl">More suggestions</h2>
      )}
      <div className="grid m-auto grid-cols-1	md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {additionalCocktails.length > 0 &&
          additionalCocktails.map((cocktail) => (
            <CocktailCard cocktail={cocktail} />
          ))}
      </div>
    </div>
  );
}
