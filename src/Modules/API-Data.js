const APP_ID = 'okYxWcD64PpWtrkrK7E7'
const APP_URL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${APP_ID}`

const mealDBURL = (filter, option) => {
  const MEAL_DB_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?${filter}=${option}`
  return MEAL_DB_URL
}

export {mealDBURL, APP_URL,}