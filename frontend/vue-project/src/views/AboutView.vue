<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ImageUploader />
  </div>
</template>

<script setup>
import ImageUploader from '../components/ImageUploader.vue';
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
