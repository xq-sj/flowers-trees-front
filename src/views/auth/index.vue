<script lang="ts" setup>
import Login from './login'
import Register from './register'
import Forget from './forget'
import {useRoute, useRouter} from "vue-router";
import {watch} from "vue";
// 粒子特效
import useParticles from "@/hooks/particles";

const route = useRoute();
const router = useRouter();
const type = ref<string>('')

enum AuthType {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGET = 'forget'
}

/**
 * 使用粒子特效
 */
const particles = useParticles();

/**
 * 检查当前页面类型是否正确
 */
const checkCurAuthType = () => {
  if (type.value) {
    for (let authTypeKey in AuthType) {
      if (type.value === AuthType[authTypeKey]) {
        // 当前请求的认证类型是定义好的页面，验证成功，返回就行
        return;
      }
    }
  }
  // 当前没有设置请求认证页面类型 或 函数没有被停止，验证失败 跳转到错误页面
  router.push("/error")
}

/**
 * 页面渲染完成后的钩子函数
 */
onMounted?.(() => {
  type.value = route.params.type
  checkCurAuthType()
})

/**
 * 子组件返回的路由改变事件
 * @param path
 */
const routerChange = (path: string) => {
  type.value = path
  router.push(path)
}

/**
 * 监听导航栏的变化
 */
watch(route, value => {
  type.value = value.params.type
  checkCurAuthType()
})

</script>

<template>
  <div>
    <Particles
      id="tsparticles"
      :particlesInit="particles.particlesInit"
      :options="particles.options"
    />
    <Login @router-change="routerChange" v-if="type === AuthType.LOGIN"/>
    <Register @router-change="routerChange" v-else-if="type === AuthType.REGISTER"/>
    <Forget @router-change="routerChange" v-else-if="type === AuthType.FORGET"/>
  </div>
</template>

<style lang='scss' scoped>
#tsparticles {
  z-index: -100 !important;
}
</style>
 