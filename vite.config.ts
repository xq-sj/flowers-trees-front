import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
// naive-ui
import {NaiveUiResolver} from "unplugin-vue-components/resolvers";
// svg-icon
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  },
  server: {
    port: 9809
  },
  plugins: [
    vue(),
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue',
        'vue-router',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ],
      //存放的位置
      dts: "src/auto-import.d.ts",
    })
    ,
    Components({
      // 引入组件的,包括自定义组件
      // 存放的位置
      dts: "src/components.d.ts",
      resolvers: [NaiveUiResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/common.scss";'
      }
    }
  }
})