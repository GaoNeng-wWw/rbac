import axios from "axios"

export interface ITreeNodeData {
  // node-key='id' 设置节点的唯一标识
  id: number | string;
  // 节点显示文本
  label: string;
  // 子节点
  children?: ITreeNodeData[];
  // 链接
  url: string;
  //组件
  component: string;
}

export const getMenu = (token: string) => {
  return axios.get<ITreeNodeData[]>('/menu', {
    headers: {
      'Authorization': token
    }
  })
}