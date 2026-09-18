<script setup lang="ts">
import { useFieldValue, useFieldError, useSetFieldValue } from 'vee-validate'
import { registerValidationRules } from '~/utils/functions/validation-rules.function'

registerValidationRules()

const props = withDefaults(
  defineProps<{
    name: string
    label?: string
    isRequired?: boolean
    disabled?: boolean
    accept?: string
  }>(),
  { accept: '.pdf,.jpg,.jpeg,.png' }
)

const fieldValue = useFieldValue(props.name)
const fieldError = useFieldError(props.name)
const setFieldValue = useSetFieldValue(props.name)
const hasError = computed(() => !!fieldError.value)
const isDragging = ref(false)
const fileName = computed(() => {
  const v = fieldValue.value as File | FileList | null | undefined
  if (!v) return ''
  return v instanceof FileList ? (v[0]?.name ?? '') : ((v as File).name ?? '')
})

function onDrop(event: DragEvent) {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) setFieldValue(file)
}
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
    <label
      :for="name"
      class="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors"
      :class="[
        disabled ? 'pointer-events-none opacity-50' : '',
        hasError
          ? 'border-(--color-feedback-red-500) bg-(--color-feedback-red-50)'
          : isDragging
            ? 'border-(--color-brand-primary)'
            : 'border-(--color-brand-neutral-200) hover:border-(--color-brand-primary)'
      ]"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <IconUpload
        class="pointer-events-none size-6 transition-colors"
        :class="
          isDragging
            ? 'text-(--color-brand-primary)'
            : 'text-(--color-brand-neutral-800) group-hover:text-(--color-brand-primary)'
        "
      />
      <div class="pointer-events-none flex flex-col items-center gap-1">
        <p
          v-if="fileName"
          class="text-body-base text-(--color-brand-neutral-800)"
        >
          {{ fileName }}
        </p>
        <p v-else class="text-body-base text-(--color-brand-neutral-800)">
          Para enviar seu cupom fiscal
          <span class="text-(--color-brand-primary)">clique aqui</span>
        </p>
        <p class="text-body-xs text-(--color-brand-neutral-500)">
          Formatos suportados: PDF, JPG, JPEG, PNG até 10 Mb.
        </p>
      </div>
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
