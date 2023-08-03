<script lang="ts" setup>

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  size: {
    type: [String, Number],
    default: 'default',
  },
});
const trueSize = ref('')
const symbolId = computed ? computed(() => `#${props.prefix}-${props.name}`) : null;
const className = computed ? computed(() => {
  if (typeof props.size === "string") {
    return {
      [`sdms-size-${props.size}`]: props.size,
    };
  } else {
    trueSize.value = props.size + "px";
    return "sdms-size-number"
  }
}) : null;

const fontSize = reactive({default: '32px', small: '20px', large: '48px'});
</script>

<template>
  <svg aria-hidden="true" class="svg-icon-spin" :class="className">
    <use :xlink:href="symbolId" :fill="color"/>
  </svg>
</template>

<style lang='scss' scoped>
.svg-icon-spin {
  width: v-bind('fontSize.default');
  height: v-bind('fontSize.default');
  fill: v-bind(color);
  vertical-align: middle;
  color: v-bind(color);

  &.sdms-size-small {
    width: v-bind('fontSize.small');
    font-size: v-bind('fontSize.small');
    height: v-bind('fontSize.small');
  }

  &.sdms-size-large {
    width: v-bind('fontSize.large');
    font-size: v-bind('fontSize.large');
    height: v-bind('fontSize.large');
  }

  &.sdms-size-number {
    width: v-bind('trueSize');
    font-size: v-bind('trueSize');
    height: v-bind('trueSize');
  }
}
</style>
 