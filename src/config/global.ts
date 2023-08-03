import {useEventListener} from '@vueuse/core'

useEventListener(document, 'visibilitychange', (evt) => {
  if (document.hidden) {
    document.title = "不要走，再来看看嘛~"
    return;
  }
  document.title = "欢迎回到花树博客~"

})