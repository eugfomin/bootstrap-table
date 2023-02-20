<template>
  <table class="table">
    <component class="table-header__sort-direction-icon" :is="currentIcon" />
    <thead>
      <tr role="button">
        <th v-for="(item, key) in keys" :key="key" class="table-header" @click="sortTable(item)">
          <span :class="{ active: sortValue === item }" class="table-header__column-title">{{
            item
          }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(car, key) in sortedTableObject" :key="key">
        <td v-for="(item, key) in car" :key="key">{{ item }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { toRefs, computed, ref } from "vue";
import Api from "@/api/Api";
import AscIcon from "@/assets/icons/sort-up.svg?component";
import DescIcon from "@/assets/icons/sort-down.svg?component";

const props = defineProps([
  "tableObject",
  "keys",
  "searchAddValue",
  "searchColumnValue",
  "searchValue",
  "filter",
]);
const { tableObject, keys, searchAddValue, searchColumnValue, searchValue } = toRefs(props);

const currentIcon = computed(() => {
  return sortReverse.value ? AscIcon : DescIcon;
});

async function sortTable(columnValue) {
  if (sortValue.value === columnValue) {
    sortReverse.value = !sortReverse.value;
  } else {
    sortValue.value = columnValue;
  }
  const requestParams = (sortReverse.value ? "" : "-") + sortValue.value;
  await Api.testGetRequest(requestParams);
}

const sortedTableObject = computed(() => {
  return tableObject.value.filter(props.filter).sort((a, b) => {
    const direction = sortReverse.value ? 1 : -1;
    if (a[sortValue.value] < b[sortValue.value]) return -1 * direction;
    if (a[sortValue.value] > b[sortValue.value]) return 1 * direction;
    return 0;
  });
});

const sortValue = ref();
const sortReverse = ref(true);
</script>

<style scoped>
.table-header {
  width: 90px;
}

.table-header__sort-direction-icon {
  position: absolute;
  margin-left: -30px;
  margin-top: -27px;
}
.table-header__column-title {
  font-weight: normal;
}

.table-header__column-title.active {
  font-weight: bold;
}
</style>
