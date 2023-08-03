import "vue-router";

/**
 * 拓展vue-router
 */
declare module "vue-router" {
  /**
   * 在meta中声明新添加的字段
   */
  interface RouteMeta {
    readonly title: string
  }
}
