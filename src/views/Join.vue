<template>
  <div class="join">
    <h1>What is the room number?</h1>
    <input v-model="roomInput" type="text" class="form-control" placeholder="room number ?" />
    <v-buttons :primaryText="'Continue'" :primaryFn="onContinueClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VButtons from "@/components/VButtons.vue";
import router from "../router";

export default ({
  components: {
    VButtons
  },
  setup() {
    const roomInput = ref("");
    

    function onContinueClick() {
      if(roomInput.value) {
        router.push("/room/" + roomInput.value);
      }
    }
    return { onContinueClick, roomInput };
  }
});
</script>

<style lang="scss" scoped>
.join {
  margin-top: 8rem;
  & input {
    margin: 1rem auto;
    max-width: 300px;
  }
}
</style>
