<template>
  <ul class="list-group">
    <li v-for="item in items" :key="item" class="list-group-item">
      {{ item }}
      <!-- <span class="chip bg-primary text-white" v-if="leader === item">Leader</span> -->
    </li>
  </ul>
</template>


<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: ["items", "leader"]
});
</script>

<style lang="scss" scoped>
.list-group {
  max-width: 320px;
  margin: auto;
}
.chip {
  display: inline-block;
  position: absolute;
  right: 16px;
  top: 8px;
  padding: 4px 10px;
  border-radius: 16px;
}
</style>