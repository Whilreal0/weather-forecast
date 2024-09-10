<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class=" relative flex flex-col items-center mx-auto md:max-w-4xl h-screen ">
      <Navbar />
      <RouterView />
  </div>
</template>

