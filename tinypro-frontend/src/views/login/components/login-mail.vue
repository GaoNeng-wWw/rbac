<template>
  <div class="login-form-container">
    <tiny-form
      ref="loginFormMail"
      :model="loginMail"
      class="login-form"
      :rules="rules"
      validate-type="text"
      label-width="0"
      size="medium"
    >
      <tiny-form-item prop="mailname" size="medium">
        <tiny-input
          v-model="loginMail.mailname"
          :placeholder="$t('login.form.mailName.placeholder')"
        >
        </tiny-input>
      </tiny-form-item>

      <tiny-form-item prop="mailpassword" size="medium">
        <tiny-input
          v-model="loginMail.mailpassword"
          type="password"
          show-password
          :placeholder="$t('login.form.mailpassword.placeholder')"
        >
        </tiny-input>
      </tiny-form-item>

      <div class="login-form-options">
        <tiny-checkbox>{{ $t('login.form.rememberPassword') }}</tiny-checkbox>
        <div>
          <tiny-link type="primary">
            {{ $t('login.form.forgetPassword') }}
          </tiny-link>
          <tiny-link type="primary" class="divide-line">|</tiny-link>
          <tiny-link type="primary" @click="typeChange">
            {{ $t('login.form.registration') }}
          </tiny-link>
        </div>
      </div>

      <tiny-form-item size="medium">
        <tiny-button
          type="primary"
          class="login-form-btn"
          :loading="loading"
          @click="handleSubmit"
          >{{ $t('login.form.login') }}</tiny-button
        >
      </tiny-form-item>
    </tiny-form>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, reactive } from 'vue';
import { useRouter } from '@/router';
import {
  Form as TinyForm,
  FormItem as TinyFormItem,
  Input as TinyInput,
  Button as TinyButton,
  Checkbox as TinyCheckbox,
  Link as TinyLink,
  Modal,
  Notify,
} from '@opentiny/vue';
import {t} from '@opentiny/vue-locale';
import { useUserInfoStore } from '@/stores/user';
import useLoading from '@/hooks/loading';
import { login } from '@/api/user';

const userInfo = useUserInfoStore();

const router = useRouter();
const { loading, setLoading } = useLoading();
const loginFormMail = ref();
const rules = {
  mailname: [
    {
      required: true,
      message: t('login.form.mailName.errMsg'),
      trigger: 'change',
    },
  ],
  mailpassword: [
    {
      required: true,
      message: t('login.form.mailpassword.errMsg'),
      trigger: 'change',
    },
  ],
}

const loginMail = reactive({
  mailname: 'admin@no-reply.com',
  mailpassword: 'admin',
  rememberPassword: true,
});

// 切换模式
const handle: any = inject('handle');
const typeChange = () => {
  handle(true);
};

function handleSubmit() {
  loginFormMail.value?.validate(async (valid: boolean) => {
    if (!valid) {
      return;
    }

    setLoading(true);

    try {
      const {data} = await login({
        email: loginMail.mailname,
        password: loginMail.mailpassword
      })
      userInfo.$patch({
        token: data,
      })
      Modal.message({
        message: t('login.form.login.success'),
        status: 'success',
      });
      const { redirect, ...othersQuery } = router.currentRoute.query;
      router.push({
        name: (redirect as string) || 'Home',
        query: {
          ...othersQuery,
        },
      });
    } catch (err) {
      Notify({
        type: 'error',
        title: t('login.tip.right'),
        message: t('login.tip.mail'),
        position: 'top-right',
        duration: 2000,
        customClass: 'my-custom-cls',
      });
    } finally {
      setLoading(false);
    }
  });
}
</script>

<style lang="less" scoped>
  .login-form-container {
    margin-top: 5%;
  }

  .login-form {
    margin-left: 6%;

    .tiny-form-item {
      margin-bottom: 20px;
    }

    &-container {
      width: 320px;
    }

    &-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 12px;
    }

    &-btn {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }

  .divide-line {
    margin: 0 5px;
  }
  // responsive
  @media (max-width: @screen-ms) {
    .login-form {
      margin-left: 5%;

      &-container {
        width: 240px;
      }
    }
  }
</style>
