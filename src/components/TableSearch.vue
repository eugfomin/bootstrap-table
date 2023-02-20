<template>
  <div class="input-group mb-3 search_area">
    <template v-if="doubleInput">
      <input
        v-model="searchValue"
        type="text"
        class="form-control"
        placeholder="from"
        aria-label="from"
        aria-describedby="basic-addon1"
        @input="$emit('updateSearchValue', searchValue)"
      />
      <input
        v-model="searchAddValue"
        type="text"
        class="form-control"
        placeholder="to"
        aria-label="to"
        aria-describedby="basic-addon1"
        @input="$emit('updateSearchAddValue', searchAddValue)"
      />
    </template>
    <input
      v-else
      v-model="searchValue"
      type="text"
      class="form-control w-50"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="basic-addon1"
      @input="$emit('updateSearchValue', searchValue)"
    />
    <button
      class="btn btn-outline-secondary dropdown-toggle search-area__filter-button"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ searchColumnValue }}
    </button>

    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li v-for="(item, key) in keys" :key="key">
        <button class="dropdown-item" @click="updateSearchColumnValue(item)">
          {{ item }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { toRefs, computed, ref } from "vue";

const emit = defineEmits(["updateSearchValue", "updateSearchAddValue", "updateSearchColumnValue"]);
const props = defineProps(["doubleInputValue", "keys"]);

const { doubleInputValue, keys } = toRefs(props);

const searchValue = ref("");
const searchAddValue = ref();
const searchColumnValue = ref(keys.value[0]);

function updateSearchColumnValue(value) {
  searchColumnValue.value = value;
  emit("updateSearchColumnValue", value);
  searchValue.value = "";
  searchAddValue.value = null;
}

const doubleInput = computed(() => {
  return searchColumnValue.value === doubleInputValue.value;
});
</script>

<style>
.search_area {
  max-width: 250px;
  margin-left: 10px;
}

.search-area__filter-button {
  width: 80px;
}
</style>
