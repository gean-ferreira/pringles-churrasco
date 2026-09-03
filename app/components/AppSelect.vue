<script setup lang="ts">
import { useFieldValue, useFieldError } from 'vee-validate'
import type { SelectOption } from '~/utils/ufOptions'
import { registerValidationRules } from '~/utils/functions/validation-rules.function'

registerValidationRules()

const props = withDefaults(
  defineProps<{
    name: string
    options: SelectOption[]
    label?: string
    placeholder?: string
    disabled?: boolean
    description?: string
    isRequired?: boolean
    loading?: boolean
  }>(),
  { placeholder: 'Selecionar' }
)

defineEmits<{ change: [event: Event] }>()

const fieldValue = useFieldValue(props.name)
const fieldError = useFieldError(props.name)
const hasError = computed(() => !!fieldError.value)
const hasValue = computed(() => !!fieldValue.value)
const isDisabled = computed(() => props.disabled || props.loading)

const fieldClass = computed(() => {
  const base =
    'h-14 w-full appearance-none rounded-xl border px-4 pr-11 text-body-base font-medium outline-none transition-colors'
  let state: string
  if (isDisabled.value)
    state =
      'bg-(--color-brand-neutral-50) border-(--color-brand-neutral-100) text-(--color-brand-neutral-600) cursor-not-allowed'
  else if (hasError.value)
    state =
      'bg-(--color-feedback-red-50) border-(--color-feedback-red-500) text-(--color-brand-neutral-950)'
  else if (hasValue.value)
    state =
      'bg-white border-(--color-feedback-green-500) text-(--color-brand-neutral-950)'
  else
    state =
      'bg-white border-(--color-brand-neutral-100) text-(--color-brand-neutral-400) hover:border-(--color-brand-neutral-950) focus:border-(--color-brand-neutral-950)'
  return [base, state]
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
      <VeeField
        :id="name"
        :name="name"
        as="select"
        :class="fieldClass"
        :disabled="isDisabled"
        @change="$emit('change', $event)"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </VeeField>
      <span
        class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        :class="
          isDisabled
            ? 'text-(--color-brand-neutral-400)'
            : 'text-(--color-brand-neutral-600)'
        "
      >
        <IconSpinner v-if="loading" class="size-[18px]" />
        <IconChevron v-else class="size-[18px]" />
      </span>
    </div>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <VeeErrorMessage
        :name="name"
        class="text-body-xs font-medium text-(--color-feedback-red-500)"
      />
    </Transition>
    <span
      v-if="description"
      class="text-body-xs text-(--color-brand-neutral-600)"
    >
      {{ description }}
    </span>
  </div>
</template>
