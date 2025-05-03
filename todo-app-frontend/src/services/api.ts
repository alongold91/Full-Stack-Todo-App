import axios from 'axios';
import { CreateUserData, LoginUserData } from '../types/user';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export async function createNewUser(data: CreateUserData) {
    return await axiosInstance.post('api/users/create', data)
}

export async function loginUser(data: LoginUserData) {
    return await axiosInstance.post('api/users/login', data)
}