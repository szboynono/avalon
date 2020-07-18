<template>
  <ul class="list-group">
    <li v-for="item in items" :key="item" class="list-group-item">{{ item }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["items"]
});
</script>

<style lang="scss" scoped>
.list-group {
  max-width: 320px;
  margin: auto;
}
</style>