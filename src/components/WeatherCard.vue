<script setup >
import { reactive, ref, watch } from "vue";

// Define a prop to receive the weather data from the parent
const props = defineProps({
  weather: Object,
});
const weatherState = ref(null)
// Watch for changes in the weather prop and update the display accordingly
watch(
  () => props.weather,
  (newWeather) => {
    if (newWeather) {
      weatherState.value = newWeather; // Storing the received weather data
    }
  }
)
</script>

<template>
  <div class="bg-blue-200 flex flex-col items-center justify-center" >
    <div class="text-5xl">
      <!-- <img :src="weatherState.weather.icon" alt=""> -->
    </div>
    <h1 class="text-9xl"> &deg;</h1>
  </div>
</template>