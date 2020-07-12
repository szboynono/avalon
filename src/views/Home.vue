<template>
  <div class="home">
    <h1>AVALON</h1>
    <button @click="onStart">Start a Game</button>
    <button>Join a room</button>
    <hello-world />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import router from '../router'

export default {
  components: {
    HelloWorld
  },
  setup() {
    function onStart() {
      router.push('/about');
    }
    return {
      onStart
    }
  }
}
</script>
