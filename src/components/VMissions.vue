<template>
  <div>
    <div class="mission border-dark" :class="round === 0 ? activeClasses: null">2</div>
    <div class="mission border-dark" :class="round === 1 ? activeClasses: null">3</div>
    <div class="mission border-dark" :class="round === 2 ? activeClasses: null">2</div>
    <div class="mission border-dark" :class="round === 3 ? activeClasses: null">3</div>
    <div class="mission border-dark" :class="round === 4 ? activeClasses: null">3</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ['round'],
  setup() {
    const activeClasses = 'text-white bg-primary'
    return {activeClasses}
  }
});
</script>

<style lang="scss" scoped>
  .mission {
    font-size: 20px;
    display: inline-block;
    padding: 4px 20px;
    margin: 4px;
    border: 3px solid;
    border-radius: 10px;
  }
</style>