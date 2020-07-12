<template>
  <div class="button-group">
    <button @click="primaryFn" class="btn btn-lg btn-primary mt-3">{{ primaryText }}</button>
    <button v-if="secondaryText" @click="secondaryFn" class="btn btn-lg btn-primary mt-3">{{ secondaryText }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ['primaryText','secondaryText', 'primaryFn', 'secondaryFn']
});
</script>

<style lang="scss" scoped>
  .button-group {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    max-width: 300px;
    width: 180px;
  }
</style>