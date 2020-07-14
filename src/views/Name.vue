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
import { useStore } from 'vuex';

export default ({
  components: {
    ButtonGroup
  },
  setup() {
    const nameInput = ref("");
    const store = useStore();
    onMounted(() => {
      if(!store.getters.room) {
        axios
          .get("http://localhost:8081/room")
          .then(res => {
            if (res.data) {
              console.log(res.data);
              store.commit('updateRoom', res.data)
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    });

    function onContinueClick() {
      store.commit('updateName', nameInput.value);
      router.push("/room/" + store.getters.room);
    }
    return { onContinueClick, nameInput };
  }
});
</script>

<style lang="scss" scoped>
.name {
  margin-top: 8rem;
  & input {
    margin: 1rem auto;
    max-width: 300px;
  }
}
</style>
