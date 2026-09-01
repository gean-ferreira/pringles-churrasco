// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // ignorar v-html
    'vue/no-v-html': 'off',
    // self close
    'vue/html-self-closing': 'off',
    // App* usam props opcionais sem default de propósito (v-if cobre o caso ausente)
    'vue/require-default-prop': 'off'
  }
})
