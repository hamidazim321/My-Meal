import getMealList from "./getMeals"

const MEAL_TEMPLATE = `
<div class="meal-thumbnail">
  <img src="" alt="dish">
</div>
<div class="meal-body">
  <p class="meal-name"></p>
  <span class="like-count"></span>
  <button class="meal-comment">Comments</button>
  <button class="meal-reservation">Reservations</button>
</div>`

const displayMeal = async ()=> {
  const meals = await getMealList()
  const Container = document.querySelector('#meals')
  meals.forEach(meal => {
    const card = document.createElement('div')
    card.innerHTML = MEAL_TEMPLATE
    const thumbnail = card.querySelector('.meal-thumbnail img')
    const dish = card.querySelector('.meal-name')

    dish.textContent = meal.strMeal
    thumbnail.src = meal.strMealThumb

    card.classList.add('meal-card')
    card.id = meal.idMeal

    Container.appendChild(card)
  })
  console.log(meals)
}

export default displayMeal