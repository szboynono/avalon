<template>
  <form class="name" @submit.prevent="onContinueClick">
    <h1>What is your name ?</h1>
    <input v-model="nameInput" type="text" class="form-control" placeholder="WHO ARE YOU ?" />
    <v-buttons :primaryText="'Continue'" :primaryFn="onContinueClick" />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import VButtons from "@/components/VButtons.vue";
import router from "../router";
import axios from "axios";
import { useStore } from 'vuex';

export default ({
  components: {
    VButtons
  },
  setup() {
    const nameInput = ref("");
    const store = useStore();
    onMounted(() => {
      if(!store.getters.room) {
        axios
          .get(`${process.env.VUE_APP_BE_URL}/room`)
          .then(res => {
            if (res.data) {
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
