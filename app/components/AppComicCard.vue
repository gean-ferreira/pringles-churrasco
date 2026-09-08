<template>
  <div class="comic-chrome-lg w-full rounded-xl bg-white px-4 py-10 xl:p-10">
    <div class="flex flex-col gap-10">
      <header
        v-if="$slots.title || $slots.description"
        class="flex flex-col items-center gap-2 text-center"
      >
        <h1
          v-if="$slots.title"
          class="text-h3 text-shadow-comic text-stroke-comic xl:text-h2 font-bold text-(--color-brand-secondary) uppercase"
        >
          <slot name="title" />
        </h1>
        <p
          v-if="$slots.description"
          class="text-body-base text-(--color-brand-neutral-800)"
        >
          <slot name="description" />
        </p>
      </header>
      <slot />
    </div>
  </div>
</template>
