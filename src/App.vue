<script setup lang="ts">

import {darkTheme} from "naive-ui";
import type {GlobalTheme} from "naive-ui";

const theme = ref<GlobalTheme | null>(null); //主题变量
const themeBtnTit = ref("暗色主题"); //主体按钮title
const themeValue = ref("light")

const changeTheme = () => {
  theme.value = theme.value == null ? darkTheme : null;
  themeBtnTit.value = themeBtnTit.value == "亮色主题" ? "暗色主题" : "亮色主题";
  const html = document.getElementsByTagName("html")[0]
  themeValue.value = themeValue.value == "light" ? "dark" : "light";
  html.setAttribute('data-theme', themeValue.value)
};

</script>

<template>
  <div>
    <n-config-provider :theme="theme">
      <n-button @click="changeTheme()">切换</n-button>
      <router-view/>
      <n-global-style/>
    </n-config-provider>
  </div>
</template>

<style scoped>

</style>
