<script lang="ts" setup>
import {nextTick} from "vue";

enum LoginMethod {
  PASSWORD,
  SMS
}

/**
 * 路由跳转
 */
const emit = defineEmits(["router-change"]);
const routeTo = (path: string) => {
  emit("router-change", path);
}

/**
 * 定义登录方式类型
 */
const loginType = ref(LoginMethod.PASSWORD)

/**
 * 修改登录方式
 */
const changeLoginType = (method: LoginMethod) => {
  loginType.value = method
  nextTick(() => {
    clearElementStyle()
  })
}

/**
 * 删除元素
 * @param el
 */
const removeElement = (el: HTMLElement) => {
  el.remove();
}

/**
 * 清除不必要的样式
 */
const clearElementStyle = () => {
  const elementList = document.querySelectorAll(".login-panel .inputForm .n-input__border,.login-panel .inputForm .n-input__state-border");
  for (let element: HTMLElement of elementList) {
    removeElement(element)
  }
}

/**
 * 页面渲染完成钩子函数
 */
onMounted?.(() => {
  clearElementStyle()
})

</script>

<template>
  <div class="login-panel">
    <n-form class="form">
      <div class="flex-column">
        <label>用户名/手机号</label></div>
      <div class="inputForm">
        <SvgIcon size="small" name="svg-username"/>
        <n-input placeholder="请输入用户名/手机号" class="input" type="text"></n-input>
      </div>
      <div class="flex-column" v-if="loginType === LoginMethod.PASSWORD">
        <label>密码 </label></div>
      <div class="inputForm" v-if="loginType === LoginMethod.PASSWORD">
        <SvgIcon size="small" name="svg-password"/>
        <n-input placeholder="请输入密码" class="input" type="password"></n-input>
      </div>
      <div class="flex-column" v-if="loginType === LoginMethod.SMS">
        <label>验证码 </label></div>
      <div class="inputForm" v-if="loginType === LoginMethod.SMS">
        <SvgIcon size="small" name="ali-sms_code_prefix"/>
        <n-input placeholder="请输入手机验证码" class="input" type="text">
          <template #suffix>
            <n-button type="primary">发送验证码</n-button>
          </template>
        </n-input>
      </div>
      <div class="flex-row">
        <div v-if="loginType === LoginMethod.SMS" @click="changeLoginType(LoginMethod.PASSWORD)">
          <span class="span" title="使用密码登录"
                alt="使用密码登录"><SvgIcon name="ali-password_login"/></span>
        </div>
        <div v-if="loginType === LoginMethod.PASSWORD" @click="changeLoginType(LoginMethod.SMS)">
          <span class="span" title="使用手机验证码登录"
                alt="使用手机验证码登录"><SvgIcon name="ali-sms_code"/></span>
        </div>
        <span class="span" @click="routeTo('/auth/forget')">忘记密码?</span>
      </div>
      <n-button class="btn" type="success">
        <SvgIcon name="ali-login"/>
        登 录
      </n-button>
      <p class="p">还没有账号? <span class="span" @click="routeTo('/auth/register')">注册</span>
      </p>
      <p class="p line">或者</p>
      <div class="flex-row">
        <n-button class="btn qq">
          <SvgIcon name="ali-qq"/>
          QQ
        </n-button>
        <n-button class="btn github">
          <SvgIcon name="svg-github"/>
          GitHub
        </n-button>
        <n-button class="btn gitee">
          <SvgIcon name="ali-gitee"/>
          Gitee
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<style lang='scss' scoped>

.login-panel {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  overflow: auto;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    @include useTheme {
      background-color: getVar('authFormBgColor');
    }
    padding: 30px;
    width: 450px;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none !important;
    width: 100%;
  }

  .input:focus {
    outline: none !important;
  }

  .inputForm:focus-within {
    border: 1.5px solid #36ad6a;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .flex-row > div > label {
    font-size: 14px;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #36ad6a;
    font-weight: 500;
    cursor: pointer;
  }

  .p {
    text-align: center;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

}
</style>
 