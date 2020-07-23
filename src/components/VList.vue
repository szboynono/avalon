<template>
  <div>
    <template v-if="!leader">
      <ul class="list-group">
        <li v-for="item in items" :key="item" class="list-group-item">
          {{ item }}
          <!-- <span class="chip bg-primary text-white" v-if="leader === item">Leader</span> -->
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="list-group">
        <li
          v-for="(item, i) in mappedItems"
          :key="item"
          @click="onListClicked(i)"
          :class="{'active': item.active}"
          class="list-group-item clickable-list noselect"
        >
          {{ item.name }}
          <span class="chip bg-primary text-white" v-if="leader === item">Leader</span>
        </li>
      </ul>
    </template>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
export default defineComponent({
  props: ["items", "leader"],
  setup(props) {
    const mappedItems = ref(
      props.items.map((item: any) => {
        return {
          name: item,
          active: false
        };
      })
    );

    const onListClicked = (i: number) => {
      mappedItems.value[i].active = !mappedItems.value[i].active;
    };
    return { onListClicked, mappedItems };
  }
});
</script>

<style lang="scss" scoped>
.list-group {
  max-width: 320px;
  margin: auto;
}
.chip {
  display: inline-block;
  position: absolute;
  right: 16px;
  top: 10px;
  padding: 4px 10px;
  border-radius: 16px;
}
.clickable-list {
  cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
}
</style>