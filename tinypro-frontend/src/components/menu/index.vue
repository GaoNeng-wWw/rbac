<template>
  <div class="menu-router">
    <tiny-tree-menu
      ref="tree"
      :data="treeNodes"
      @current-change="currentChange"
      :default-expanded-keys="expandArr"
      :show-filter="false"
      node-key="id"
      wrap
    >
    </tiny-tree-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import type { Component, Ref } from 'vue';
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
import { useRoute, useRouter } from '@/router';
import {useUserInfoStore} from '@/stores';
import type { RouteConfig } from 'vue-router';
import {t} from '@opentiny/vue-locale';

interface ITreeNodeData {
  // node-key='id' 设置节点的唯一标识
  "id": number | string
  // 节点显示文本
  "label": string
  // 子节点
  "children"?: ITreeNodeData[]
  // 链接
  "url"?: string,
  // show-number 时展示的字段
  "number"?: number | string
  // 自定义每个节点的图标
  // "customIcon": Component,
}

const store = useUserInfoStore();
const route = useRoute();
const routes = route.sort((a,b) => (a.meta?.order ?? 0) - (b.meta?.order ??0))
const toNodeData = (route: RouteConfig, parent: RouteConfig|null) => {
  return {
    id: route.meta?.id,
    label: t(route.meta?.locale) || route.meta?.locale,
    url: parent ? [parent.path.replace(/\\/, ''), route.path.replace(/\\/, '')].join('/') : route.path,
    children: []
  } as ITreeNodeData;
}

const useTreeNodeData = (routes: RouteConfig[], parent:RouteConfig|null) => {
  const nodes:ITreeNodeData[] = [];
  for (const route of routes){
    const node = toNodeData(route, parent);
    nodes.push(node);
    node.url = '';
    node.children = useTreeNodeData(route.children ?? [], route);
  }
  return nodes;
}

const treeNodes=useTreeNodeData(routes, null);
const router = useRouter();
const expandArr:Ref<string[]> = ref([]);
const tree = ref();
onMounted(()=>{
  watch(
    () => router.currentRoute.path,
    (newValue: string) => {
      expandArr.value = [router.currentRoute.meta?.id];
      tree.value.setCurrentKey(router.currentRoute.meta?.id);
    },
    { immediate: true },
  );
})
const currentChange = (data: any) => {
  const filter = [
    'Exception',
    'Form',
    'Board',
    'List',
    'Profile',
    'Result',
    'User',
    'Cloud',
  ];
  if (!data.children.length){
    router.push({name: data.id});
  }
};

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
  :deep(.tiny-tree-node.is-current.is-root > .tiny-tree-node__content a){
    color: unset !important;
  }
  :deep(.tiny-tree-node.is-current.is-root > .tiny-tree-node__content a) {
    color: var(--ti-tree-menu-node-hover-bg-color) !important;
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
