<script setup>
import LocationCard from '@/components/LocationCard.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import WeatherCardInfo from '@/components/WeatherCardInfo.vue'
</script>

<template>
  <main class="absolute w-full top-0 mt-10 md:mt-0 z-10 md:static ">
    <LocationCard />
    <WeatherCard />
    <WeatherCardInfo />
  </main>
</template>
