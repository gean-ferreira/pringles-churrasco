<template>
  <div
    class="transition-[padding-top,padding-bottom] duration-200 ease-out"
    style="
      padding-top: calc(var(--header-height) + var(--promo-banner-height, 0px));
      padding-bottom: var(--mobile-bar-height, 0px);
    "
  >
    <LayoutHeader />
    <LayoutPromotionEndedBanner />
    <main id="conteudo" tabindex="-1" class="outline-none">
      <slot />
    </main>
    <LayoutFooter />
    <ClientOnly>
      <LayoutNotificationModal />
    </ClientOnly>
  </div>
</template>
