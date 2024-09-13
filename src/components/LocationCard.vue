<script setup >
import { reactive, ref, watch } from "vue";

// Define a prop to receive the weather data from the parent
const props = defineProps({
  weather: Object,
});
const weatherState = ref(null);
// const weatherState = reactive({
//   name: null,
//   weather: {
//     id: null,
//     main: null,
//     description: null,
//     icon: null,
//   },
//   main: {
//     temp: null,
//     temp: null,
//     feels_like: null,
//     temp_min: null,
//     temp_max: null,
//     pressure: null,
//     humidity: null,
//     sea_level: null,
//     grnd_level: null,
//   },
//   visibility: null,
//   wind: {
//     speed: null,
//     deg: null,
//   },
//   clouds: {
//     all: null,
//   },
//   dt: null,
//   sys: {
//     type: null,
//     id: null,
//     country: null,
//     sunrise: null,
//     sunset: null,
//   },
// });

// Watch for changes in the weather prop and update the display accordingly
watch(
  () => props.weather,
  (newWeather) => {
    if (newWeather) {
      weatherState.value = newWeather; // Storing the received weather data
    }
  }
);
</script>
<template>
  <div class="flex flex-col text-center bg-red-300" v-if="weatherState">
    <span class="text-4xl"> {{ weatherState.name }},{{ weatherState.sys.country }}</span>
    <span>{{ weatherState.weather[0].description }}</span>
    <!-- Weather Cards -->
    <div class="text-5xl">
      <img class=""  :src="`http://openweathermap.org/img/wn/${weatherState.weather[0].icon}@2x.png`" width="100 " alt="weather">
    </div>
    <h1 class="text-5xl bg-green-200">{{ Math.round(weatherState.main.temp) }} &deg;C</h1>
    <!-- Weather Cards -->
    <div class="grid grid-cols-2 gap-5 mt-10">
      <div class="isolate aspect-video bg-yellow-300 flex flex-col rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <span>Wind Speed</span>
        <span>{{ weatherState.wind.speed }}</span>
      </div>
      <div class="bg-yellow-300 flex flex-col">
        <span>Wind Gust</span>
        <span>{{ weatherState.wind.gust }}</span>
      </div>
      <div class="bg-yellow-300 flex flex-col">
        <span>Cloud</span>
        <span>{{weatherState.clouds.all}}</span>
      </div>
      <div class="bg-yellow-300 flex flex-col">
        <span>Humidity</span>
        <span>{{ weatherState.main.humidity }}%</span>
      </div>

      <!-- trial -->
      <div class="isolate aspect-video  rounded-xl bg-white/50 dark:bg-[#3d315f]/10 shadow-lg ring-1 ring-black/5 dark:ring-white/5">

        </div>
    </div>
  </div>

  <div v-else>NO DATA AVAILABLE</div>
</template>