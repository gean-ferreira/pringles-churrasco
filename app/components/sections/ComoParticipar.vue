<script setup lang="ts">
import { usePromotionStatus } from '~/composables/usePromotionStatus'
import { COMO_PARTICIPAR_DATA } from '~/utils/datas/comoParticipar.data'

const { isLoggedIn } = useAuth()
const { isPromotionFinished } = usePromotionStatus()
</script>

<template>
  <section
    id="como-participar"
    class="relative overflow-hidden bg-(--color-brand-outline) bg-[url('/images/novos-sabores-kv-bg.jpg')] bg-cover bg-center"
  >
    <div class="relative container flex flex-col items-center gap-10 py-14 xl:py-18">
      <div class="flex items-center gap-8">
        <IconStar class="hidden size-8 shrink-0 text-white xl:block" />
        <h2 class="flex flex-col items-center font-bold uppercase">
          <span
            class="text-body-sm relative z-10 -mb-1 flex h-[30px] w-[139px] items-center justify-center bg-[url('/images/tarja-home-titulo.png')] bg-size-[100%_100%] text-white [text-shadow:1px_1px_0_var(--color-brand-outline)] xl:text-body-base xl:h-9 xl:w-[168px]"
          >
            Saiba como
          </span>
          <!-- Figma: no mobile são 2 tarjas de 343×74 empilhadas (sobrepostas
               28px); no desktop uma de 714×154, com a sombra passando 13px do texto. -->
          <span
            class="text-h2 xl:text-h1-lg text-shadow-comic flex h-[120px] w-[343px] items-center justify-center bg-[url('/images/tarja-home-titulo.png'),url('/images/tarja-home-titulo.png')] bg-size-[343px_74px] bg-position-[0_0,0_46px] bg-no-repeat text-center text-(--color-brand-secondary) xl:h-[154px] xl:w-[714px] xl:bg-[url('/images/tarja-home-titulo.png')] xl:bg-size-[714px_154px] xl:bg-position-[0_0] xl:pb-[13px]"
          >
            Participar da promoção
          </span>
        </h2>
        <IconStar class="hidden size-8 shrink-0 text-white xl:block" />
      </div>

      <!-- 1 → 2 → 4 colunas (nunca 3, que deixaria um card órfão). -->
      <ol
        class="grid w-full grid-cols-1 justify-items-center gap-6 sm:max-w-[600px] sm:grid-cols-2 xl:max-w-none xl:grid-cols-4"
      >
        <li
          v-for="step in COMO_PARTICIPAR_DATA"
          :key="step.src"
        >
          <img
            :src="step.src"
            :alt="step.alt"
            width="278"
            height="326"
            loading="lazy"
          />
        </li>
      </ol>

      <p class="text-body-xs text-center font-bold text-white uppercase">
        *Prêmio entregue em cartão virtual pré-pago, sem a função de saque.
      </p>

      <ClientOnly>
        <AppButton
          v-if="!isPromotionFinished"
          :to="isLoggedIn ? '/cadastro-nota' : '/cadastro'"
          variant="secondary"
          block
          class="max-w-[384px]"
        >
          Participe já
        </AppButton>
      </ClientOnly>
    </div>
  </section>
</template>
