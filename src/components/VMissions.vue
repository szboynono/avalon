<template>
  <div>
    <div v-for="(num, index) in missionList" :key="num" class="mission border rounded" :class="createClass(index)">{{num}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
export default defineComponent({
  props: ["round", "gameResult", "missionList"],
  setup(props) {
    const activeClasses = "border-primary";
    const successClasses = "bg-success text-white";
    const failureClasses = "bg-danger text-white";
    onMounted(() => {
      console.log(props.missionList);
    })
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