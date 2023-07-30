import mealCounter from "./counter"
import { displayLikes, postLikes, updateLike, updateLikeColor } from "./getLikes"
import getMealList from "./getMeals"

const MEAL_TEMPLATE = `
<div class="meal-thumbnail">
  <img src="" alt="dish">
</div>
<div class="meal-body">
  <div class ="meal-description">
    <p class="meal-name"></p>
    <i class="fa-solid fa-heart likeButton"></i>
  </div>
  <span class="like-count"></span>
  <button class="meal-comment">Comments</button>
  <button class="meal-reservation">Reservations</button>
</div>`

const handleLikeEvent = async(id) => {
  try {
    await updateLikeColor(id)
    await postLikes(id)
    await updateLike(id)
  }
  catch (e) {
    console.error(e)
  }
}

const displayMeal = async ()=> {
  const meals = await getMealList()
  const Container = document.querySelector('#meals')
  meals.forEach(meal => {
    const card = document.createElement('div')
    card.innerHTML = MEAL_TEMPLATE
    const thumbnail = card.querySelector('.meal-thumbnail img')
    const dish = card.querySelector('.meal-name')
    const likes = card.querySelector('.like-count')
    const likeButton = card.querySelector('.likeButton')

    dish.textContent = meal.strMeal
    thumbnail.src = meal.strMealThumb
    likes.textContent = '0 Likes'

    likeButton.addEventListener('click', ()=> {
      handleLikeEvent(card.id)
    })

    card.classList.add('meal-card')
    card.id = meal.idMeal

    Container.appendChild(card)
  })
  await displayLikes()
  await mealCounter(meals)
}

export default displayMeal