<script setup lang="ts">
definePageMeta({ name: 'NotFound' })

throw createError({ statusCode: 404, statusMessage: 'Not Found' })
</script>

<template><div /></template>
