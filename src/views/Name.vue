<template>
  <div class="name">
    <h1>What is your name ?</h1>
    <input v-model="nameInput" type="text" class="form-control" placeholder="WHO ARE YOU ?">
    <button-group :primaryText="'Continue'" :primaryFn="onContinueClick" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ButtonGroup from "@/components/ButtonGroup.vue";
export default defineComponent({
  components: {
    ButtonGroup
  },
  setup() {
    const nameInput = ref('');
  
    function onContinueClick() {
      console.log(nameInput.value);
    }
    return {onContinueClick, nameInput}
  }
})
</script>
<style lang="scss" scoped>
  .name {
    & input {
      margin: 1rem auto;
      max-width: 300px;
    }
  }
</style>
