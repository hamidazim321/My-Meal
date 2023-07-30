import _ from 'lodash'
import './style.css'
import Navbar from './Modules/Images'
import displayMeal from './Modules/displayMeals'

Navbar()
displayMeal()

fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52923')
  .then((response) => response.json())
  .then ((data)=> console.log(data.meals[0]))