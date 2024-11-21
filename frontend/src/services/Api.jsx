import axios from 'axios';

const apiUrl = '/api'

const api = axios.create({
    baseURL: apiUrl
});

async function getAllUsers(){
    const response = await api.get('/users')
    return response
}

async function getUserById(id){
    const response = await api.get('/users/'+String(id));
    return response
}

async function deleteUserById(id){
    const response = await api.delete('/users/'+String(id));
    return response
}

async function postNewUser({name, balance, dob, currency}){
    const response = await api.post('/users', {name, balance, dob, currency})
    return response
}

async function healthCheck(){
    const response = await api.get('/health')
    return response
}

export {
  api,
  deleteUserById,
  getAllUsers,
  getUserById,
  healthCheck,
  postNewUser,
};
