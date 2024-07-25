<template>
  <div class="option">
    <div class="required">*</div>
    <span>{{ $t('userInfo.filter.endTime') }}：</span>
    <tiny-date-picker
      v-model="endTime"
      value-format="yyyy-MM-dd"
      @blur="handleBlur"
    ></tiny-date-picker>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, defineExpose } from 'vue';
import { DatePicker as TinyDatePicker, Modal } from '@opentiny/vue';
import {t} from '@opentiny/vue-locale';
import { useUserInfoStore } from '@/stores';

const userStore = useUserInfoStore();
const endTime = ref('');

const reset = () => {
  endTime.value = '';
};

const handleBlur = () => {
  const start = new Date(
    // JSON.parse(JSON.stringify(userStore.startTime))
  ).getTime();
  const end = new Date(JSON.parse(JSON.stringify(endTime.value))).getTime();
  if (end < start) {
    endTime.value = '';
    Modal.message({
      message: t('userInfo.time.message'),
      status: 'error',
    });
  }
};

// 监听选择
watch(endTime, (newValue, oldValue) => {
  // userStore.setInfo({ endTime: newValue });
});

defineExpose({
  reset,
});
</script>

<style scoped lang="less">
  .option {
    .required {
      margin-top: 5px;
      color: rgb(190, 24, 24);
      font-size: 140%;
    }

    span {
      width: 110px;
      height: 18px;
      font-size: 14px;
    }

    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 3px;
  }
</style>
