<template>
  <section class="relative overflow-hidden bg-(--color-brand-accent-green)">
    <div aria-hidden="true" class="absolute inset-0 z-0">
      <picture class="block size-full">
        <source
          media="(min-width: 1280px)"
          srcset="/images/auth-bg-desktop.jpg"
        />
        <img
          src="/images/auth-bg-mobile.png"
          alt=""
          fetchpriority="high"
          class="size-full object-cover object-top xl:object-center"
        />
      </picture>
    </div>

    <div
      class="relative z-10 flex min-h-[calc(100dvh-var(--header-height))] flex-col"
    >
      <div
        class="container flex flex-1 items-center justify-center py-14 xl:justify-end xl:py-25"
      >
        <div class="w-full max-w-[500px]">
          <AppComicCard>
            <template v-if="$slots.title" #title>
              <slot name="title" />
            </template>
            <template v-if="$slots.description" #description>
              <slot name="description" />
            </template>
            <slot />
          </AppComicCard>
        </div>
      </div>

      <AppInfiniteMarquee class="xl:hidden" />
    </div>
  </section>
</template>
