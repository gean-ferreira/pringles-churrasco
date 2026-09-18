<script setup lang="ts">
const props = defineProps<{ currentStep: 1 | 2 | 3 }>()

const STEPS = [
  { step: 1, label: 'Vote' },
  { step: 2, label: 'Cadastre seu PIN' },
  { step: 3, label: 'Resultado' }
] as const

// Steps já concluídos continuam marcados como ativos, não só o atual.
function isActive(step: number) {
  return step <= props.currentStep
}
</script>

<template>
  <div class="bg-(--color-brand-accent-green)">
    <div class="container flex items-center gap-2 pt-6 pb-4">
      <template v-for="(item, index) in STEPS" :key="item.step">
        <div class="flex shrink-0 items-center gap-1">
          <div class="relative flex size-5 items-center justify-center">
            <img
              :src="
                isActive(item.step)
                  ? '/images/step-indicator-active.svg'
                  : '/images/step-indicator-inactive.svg'
              "
              alt=""
              aria-hidden="true"
              class="absolute inset-0 size-full"
              :class="isActive(item.step) ? 'rotate-[16deg]' : 'size-5'"
            />
            <span
              class="text-body-xs relative font-bold [text-shadow:0.5px_0.5px_0_var(--color-brand-outline)]"
              :class="
                isActive(item.step)
                  ? 'text-white'
                  : 'text-(--color-brand-secondary)'
              "
            >
              {{ item.step }}
            </span>
          </div>
          <p
            class="text-body-xs font-bold whitespace-nowrap uppercase [text-shadow:0.5px_0.5px_0_var(--color-brand-outline)]"
            :class="
              isActive(item.step)
                ? 'text-(--color-brand-secondary)'
                : 'text-white'
            "
          >
            {{ item.label }}
          </p>
        </div>
        <div
          v-if="index < STEPS.length - 1"
          class="h-px min-w-px flex-1"
          aria-hidden="true"
        >
          <img
            src="/images/step-indicator-divider.svg"
            alt=""
            class="block h-full w-full"
          />
        </div>
      </template>
    </div>
  </div>
</template>
