import axios from 'axios'

const instance = axios.create({
  baseURL:'https://react-myburger-dbb5e-default-rtdb.firebaseio.com/'
})

export default instance;