import type { User } from "@/stores/user";
import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

export function login(data: LoginData){
  return axios.post<string>('/api/auth/login', data)
}

export function getUserInfo(email: string){
  return axios.get<User>('/api/user', {
    params:{
      email
    }
  })
}

export function getUserData(){
  return axios.get('/mock/user/data')
}

