<template>
  <div class="option">
    <div class="required">*</div>
    <span>{{ $t('userInfo.status.status') }}：</span>
    <tiny-checkbox-group
      v-model="checkList"
      type="checkbox"
      :options="options"
    ></tiny-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, defineExpose } from 'vue';
import { CheckboxGroup as TinyCheckboxGroup } from '@opentiny/vue';
import { t } from '@opentiny/vue-locale';
import { useUserInfoStore } from '@/stores';
const userStore = useUserInfoStore();
const checkList = ref([]);
const options = ref([
  { label: 'A', text: t('userInfo.status.optionA') },
  { label: 'B', text: t('userInfo.status.optionB') },
  { label: 'C', text: t('userInfo.status.optionC') },
  { label: 'D', text: t('userInfo.status.optionD') },
]);

const reset = () => {
  checkList.value = [];
};

// 监听选择
watch(checkList, (newValue, oldValue) => {
  // userStore.setInfo({ filterStatus: newValue });
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
      width: 70px;
      height: 18px;
      font-size: 14px;
    }

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
    padding: 10px 3px;
  }
</style>
