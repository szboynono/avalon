<template>
  <div class="home">
    <img
      class="animate__animated animate__flipInX"
      src="../assets/magic.svg"
      alt="magic"
    />
    <h1 class="text-dark">AVALON</h1>
    <v-buttons
      :primaryText="'Start Game'"
      :primaryFn="onStart"
      :secondaryText="'Join Game'"
      :secondaryFn="onJoin"
    />
    <a href="#" class="d-block mt-4" @click="openModal">What is this game about?</a>
    <div class="modal" :class="showModal ? 'd-block' : 'd-none'">
      <div class="modal-dialog animate__animated animate__fadeIn" role="document">
        <div class="modal-content">
          <div class="modal-body mt-4">
            <p>Avalon pits the forces of Good and Evil in a battle to control the future of civilization.</p>
            <p>Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden among his brave warriors are Mordred's unscrupulous minions.</p>
            <p>These forces of evil are few in number but have knowledge of each other and remain hidden from all but one of Arthur's servants.</p>
            <p>Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost.</p>
            <v-buttons :primaryText="'Got it'" :primaryFn="onGotItClick"></v-buttons>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VButtons from "@/components/VButtons.vue";
import router from "../router";
import { ref } from 'vue';

export default {
  components: {
    VButtons,
  },
  setup() {
    const showModal = ref(false);
    function onStart() {
      router.push("/name");
    }
    function onJoin() {
      router.push("/join");
    }
    const openModal = () => {
      showModal.value = true;
      return false;
    };
    const onGotItClick = () => {
      showModal.value = false;
    }
    return {
      onStart,
      onJoin,
      openModal,
      onGotItClick,
      showModal
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 4rem;

  img {
    width: 286px;
  }

  h1 {
    font-size: 5rem;
    font-weight: bold;
    letter-spacing: -12px;
  }

  .modal {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

    p {
      text-align: left;
    }
  }
}
</style>
