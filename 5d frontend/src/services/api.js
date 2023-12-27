import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getAll = () => {
  const request = axios.get(baseUrl + '/api/notes')
  return request.then(response => response.data)
}
//5.1
const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/api/login`, { username, password })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

//5.3
const addBlog = async (url, title, content, author, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/notes`,
      { url, title, author, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const addlikes = async (obj, token) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/notes/${obj.id}`, obj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

const removeBlog = async (id,token) => {
  try {
    await axios.delete(`${baseUrl}/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return true
  } catch (error) {
    throw error
  }
}

export default { getAll, login, addBlog, addlikes,removeBlog }