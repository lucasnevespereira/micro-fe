<script setup>
import { ref } from "vue";
const searchInput = ref("");
</script>

<template>
  <div>
    <input type="text" v-model="searchInput" placeholder="Search something..." />
    <p>Current search: {{ searchInput }}</p>
  </div>
</template>

