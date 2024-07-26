import axios from 'axios';

// 获取select的option
export function getUserData() {
  return axios.get('/mock/user/getdata');
}

export function getUserPractic() {
  return axios.get('/mock/user/getrpractic');
}

export function getUserTrain() {
  return axios.get('/mock/user/getrtrain');
}

// 切换数据源
export function getUserChange(data: string) {
  return axios.post('/mock/user/getselect', data as any);
}
