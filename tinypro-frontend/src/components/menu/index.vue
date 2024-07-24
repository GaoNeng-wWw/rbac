<template>
  <div class="menu-router">
    <!-- <tiny-tree-menu
      ref="tree"
      :data="treeDataFilter"
      :show-filter="false"
      node-key="id"
      wrap
      :default-expanded-keys="expandeArr"
      @current-change="currentChange"
    >
      <template #default="slotScope">
        <template v-for="(item, index) in routerTitle">
          <span v-if="slotScope.label === item.value" class="menu-title" :key="index">
            <component :is="item.icon"></component>
            <span :class="item.bold">{{ $t(item.name) }}</span>
          </span>
        </template>
      </template>
    </tiny-tree-menu> -->
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import {
  IconDownloadCloud,
  IconFiles,
  IconSetting,
  IconSuccessful,
  IconCueL,
  IconUser,
  IconFiletext,
  IconApplication,
} from '@opentiny/vue-icon';
import { TreeMenu as tinyTreeMenu } from '@opentiny/vue';
import router from '@/router';
import {useUserInfoStore} from '@/stores';

const store = useUserInfoStore();

console.log(store.token)

</script>

<style lang="less" scoped>
  .main-title {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    color: #000;
  }

  .title {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }

  .menu-title {
    display: flex;
    gap: 10px;
    align-items: center;
    height: 20px;

    > svg {
      width: 1.3em;
      height: 1.3em;
    }
  }

  :deep(.tiny-tree-node__wrapper > .is-current > .tiny-tree-node__content) {
    color: #000 !important;
    background: none !important;
    margin-left: 0 !important;
    &:hover {
      background: #fff !important;
      color: #fff !important;
    }
  }

  :deep(.tiny-tree-node__wrapper > .is-expanded >  .tiny-tree-node__children
  > .tiny-tree-node__wrapper > .is-current > .tiny-tree-node__content
  ) {
    background-color: var(--ti-tree-menu-node-hover-bg-color) !important;
    margin-left: 0 !important;
    &:hover {
      background: var(--ti-tree-menu-node-hover-bg-color) !important;
    }
  }

  :deep(.tiny-tree-node__wrapper > .is-expanded > .tiny-tree-node__children
  .tiny-tree-node__wrapper .is-current .tiny-tree-node__content .tree-node-name) {
    border-left: 2px solid var(--ti-tree-menu-square-left-border-color, '#fff') !important;
  }

  :deep(.tiny-tree-node__wrapper > .is-expanded > .tiny-tree-node__children
  .tiny-tree-node__wrapper .is-current .tiny-tree-node__content .tiny-tree-node__content-right) {
    background-color: var(--ti-tree-menu-node-hover-bg-color) !important;
  }

  :deep(.tiny-tree-node__wrapper > .is-expanded > .tiny-tree-node__children
  .tiny-tree-node__wrapper .is-current .tiny-tree-node__content .tiny-tree-node__content-left
  .tiny-tree-node__content-box) {
    background-color: var(--ti-tree-menu-node-hover-bg-color) !important;
  }

  :deep(.tiny-tree-node__wrapper > .is-expanded > .tiny-tree-node__children
  .tiny-tree-node__wrapper .is-current .tiny-tree-node__content .tiny-tree-node__content-left
  .tiny-tree-node__content-box:before) {
    display: none !important;
  }

  :deep(.tiny-tree-node__wrapper > .is-expanded > .tiny-tree-node__children
  .tiny-tree-node__wrapper .is-current .tiny-tree-node__content .tiny-tree-node__content-left:before) {
    display: none !important;
  }

  :deep(.tiny-tree-node__wrapper > .is-current > .tiny-tree-node__content) {
    background-color: #fff !important;
  }

  :deep(.tiny-tree-node__wrapper > .is-current > .tiny-tree-node__content .tiny-tree-node__content-box) {
    background-color: #fff !important;
  }

  :deep(.tiny-tree-node__content:hover) {
    background-color: var(--ti-tree-node-content-hover-bg-color) !important;
  }

  :deep(.tiny-tree-menu__wrap > .tiny-tree-node__wrapper > .is-root > .tiny-tree-node__content
  > .tiny-tree-node__content-left .tiny-tree-node__content-box .tree-node-name) {
    padding: 0 8px !important;
  }

  :deep(.tiny-tree-node > .tiny-tree-node__content) {
    margin-left: 0 !important;
  }

  .tiny-tree-menu
    .tiny-tree
    .tiny-tree-node.is-current
    > .tiny-tree-node__content
    .tree-node-name
    .tiny-svg {
    fill: var(--ti-base-icon-color);
  }
</style>
