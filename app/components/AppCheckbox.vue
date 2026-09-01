<script setup lang="ts">
import { useFieldValue, useFieldError } from 'vee-validate'
import { registerValidationRules } from '~/utils/functions/validation-rules.function'

registerValidationRules()

const props = withDefaults(
  defineProps<{
    name: string
    value?: boolean | string
    uncheckedValue?: boolean | string
    disabled?: boolean
    loading?: boolean
  }>(),
  { value: true, uncheckedValue: false, disabled: false }
)

const fieldValue = useFieldValue(props.name)
const fieldError = useFieldError(props.name)
const hasError = computed(() => !!fieldError.value)
const isChecked = computed(() => fieldValue.value === props.value)
const isDisabled = computed(() => props.disabled || props.loading)
</script>
<template>
  <div class="flex flex-col gap-1" data-field>
    <label
      class="inline-flex items-start gap-2 select-none"
      :class="isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    >
      <VeeField
        :id="name"
        :name="name"
        type="checkbox"
        :value="value"
        :unchecked-value="uncheckedValue"
        :disabled="isDisabled"
        class="sr-only peer"
      />
      <!-- opacity só na caixa: o slot pode ter link clicável mesmo com o campo disabled. -->
      <span
        class="relative mt-[2px] size-5 shrink-0 rounded-[4px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-(--color-brand-primary)"
        :class="[
          isChecked
            ? 'bg-(--color-brand-primary)'
            : hasError
              ? 'bg-white shadow-[0_0_0_1.5px_var(--color-feedback-red-500)]'
              : 'bg-white shadow-[0_0_0_1.5px_var(--color-brand-neutral-200)]',
          { 'opacity-50': isDisabled }
        ]"
      >
        <svg
          v-show="isChecked"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
        >
          <path
            d="M1 3.5L4 6.5L10 1"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="text-body-sm font-medium text-(--color-brand-neutral-950)"><slot /></span>
    </label>
    <VeeErrorMessage
      :name="name"
      class="ml-7 text-body-xs font-medium text-(--color-feedback-red-500)"
    />
  </div>
</template>
