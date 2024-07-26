import { useUserInfoStore } from "@/stores"

export const isLogin = () => {
  const user = useUserInfoStore();
  return Boolean(user.token);
}