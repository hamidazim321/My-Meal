const getMyLikes = () => {
  const likes = JSON.parse(localStorage.getItem('myFavourites')) || []
  return likes
}

const saveMyLikes = (id) => {
  const likes = getMyLikes()
  const newLike = {
    id: id
  }
  likes.push(newLike)
  localStorage.setItem('myFavourites', JSON.stringify(likes))
}

const highlightMyLikes = () => {
  const myLikes = getMyLikes()
  const meals = document.querySelectorAll('.meal-card')

  meals.forEach(meal => {
    if (myLikes.find(obj => obj.id === meal.id)){
      const likeButton = meal.querySelector('.likeButton')
      likeButton.style.color = 'red'
    }
  })
}

export {highlightMyLikes, saveMyLikes, getMyLikes}