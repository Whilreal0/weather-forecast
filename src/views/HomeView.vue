<script setup>
import {  ref } from 'vue'
import LocationCard from '@/components/LocationCard.vue'

import SearchInput from '@/components/SearchInput.vue'


const weatherData = ref(null);

const handleWeatherData = (data) => {
  weatherData.value = data; // Storing the emitted weather data
};


</script>

<template>
  <main class="absolute w-full top-0 mt-2 md:mt-0 z-10 md:static ">
    <LocationCard  :weather="weatherData"/>
    <SearchInput @weather-data="handleWeatherData"/>
  </main>
</template>
