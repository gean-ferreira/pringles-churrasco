<script setup lang="ts">
// A finalidade muda por tela (Fale conosco, Cadastro, Meu perfil...); o resto do
// texto é o aviso padrão de LGPD e não varia.
defineProps<{ purpose: string }>()
</script>
<template>
  <p class="text-body-xs text-(--color-brand-neutral-800)">
    A PRINGLES sabe o quanto é importante sua privacidade e a adequada
    utilização dos seus dados pessoais. Neste sentido, em atendimento à Lei
    13.709/18 (Lei Geral de Proteção de Dados Pessoais), os dados pessoais aqui
    informados serão utilizados com a única finalidade de {{ purpose }}.
  </p>
</template>
