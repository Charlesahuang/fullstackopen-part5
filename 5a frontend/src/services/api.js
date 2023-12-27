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
const addBlog = async (url, title,content, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/notes`,
      { url, title,content },
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

export default { getAll, login, addBlog }