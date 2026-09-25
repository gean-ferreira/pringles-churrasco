<script setup lang="ts">
import { usePromotionStatus } from '~/composables/usePromotionStatus'

const { isLoggedIn } = useAuth()
const { isPromotionFinished } = usePromotionStatus()
</script>

<template>
  <!-- isolate: cria o contexto de empilhamento para os garfos (-z-10) ficarem
       atrás de todo o conteúdo, mas ainda na frente do fundo verde. -->
  <section
    id="premios"
    class="relative isolate overflow-x-clip bg-(--color-brand-accent-green)"
  >
    <AppBgPattern :opacity="5" />

    <div class="relative container flex flex-col items-center pt-12 xl:pt-20">
      <div class="flex items-center gap-2 xl:gap-6">
        <IconStar class="size-4 shrink-0 text-white xl:size-8" />
        <h2
          class="text-h3 xl:text-h1-lg text-shadow-comic flex flex-col items-center text-center font-bold uppercase"
        >
          <span class="text-white">Quanto mais você compra,</span>
          <span class="text-(--color-brand-secondary)">
            mais chances de ganhar!
          </span>
        </h2>
        <IconStar class="size-4 shrink-0 text-white xl:size-8" />
      </div>

      <!-- TODO: falta a arte home-premios-card-mobile.png (334×559).
           Background (não <img>): só a arte do breakpoint ativo é baixada. -->
      <div
        class="relative mt-[84px] h-[559px] w-[334px] bg-[url('/images/home-premios-card-mobile.png')] bg-size-[100%_100%] bg-no-repeat xl:mt-[106px] xl:h-[500px] xl:w-full xl:bg-[url('/images/home-premios-card-desktop.png')]"
      >
        <img
          src="/images/fale-conosco-garfo.png"
          alt=""
          aria-hidden="true"
          width="269"
          height="521"
          loading="lazy"
          class="animate-fork-wobble-left pointer-events-none absolute -top-[84px] -left-[3px] -z-10 h-[156px] w-[80px] origin-bottom motion-reduce:animate-none xl:-top-[135px] xl:-left-[158px] xl:h-[477px] xl:w-[246px]"
        />
        <img
          src="/images/fale-conosco-garfo.png"
          alt=""
          aria-hidden="true"
          width="269"
          height="521"
          loading="lazy"
          class="animate-fork-wobble-right pointer-events-none absolute -top-[84px] -right-[6px] -z-10 h-[156px] w-[80px] origin-bottom motion-reduce:animate-none xl:-top-[135px] xl:-right-[162px] xl:h-[477px] xl:w-[246px]"
        />

        <div
          class="absolute -top-[5px] right-0 left-[11px] flex flex-col items-center gap-2 xl:-top-[20px] xl:right-[100px] xl:left-auto xl:w-[554px] xl:gap-5"
        >
          <div class="relative w-[285px] xl:w-[542px]">
            <img
              src="/images/home-titulo-promo.png"
              alt="Achou, ganhou! Prêmios de R$ 500 toda hora"
              width="592"
              height="427"
              loading="lazy"
              class="block h-auto w-full"
            />
            <p
              class="text-body-xs absolute inset-x-0 bottom-[21px] hidden text-center font-bold text-white uppercase xl:block"
            >
              *Prêmio entregue em cartão virtual pré-pago, sem a função de saque.
            </p>
          </div>
          <div class="flex items-start justify-center gap-2 xl:gap-5">
            <IconStar class="size-3 shrink-0 text-(--color-brand-outline) xl:size-7" />
            <p
              class="text-body-sm xl:text-h3 max-w-[200px] text-center font-bold text-(--color-brand-outline) uppercase xl:max-w-[420px]"
            >
              Pra deixar seu churrasco completo do jeito BR
            </p>
            <IconStar class="size-3 shrink-0 text-(--color-brand-outline) xl:size-7" />
          </div>
        </div>

        <!-- Figma (nós 9874:28047/28056/28069), xl escalado ×0.915. PNGs já
             vêm inclinados ~15°: rotação = Figma − 15°. -->
        <img
          src="/images/novos-sabores-costela.png"
          alt="Lata Pringles sabor Costela na brasa"
          width="183"
          height="544"
          loading="lazy"
          class="animate-can-float absolute top-[272px] left-[2px] w-[50px] -rotate-[5.86deg] drop-shadow-xl motion-reduce:animate-none xl:top-[37px] xl:-left-[23px] xl:h-[274px] xl:w-[93px]"
          style="--float-y: -12px; animation-duration: 3s"
        />
        <img
          src="/images/novos-sabores-linguica.png"
          alt="Lata Pringles sabor Linguiça com vinagrete"
          width="183"
          height="544"
          loading="lazy"
          class="animate-can-float absolute top-[242px] left-[218px] w-[56px] rotate-[13.85deg] drop-shadow-xl motion-reduce:animate-none xl:-top-[16px] xl:left-[350px] xl:h-[309px] xl:w-[105px]"
          style="--float-y: -14px; animation-duration: 4s"
        />
        <img
          src="/images/novos-sabores-picanha.png"
          alt="Lata Pringles sabor Picanha no alho"
          width="183"
          height="544"
          loading="lazy"
          class="animate-can-float absolute top-[268px] left-[73px] w-[83px] -rotate-[24.9deg] drop-shadow-xl motion-reduce:animate-none xl:top-[29px] xl:left-[101px] xl:h-[460px] xl:w-[156px]"
          style="--float-y: -10px; animation-duration: 2.4s"
        />
      </div>

      <ClientOnly>
        <AppButton
          v-if="!isPromotionFinished"
          :to="isLoggedIn ? '/cadastro-nota' : '/cadastro'"
          variant="secondary"
          block
          class="mt-[50px] max-w-[384px] xl:mt-16"
        >
          Quero participar
        </AppButton>
      </ClientOnly>
    </div>

    <AppInfiniteMarquee class="relative mt-10 xl:mt-[100px]" />
  </section>
</template>
