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

  const emit = defineEmits<{ click: [event: KeyboardEvent] }>();

  defineSlots<{ default: any }>();
</script>
