<template>
  <Table :table-object="cars" :filters="carsFilterRules" />
</template>

<script setup>
import { ref } from "vue";
import Table from "./components/Table.vue";

const cars = ref([
  { id: 1, brand: "BMW", age: 2010 },
  { id: 2, brand: "Audi", age: 2012 },
  { id: 3, brand: "BMW", age: 2016 },
  { id: 4, brand: "Audi", age: 2018 },
]);

const carsFilterRules = {
  id: (item, searchValue) => (searchValue !== "" ? item["id"] === Number(searchValue) : item["id"]),
  brand: (item, searchValue) => item["brand"].toLowerCase().includes(searchValue.toLowerCase()),
  age: (item, searchValue, searchAddValue) =>
    item["age"] >= searchValue && item["age"] <= searchAddValue,
};
</script>
