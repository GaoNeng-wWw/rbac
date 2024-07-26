import { useRouter } from '@/router';
import { useI18n } from '@/locale';
import { Modal } from '@opentiny/vue';
import { useUserInfoStore } from '@/stores';

export default function useUser() {
  const { t } = useI18n();
  const router = useRouter();
  const userStore = useUserInfoStore();
  const logout = async (logoutTo?: string) => {
    // TODO: await userStore.logout();
    const currentRoute = router.currentRoute;
    Modal.message({
      message: t('setting.loginout'),
      status: 'success',
    });
    router.push({
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
      query: {
        ...router.currentRoute.query,
        redirect: currentRoute.name as string,
      },
    });
  };
  return {
    logout,
  };
}
