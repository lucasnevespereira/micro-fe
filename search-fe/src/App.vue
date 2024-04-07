<script setup>
import {ref} from "vue";
import useFetchJobs from "@/composables/useJobs.js";
const searchInput = ref("");

const {triggerSearch, jobs, error, isLoading } = useFetchJobs();
const searchJobs = () => {
  triggerSearch(searchInput.value);
}

</script>

<template>
  <div>
    <input type="text" v-model="searchInput" placeholder="Search something..." @keyup.enter="searchJobs"/>
    <button @click="searchJobs">Search</button>
    <div>
      <h2>Jobs</h2>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div v-for="(index, job) in jobs" :key="index" >
          {{JSON.stringify(job)}}
        </div>
      </div>
    </div>
  </div>
</template>

