import { APP_URL } from "./API-Data"

const postLikes = async (id)=> {
  await fetch(`${APP_URL}/likes`, {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      item_id: id
    })
  })
}

const getLikes = async ()=> {
  try {
    const request = await fetch(`${APP_URL}/likes`)
    const data = await request.json()
    return data
  }
  catch {
    return null 
   
  }
}

const displayLikes = async ()=> {
  const likes = await getLikes()
  const cards = document.querySelectorAll('.meal-card')
  try {
    cards.forEach(card => {
      const addedLike = likes.find(like => like.item_id === card.id)
      if (addedLike){
        const likeCount = card.querySelector('.like-count')
        likeCount.textContent = `${addedLike.likes} Likes`
      }
    })
  }
  catch {
    return
  }
}

const updateLike = async (id)=> {
  const likes = await getLikes()
  const newLike = likes.find(obj => obj.item_id === id)
  const card = document.getElementById(id)
  const likeCount = card.querySelector('.like-count')
  likeCount.textContent = `${newLike.likes} likes`
}

const updateLikeColor = (id) => {
  const card = document.getElementById(id)
  const likeButton = card.querySelector(`.likeButton`)
  likeButton.style.color = 'red' 
}

export {postLikes, getLikes, displayLikes, updateLike, updateLikeColor}