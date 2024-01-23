<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  label?: string
  labelClass?: string
  inputClass?: string
  errorClass?: string
  placeholder?: string
  disabled?: boolean
  validateTrigger?: 'change' | 'blur' | 'input'
}

const {
  name,
  label = '',
  disabled,
  labelClass,
  inputClass,
  errorClass,
  placeholder,
  validateTrigger = 'input',
} = defineProps<Props>()

const { errorMessage, value, handleChange, handleBlur } = useField(() => name, undefined, {
  validateOnValueUpdate: false,
})

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, validateTrigger === 'blur'),
  change: (evt: Event) => handleChange(evt, validateTrigger === 'change'),
  input: (evt: Event) => handleChange(evt, validateTrigger === 'input'),
}
</script>

<template>
  <div my-4>
    <slot name="label">
      <label class="block text-left text-sm text-gray-900 font-medium dark:text-white" :class="labelClass">{{ label }}</label>
    </slot>
    <slot :value="value" v-bind="validationListeners">
      <input
        :value="value"
        type="text"
        :class="inputClass"
        :placeholder="placeholder"
        :disabled="disabled"
        class="h-9 w-full flex border border-input rounded-md bg-transparent px-3 py-1 text-sm shadow-sm outline-none transition-colors disabled:cursor-not-allowed file:border-0 file:bg-transparent file:text-sm placeholder:text-muted-foreground file:font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        v-on="validationListeners"
      >
    </slot>
    <slot v-if="errorMessage" name="error" :message="errorMessage">
      <span :class="errorClass" class="mt-1 block text-right text-red">
        {{ `*${errorMessage}` }}</span>
    </slot>
  </div>
</template>
