import { mealDBURL } from "./API-Data"

const getMealList = async (filter, option) => {
  const request = await fetch(mealDBURL(filter, option))
  const {meals} = await request.json()
  return meals
}

export default getMealList