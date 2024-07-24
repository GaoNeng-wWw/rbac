import { defineStore } from "pinia";

export interface Menu {
  id: number;
  name: string;
  order: number;
  parentId: number;
  menuType: string;
  component: string;
  path: string;
}

export interface Permission {
  id: number;
  desc: string;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  permission: Permission[];
  menus: Menu[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role[];
  createTime: Date;
  updateTime: Date;
  create_time: Date;
  salt: string;
  update_time: Date;
  deleteAt: number;
}

export const useUserInfoStore = defineStore<'userInfo', {info: null | Partial<User>, token: string}>('userInfo', {
  actions:{
    setToken(token: string){
      this.token = token;
    },
    setInfo(info: Partial<User>){
      this.info = info;
    }
  },
  state(){
    return {
      info: null,
      token: ''
    }
  },
  getters:{
    getInfo: (state) => state.info,
    isLogin: (state) => Boolean(state.token)
  },
})