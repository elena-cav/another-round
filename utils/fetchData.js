import axios from "axios";

export const getAdditionalIds = async (ingredients) => {
  return Promise.all(
    ingredients.map(async (ingredient) => {
      const { data } = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      return data.drinks;
    })
  );
};
export const getCocktailsIds = async (ingredients) => {
  const response = await axios.get(
    `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredients.join(
      ","
    )}`
  );
  return response.data.drinks;
};

export const getCocktailsData = async (fetchedCocktails) => {
  return Promise.all(
    fetchedCocktails.map(async (cocktail) => {
      const cocktailId = cocktail.idDrink;
      const { data } = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
      );
      return data.drinks[0];
    }) ?? []
  );
};
