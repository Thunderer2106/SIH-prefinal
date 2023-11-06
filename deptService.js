import axios from 'axios'


const API_URL = 'http://localhost:5000/api/dept/'

const register = async (deptData) => {
    const response = await axios.post(API_URL + 'register', deptData)

    if (response.data) {
        localStorage.setItem('dept', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (deptData) => {
    const response = await axios.post(API_URL, deptData)
    if (response.data) {
        localStorage.setItem('dept', JSON.stringify(response.data))
    }
    return response.data
}


const logout = () => {
    localStorage.removeItem('dept')
}

const deptService = {
    register,
    logout,
    login,

}


export default deptService