<script setup lang="ts">
import { NOVOS_SABORES_DATA } from '~/utils/datas/novosSabores.data'
import { useParticipacaoStore } from '~/stores/participacao.store'

const emit = defineEmits<{ voted: [] }>()
defineProps<{ disabled?: boolean }>()

const participacaoStore = useParticipacaoStore()

const selecionado = ref<string | null>(null)

const firstCardRef = ref<HTMLButtonElement | null>(null)
onMounted(() => {
  firstCardRef.value?.focus()
})

// O voto não tem endpoint próprio: vai junto com o PIN no step seguinte.
function onSubmit() {
  const sabor = NOVOS_SABORES_DATA.find((s) => s.slug === selecionado.value)
  if (!sabor) return

  participacaoStore.setFlavorId(sabor.id)
  emit('voted')
}
</script>

<template>
  <div class="flex w-full flex-col items-center gap-14 pb-14 md:pb-25">
    <h1 class="page-title text-center">
      Vote no seu sabor<br />
      preferido!
    </h1>

    <div
      class="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible"
    >
      <button
        v-for="(sabor, index) in NOVOS_SABORES_DATA"
        :key="sabor.slug"
        :ref="
          (el) => {
            if (index === 0) firstCardRef = el as HTMLButtonElement
          }
        "
        type="button"
        class="group comic-chrome-lg relative flex w-[260px] shrink-0 cursor-pointer snap-center flex-col items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-8 transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:shrink"
        :class="
          selecionado === sabor.slug
            ? 'bg-(--color-brand-outline)'
            : 'bg-(--color-brand-accent-green) hover:bg-(--color-brand-outline)'
        "
        :disabled="disabled"
        @click="selecionado = sabor.slug"
      >
        <div aria-hidden="true" class="card-pattern" />

        <div
          class="relative flex flex-col items-center text-center text-white uppercase"
        >
          <p
            class="text-h3 font-bold [text-shadow:2px_2px_0_var(--color-brand-outline)]"
          >
            {{ sabor.name }}
          </p>
          <p
            class="text-h4 font-bold [text-shadow:2px_2px_0_var(--color-brand-outline)]"
          >
            {{ sabor.subtitle }}
          </p>
        </div>

        <img
          :src="sabor.image"
          :alt="`Lata Pringles sabor ${sabor.name} ${sabor.subtitle}`"
          width="120"
          height="358"
          class="relative h-[240px] w-auto md:h-[300px]"
        />

        <img
          src="/images/cadastro-nota-check-badge.svg"
          alt=""
          aria-hidden="true"
          class="absolute right-4 bottom-4 size-16 transition-opacity"
          :class="
            selecionado === sabor.slug
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100'
          "
        />
      </button>
    </div>

    <AppButton
      type="button"
      variant="success"
      class="w-full max-w-[384px]"
      :disabled="!selecionado || disabled"
      @click="onSubmit"
    >
      Votar
    </AppButton>
  </div>
</template>
