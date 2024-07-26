<template>
  <div class="header__wrapper">
    <div class="user">
      <img src="@/assets/images/user-head.png" alt="user" class="user-image" />
      <div>
        <h3 class="user-name">{{ $t('stepForm.head.admin') }}</h3>
        <h3 class="user-name"> admin </h3>
        <!-- <h3 class="user-name">{{ userStore.info?.name }}</h3> -->
      </div>
    </div>
    <div class="divider"></div>
    <div class="user-content">
      <tiny-layout>
        <tiny-row :flex="true" justify="center" class="margin-y">
          <img src="@/assets/images/head-1.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.recruitment.department') }}</div>
              <div class="space"></div>
              <!-- <div>{{ userStore.userInfo.department }}</div> -->
            </div>
          </tiny-col>
          <img src="@/assets/images/head-2.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.recruitment.type') }}</div>
              <div class="space"></div>
              <div>{{ userStore.info?.role?.map((role) => role.name).join(',') }}</div>
            </div>
          </tiny-col>
          <img src="@/assets/images/head-3.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.recruitment.position') }}</div>
              <div class="space"></div>
              <!-- <div>{{ userStore.userInfo.job }}</div> -->
            </div>
          </tiny-col>
        </tiny-row>
        <tiny-row :flex="true" justify="center" class="margin-y">
          <img src="@/assets/images/head-4.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.probation.start') }}</div>
              <div class="space"></div>
              <div>
                <!-- {{ userStore.userInfo.probationStart }} -->
                ~
                <!-- {{ userStore.userInfo.probationEnd }} -->
              </div>
            </div>
          </tiny-col>
          <img src="@/assets/images/head-5.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.start.date') }}</div>
              <div class="space"></div>
              <!-- <div>{{ userStore.userInfo.protocolStart }}</div> -->
            </div>
          </tiny-col>
          <img src="@/assets/images/head-6.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.probation.period') }}</div>
              <div class="space"></div>
              <div>
                <!-- {{ userStore.userInfo.probationDuration }}{{ $t('stepForm.probation.day') }} -->
              </div>
            </div>
          </tiny-col>
        </tiny-row>
      </tiny-layout>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Layout as TinyLayout,
  Row as TinyRow,
  Col as TinyCol,
} from '@opentiny/vue';
import { useUserInfoStore } from '@/stores';

const userStore = useUserInfoStore();
</script>

<style scoped lang="less">
.header__wrapper {
  display: flex;
  width: 100%;
  height: fit-content;
  align-self: center;
  align-items: center;
  padding: 0 43px;
  justify-content: space-between;
  .user {
    width:fit-content;
    display: flex;
    gap: 32px;
    flex: 0 0 auto;
    .user-image {
      font-style: oblique;
      border-radius: 60px;
      height: 86px;
    }
    .user-name {
      color: #fff;
      font-weight: 600;
      font-size: large;
    }
  }
}
.margin-y {
  margin: 30px 0px;
}

.col {
  color: #fff;
}
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .margin-bottom {
      margin-top: 10px;
      margin-bottom: 12px;
    }
  }
  @media (max-width: @screen-ml) {
    .margin-bottom {
      margin-top: 10px;
      margin-bottom: 12px;
    }
  }
  @media (max-width: @screen-xs) {
    .user {
      width: 25%;
    }
  }
</style>
