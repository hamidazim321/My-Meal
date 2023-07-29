import { APP_URL } from "./API-Data"

const postLikes = async (id)=> {
  await fetch(`${APP_URL}/likes`, {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      item_Id: id
    })
  })
}

const getLikes = async ()=> {
  const request = await fetch(`${APP_URL}/likes`)
  const data = await request.json()
  return data
}

export {postLikes, getLikes}