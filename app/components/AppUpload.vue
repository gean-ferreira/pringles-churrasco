<script setup lang="ts">
import { useFieldValue, useFieldError } from 'vee-validate'
import { registerValidationRules } from '~/utils/functions/validation-rules.function'

registerValidationRules()

const props = withDefaults(
  defineProps<{ name: string; disabled?: boolean; accept?: string }>(),
  { accept: '.pdf,.jpg,.jpeg,.png' }
)

const fieldValue = useFieldValue(props.name)
const fieldError = useFieldError(props.name)
const hasError = computed(() => !!fieldError.value)
const fileName = computed(() => {
  const v = fieldValue.value as File | FileList | null | undefined
  if (!v) return ''
  return v instanceof FileList ? (v[0]?.name ?? '') : ((v as File).name ?? '')
})
</script>
<template>
  <div class="flex flex-col gap-1" data-field>
    <label
      :for="name"
      class="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border bg-white p-6 text-center transition-colors"
      :class="[
        disabled ? 'pointer-events-none opacity-50' : '',
        hasError
          ? 'border-(--color-feedback-red-500) bg-(--color-feedback-red-50)'
          : 'border-(--color-brand-neutral-100) hover:border-(--color-brand-primary)'
      ]"
    >
      <IconUpload class="size-8 text-(--color-brand-neutral-400)" />
      <div class="flex flex-col gap-0.5">
        <span
          class="text-body-sm font-semibold text-(--color-brand-neutral-950)"
        >
          {{ fileName || 'Arraste e solte um arquivo aqui para upload' }}
        </span>
        <span class="text-body-xs text-(--color-brand-neutral-800)">
          Formatos suportados: PDF, JPG, JPEG, PNG até 10 Mb.
        </span>
      </div>
      <span
        class="text-body-sm rounded-lg bg-(--color-brand-primary) px-4 py-[10px] font-bold text-white transition-colors group-hover:bg-(--color-brand-primary-dark)"
      >
        ou selecione um arquivo
      </span>
      <VeeField
        :id="name"
        :name="name"
        type="file"
        :accept="accept"
        :disabled="disabled"
        class="sr-only"
      />
    </label>
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
  </div>
</template>
