<script setup lang="ts">
// id do <filter> precisa ser único por instância — o componente é usado mais de
// uma vez na mesma página (ex.: faq.vue) e ids de SVG duplicados no DOM são inválidos.
const filterId = `star-shadow-${useId()}`
</script>

<template>
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
    <g :filter="`url(#${filterId})`">
      <path
        d="M8.53061 0L10.6216 5.65071L16.2723 7.74167L10.6216 9.83262L8.53061 15.4833L6.43965 9.83262L0.78894 7.74167L6.43965 5.65071L8.53061 0Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <filter
        :id="filterId"
        x="-1.92523e-05"
        y="0"
        width="16.2722"
        height="16.2724"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-0.78896" dy="0.78896" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.435294 0 0 0 0 0.109804 0 0 0 0 0.0666667 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9428_5395" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9428_5395" result="shape" />
      </filter>
    </defs>
  </svg>
</template>
