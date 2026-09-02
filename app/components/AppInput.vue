<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { useFieldValue, useFieldError } from 'vee-validate'
import { registerValidationRules } from '~/utils/functions/validation-rules.function'

registerValidationRules()

const props = withDefaults(
  defineProps<{
    name: string
    label?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    maskInput?: string
    description?: string
    displayValue?: string | number
    isRequired?: boolean
    inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel'
    loading?: boolean
  }>(),
  { type: 'text' }
)

const fieldValue = useFieldValue(props.name)
const fieldError = useFieldError(props.name)
const hasError = computed(() => !!fieldError.value)
const hasValue = computed(() => !!fieldValue.value)
const isDisabled = computed(() => props.disabled || props.loading)
const showStatusIcon = computed(
  () =>
    props.type !== 'textarea' &&
    (hasValue.value || hasError.value || props.loading)
)

const fieldClass = computed(() => {
  const base =
    'w-full rounded-xl px-4 text-body-base font-medium outline-none transition-colors border placeholder:text-(--color-brand-neutral-400) text-(--color-brand-neutral-950)'
  const shape = props.type === 'textarea' ? 'min-h-28 py-3' : 'h-14'
  const pad = showStatusIcon.value && props.type !== 'textarea' ? 'pr-11' : ''
  let state: string
  if (isDisabled.value)
    state =
      'bg-(--color-brand-neutral-50) border-(--color-brand-neutral-100) text-(--color-brand-neutral-800) cursor-not-allowed'
  else if (hasError.value)
    state = 'bg-(--color-feedback-red-50) border-(--color-feedback-red-500)'
  else if (hasValue.value)
    state = 'bg-white border-(--color-feedback-green-500)'
  else
    state =
      'bg-white border-(--color-brand-neutral-100) hover:border-(--color-brand-neutral-950) focus:border-(--color-brand-neutral-950)'
  return [base, shape, pad, state]
})
</script>
<template>
  <div class="flex flex-col gap-1" data-field>
    <label
      v-if="label"
      :for="name"
      class="text-body-sm font-medium text-(--color-brand-neutral-950)"
    >
      {{ label
      }}<span v-if="isRequired" class="text-(--color-feedback-red-500)">*</span>
    </label>
    <div class="relative flex items-center">
      <input
        v-if="displayValue !== undefined"
        :id="name"
        :value="displayValue"
        readonly
        :class="fieldClass"
      />
      <VeeField
        v-else
        :id="name"
        v-maska
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :inputmode="inputMode"
        :class="fieldClass"
        :as="type === 'textarea' ? 'textarea' : 'input'"
        :rows="type === 'textarea' ? 4 : undefined"
        :disabled="isDisabled"
        :readonly="readonly"
        :data-maska="maskInput"
        validate-on-input
      />
      <span
        v-if="showStatusIcon"
        class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
      >
        <IconSpinner
          v-if="loading"
          class="size-5 text-(--color-brand-neutral-400)"
        />
        <IconError
          v-else-if="hasError"
          class="size-5 text-(--color-feedback-red-500)"
        />
        <IconCheck v-else class="size-5 text-(--color-feedback-green-500)" />
      </span>
    </div>
    <VeeErrorMessage
      :name="name"
      class="text-body-xs font-medium text-(--color-feedback-red-500)"
    />
    <span
      v-if="description"
      class="text-body-xs text-(--color-brand-neutral-500)"
    >
      {{ description }}
    </span>
  </div>
</template>
