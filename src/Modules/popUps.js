import { getComments, postComment } from "./comments"

const POPUP_TEMPLATE = `
  <div id="popup-header">
    <div id="popup-thumbnail">
      <img src="" id="popup-thumb">
      <i class="fa-solid fa-xmark" id="popup-close"></i>
    </div>
    <p id="popup-name"></p>
  </div>
  <div id="popup-desc">
    <div id="area">
    <p></p>
    </div>
    <div id="category">
      <p></p>
    </div>
    <div id="ingredients">
      <p></p>
    </div>
    <div id="recipe">
      <p><b>Recipe Toturial:</b></p>
      <a href="">Youtube</a>
    </div>
  </div>
  <div id="popup-responses">
    <div class="header">
      <h2></h2>
    </div>
  </div>
  <div id="popup-add-response">
    <div class="header">
      <h2></h2>
    </div>
  </div>
  `

const createOverlay = () => {
  const overlay = document.createElement('div')
  overlay.id = 'overlay'
  document.body.appendChild(overlay)
}

const removeOverlay = () => {
  const overlay = document.getElementById('overlay')
  document.body.removeChild(overlay)
}
const createPopUp = () => {
  const popUp = document.createElement('div')
  popUp.id = 'popup'
  popUp.innerHTML = POPUP_TEMPLATE
  return popUp
}

const getItemDetails = async (id) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const response = await request.json()
  const data = response.meals[0]
  return data
}

const populatePopup = async (id, popUp) => {
  const itemDetails = await getItemDetails(id)
  const thumbnail = popUp.querySelector('#popup-thumb')
  const mealName = popUp.querySelector('#popup-name')
  const mealArea = popUp.querySelector('#area p')
  const mealCategory = popUp.querySelector('#category p')
  const mealIngredients = popUp.querySelector('#ingredients p')
  const mealRecipe = popUp.querySelector('#recipe a')
  const addComments = popUp.querySelector('#popup-add-response')
  const header2 = addComments.querySelector('.header h2')
  const form = createCommentForm(id)
  const comments = await populateCommentsSection(id)
  const commentArea = popUp.querySelector('#popup-responses')
  const header1 = commentArea.querySelector('.header h2')
  const {strIngredient1, strIngredient2, strIngredient3, strMealThumb, strMeal, strArea, strCategory, strYoutube} = itemDetails

  thumbnail.src = strMealThumb
  mealName.textContent = strMeal
  mealArea.innerHTML = `<b>Origin:</b>${strArea}`
  mealCategory.innerHTML = `<b>Category:</b> ${strCategory}`
  mealIngredients.innerHTML = `<b>Ingredients:</b> ${strIngredient1}, ${strIngredient2}, ${strIngredient3}`
  mealRecipe.href = strYoutube
  mealRecipe.target = '_blank'

  if (comments){
    header1.textContent = `Comments (${comments.length})`
    comments.forEach(comment => commentArea.appendChild(comment))
  }
  else {
    header1.textContent = `Comments (0)`
  }
  addComments.appendChild(form)
  header2.textContent = 'Add a comment'
}

const createCommentForm = (id)=> {
  const form = document.createElement('form')
  const inputName = document.createElement('input')
  const comment = document.createElement('textarea')
  const submit = document.createElement('button')

  inputName.classList.add('form-input')
  comment.classList.add('form-textArea')
  submit.classList.add('form-submit')
  form.classList.add('popup-form')
  form.id = id

  inputName.placeholder = 'Your name'
  comment.placeholder = 'Your insights'
  submit.textContent = 'Comment'

  submit.type = 'button'

  form.appendChild(inputName)
  form.appendChild(comment)
  form.appendChild(submit)

  submit.addEventListener('click', async ()=>handleCommentPost(form))

  return form
}

const handleCommentPost = async (form) => {
  const inputName = form.querySelector('input').value
  const comment = form.querySelector('textarea').value

  if (inputName !== "" && comment !== ""){
    await postComment(form.id, inputName, comment)
    await updateCommentSection(form.id)
  }
  else {
    const submit = form.querySelector('.form-submit')
    const prompt = document.createElement('span')
    prompt.textContent = '* Please input both name and comment to submit'
    prompt.style.color = 'red'
    form.insertBefore(prompt, submit)
  }

}

const updateCommentSection = async (id) => {
  const comments = await getComments(id)
  const commentsSection = document.querySelector('#popup-responses')
  const header = commentsSection.querySelector('.header h2')
  const newComment = document.createElement('p')
  const {comment, creation_date, username} = comments[comments.length-1]
  newComment.innerHTML = `<b>${creation_date} ${username}:</b> ${comment}`
  commentsSection.appendChild(newComment)
  header.textContent = `Comments (${comments.length})`
}

const populateCommentsSection = async(id) => {
  const comments = await getComments(id)
  if (Array.isArray(comments)){
    const returnElements = []
    comments.forEach(data => {
      const {comment, creation_date, username} = data
      const p = document.createElement('p')
      p.innerHTML = `<b>${creation_date} ${username}</b>: ${comment}`
      returnElements.push(p)
    })
    return returnElements
  }
  else {
    return undefined
  }
}

const closePopup = () => {
  removeOverlay()
  const popUp = document.querySelector('#popup')
  document.body.removeChild(popUp)
}

const displayPopup = async (id) => {
  const popUp = createPopUp()
  await populatePopup(id, popUp)
  const closePopUp = popUp.querySelector('#popup-close')
  closePopUp.addEventListener('click', closePopup)
  createOverlay()
  document.body.appendChild(popUp)
}

export {createPopUp, getItemDetails, displayPopup}