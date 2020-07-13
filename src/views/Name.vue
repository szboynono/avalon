<template>
  <div class="name">
    <h1>What is your name ?</h1>
    <input v-model="nameInput" type="text" class="form-control" placeholder="WHO ARE YOU ?" />
    <button-group :primaryText="'Continue'" :primaryFn="onContinueClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import router from "../router";
import axios from "axios";

export default defineComponent({
  components: {
    ButtonGroup
  },
  setup() {
    const nameInput = ref("");
    const room = ref("");
    onMounted(() => {
      axios
        .get("http://localhost:8081/room")
        .then(res => {
          if (res.data) {
            room.value = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    });

    function onContinueClick() {
      router.push("/room/" + room.value);
    }
    return { onContinueClick, nameInput, room };
  }
});
</script>

<style lang="scss" scoped>
.name {
  & input {
    margin: 1rem auto;
    max-width: 300px;
  }
}
</style>
