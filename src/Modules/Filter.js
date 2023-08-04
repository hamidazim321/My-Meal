import displayMeal from "./displayMeals"

const filterItems = () => {
  const filter = document.querySelector('#filter')
  filter.addEventListener('change', (e)=> {
    const selectValue = e.target.selectedOptions[0].value
    const selectedGroup = e.target.selectedOptions[0].parentNode.id
    const meals = document.querySelector('#meals')
    if (meals){
      meals.innerHTML = ""
      displayMeal(selectedGroup, selectValue)
    }
  })
}


export default filterItems