<template>
  <div>
    <template v-if="!leader">
      <ul class="list-group">
        <li v-for="item in items" :key="item.name" class="list-group-item">
          {{ item.name }}
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="list-group">
        <li
          v-for="(item, i) in items"
          :key="item"
          @click="onListClicked(i)"
          :class="[{'active': item.selected}, {'clickable-list': isLeader}]"
          class="list-group-item noselect"
        >
          {{ item.name }}
          <span class="chip bg-danger text-white" v-if="leader === item.name">Leader</span>
        </li>
      </ul>
    </template>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from 'vuex';
export default defineComponent({
  props: ["items", "leader"],
  setup(props, ctx) {
    const store = useStore();
    const isLeader = computed(() => props.leader === store.getters.name);
    const onListClicked = (i: number) => {
      if(isLeader.value) {
        ctx.emit('list-clicked', i);
      }
    };
    return { onListClicked, isLeader };
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
  top: 8px;
  padding: 4px 10px;
  border-radius: 16px;
}
.clickable-list {
  transition-duration: .3s;
  cursor: pointer;
}

.clickable-list:hover {
  background-color: #007bff;
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