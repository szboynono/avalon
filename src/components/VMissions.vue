<template>
  <div>
    <div class="mission border rounded" :class="createClass(0)">2</div>
    <div class="mission border rounded" :class="createClass(1)">3</div>
    <div class="mission border rounded" :class="createClass(2)">2</div>
    <div class="mission border rounded" :class="createClass(3)">3</div>
    <div class="mission border rounded" :class="createClass(4)">3</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: ["round", "gameResult"],
  setup(props) {
    const activeClasses = "border-primary";
    const successClasses = "bg-success text-white";
    const failureClasses = "bg-danger text-white";
    const createClass = (round: number) => {
      const outputClasses = [];
      if(round === props.round) {
        outputClasses.push(activeClasses);
      }
      if(props.gameResult) {
        if(props.gameResult[round] === true) {
          outputClasses.push(successClasses);
        } else if(props.gameResult[round] === false) {
          outputClasses.push(failureClasses);
        }
      }
      return outputClasses.join(' ');
    }
    return { createClass };
  },
});
</script>

<style lang="scss" scoped>
.mission {
  font-size: 20px;
  display: inline-block;
  padding: 8px 20px;
  margin: 4px;
}
</style>