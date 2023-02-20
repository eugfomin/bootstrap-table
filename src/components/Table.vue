<template>
  <TableFrame
    :table-object="tableObject"
    :search-column-value="searchColumnValue"
    :search-value="searchValue"
    :search-add-value="searchAddValue"
    :keys="keys"
    :filter="filter"
  />
  <TableSearch
    double-input-value="age"
    :keys="keys"
    @updateSearchValue="updateSearchValue"
    @updateSearchAddValue="updateSearchAddValue"
    @updateSearchColumnValue="updateSearchColumnValue"
  />
</template>

<script setup>
import { ref } from "vue";
import TableSearch from "./TableSearch.vue";
import TableFrame from "./TableFrame.vue";

const props = defineProps(["tableObject", "filters"]);

const defaultDate = new Date().getFullYear();

const searchValue = ref("");
const searchAddValue = ref(defaultDate);

const keys = Object.keys(props.tableObject[0]);

const searchColumnValue = ref(keys[0]);

function updateSearchColumnValue(value) {
  searchColumnValue.value = value;
  searchValue.value = "";
  searchAddValue.value = defaultDate;
}

function updateSearchValue(value) {
  searchValue.value = value;
}

function updateSearchAddValue(value) {
  searchAddValue.value = value;
}

const filter = (item) => {
  return props.filters[searchColumnValue.value](item, searchValue.value, searchAddValue.value);
};
</script>
