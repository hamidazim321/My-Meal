const mealCounter = (arr)=> {
  const nav_dishes = document.querySelector('#nav-dishes')
  nav_dishes.textContent = `Dishes (${arr.length})`
}
export default mealCounter