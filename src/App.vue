<script setup lang="ts">
import CubeRotation from './components/CubeRotation.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <CubeRotation />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
