<template>
  <div
    class="w-full rounded-xl border-4 border-(--color-brand-outline) bg-white p-6 drop-shadow-[-8px_8px_0px_var(--color-brand-outline)] md:p-10"
  >
    <div class="flex flex-col gap-10">
      <header
        v-if="$slots.title || $slots.description"
        class="flex flex-col items-center gap-2 text-center"
      >
        <h1
          v-if="$slots.title"
          class="text-h3 text-shadow-comic text-stroke-comic md:text-h2 font-bold text-(--color-brand-secondary) uppercase"
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
