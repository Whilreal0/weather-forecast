<script setup >
import { reactive, ref, watch } from "vue";

import ClearDay from "@/assets/Icons/clear-sky-day.png";
import ClearNight from "@/assets/Icons/clear-sky-night.png";

import DayClouds from "@/assets/Icons/day-clouds.png";
import NightClouds from "@/assets/Icons/night-clouds.png";
import Rainy from "@/assets/Icons/rainy.png";

// Define a prop to receive the weather data from the parent
const props = defineProps({
  weather: Object,
});
const weatherState = ref(null);


// Watch for changes in the weather prop and update the display accordingly
watch(
  () => props.weather,
  (newWeather) => {
    if (newWeather) {
      weatherState.value = newWeather || null ; // Storing the received weather data
    }
  }
);
</script>
<template>
  <div class="flex flex-col text-center" v-if="weatherState">
    <span class="text-4xl"> {{ weatherState.name }},{{ weatherState.sys.country }}</span>
    <span>{{ weatherState.weather[0].description }}</span>
    <!-- Weather Cards -->
    <div class="text-5xl flex flex-row items-center justify-center">
      <img v-if="weatherState.weather[0].icon === '01d'" :src="ClearDay" width="70" alt="Clear Sky Day" />
      <img v-else-if="weatherState.weather[0].icon === '01n'" :src="ClearNight" width="70" alt="Clear Sky Night" />
      <img v-else-if="['03d', '03n'].includes(weatherState.weather[0].icon)" :src="FewCloud" width="70" alt="Few Clouds" />
      <img v-else-if="['02d', '04d'].includes(weatherState.weather[0].icon)" :src="DayClouds" width="70" alt="Day Clouds" />
      <img v-else-if="['02n', '04n'].includes(weatherState.weather[0].icon)" :src="NightClouds" width="70" alt="Night Clouds" />
      <img v-else-if="['10d', '10n'].includes(weatherState.weather[0].icon)" :src="Rainy" width="70" alt="Raining" />
      <img v-else :src="`http://openweathermap.org/img/wn/${weatherState.weather[0].icon}@2x.png`" width="70" alt="Open Weather Icons" />
      <h1 class="text-5xl">{{ Math.round(weatherState.main.temp) }}&deg;C</h1>
    </div>
    
    <!-- Weather Cards -->
    <div class="grid grid-cols-2 gap-5 mt-10">
      <div class="isolate aspect-video  flex flex-col rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <span>Wind Speed</span>
        <span>{{ weatherState.wind.speed }} km/h</span>
      </div>
      <div class="isolate aspect-video  flex flex-col rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <span>Wind Gust</span>
        <span v-if="!weatherState.wind.gust">17 km/h</span>
        <span v-else>{{ weatherState.wind.gust }}km/h</span>
      </div>
      <div class="isolate aspect-video  flex flex-col rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <span>Cloud</span>
        <span>{{weatherState.clouds.all}}</span>
      </div>
      <div class="isolate aspect-video  flex flex-col rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <span>Humidity</span>
        <span>{{ weatherState.main.humidity }}%</span>
      </div>

      <!-- trial -->
      <!-- <div class="isolate aspect-video  rounded-xl bg-white/50 dark:bg-[#3d315f]/10 shadow-lg ring-1 ring-black/5 dark:ring-white/5">

        </div> -->
    </div>
  </div>
  <div v-else>not found</div>
</template>