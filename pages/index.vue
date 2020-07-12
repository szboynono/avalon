<template>
  <div class="container">
      <h1 class="title">
        AVALON
      </h1>
      <button class="btn btn-primary" @click="onClick()">Start</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    onClick: () => {
      console.log('a');
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3rem;
  color: #35495e;
  letter-spacing: 1px;
}

</style>
