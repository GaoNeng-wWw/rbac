<template>
  <div id="app">
    <div>
      <router-view />
      <global-setting />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import * as echarts from 'echarts';
import GlobalSetting from '@/components/global-setting/index.vue';

provide('echarts', echarts);
</script>

<style lang="less" scoped>
@import './assets/style/menu.less';
</style>