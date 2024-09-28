import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (id, newBlog) => {
  const formatedObject = {...newBlog, user: newBlog.user.id}
  console.log(formatedObject)
  const request = await axios.put(`${baseUrl}/${id}`, formatedObject)
  return request.data
}

const deleteBlog = async (id) => {
  try{
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  }
  catch(error){
    throw error
  }
}

const addComment = async (blog, comment) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, {comment: comment })
  return response.data
}

export default { getAll, createBlog, updateBlog, deleteBlog, addComment, setToken }