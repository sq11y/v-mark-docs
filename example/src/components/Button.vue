<template>
  <button ref="element" :type="type" :disabled="disabled" @keydown="emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import type { ButtonHTMLAttributes } from "vue";

  export interface ButtonProps {
    /**
     * The `type` attribute for the button.
     *
     * @default "button"
     */
    type?: ButtonHTMLAttributes["type"];

    /**
     * If the button should be disabled.
     *
     * @default undefined
     */
    disabled?: boolean;
  }

  defineProps<ButtonProps>();

  /**
   * A random model value
   * for demonstration purposes.
   */
  defineModel<boolean>({
    default: true,
  });

  const emit = defineEmits<{
    /**
     * The event triggered on click.
     */
    click: [event: MouseEvent];
  }>();

  defineSlots<{
    /**
     * The label for the button.
     */
    default: any;
  }>();
</script>

<docs lang="md">
A description for _this_ component.
</docs>
