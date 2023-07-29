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
    console.log(data)
    return data
  }
  catch (e) {
    console.error(e)
  }
}

const displayLikes = async ()=> {
  const cards = document.querySelectorAll('.meal-card')
  const likes = await getLikes()

  likes.forEach(like => {
    const card = document.getElementById(like.item_id)
    const likeCount = card.querySelector('.like-count')
    likeCount.textContent = like.likes

    
  })
}

export {postLikes, getLikes, displayLikes}