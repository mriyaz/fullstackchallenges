import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let config = {}

const setToken = (newToken) => {
  const token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObject) => {
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (id, blogObject) => {
  const resp = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return resp.data
}

const deleteEntry = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { setToken, getAll, create, update, deleteEntry }