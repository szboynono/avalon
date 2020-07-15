<template>
  <ul class="list-group">
    <li v-for="player in players" :key="player" class="list-group-item">{{ player }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["players"]
});
</script>

<style lang="scss" scoped>
.list-group {
  max-width: 320px;
  margin: auto;
}
</style>