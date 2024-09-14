<script setup >
import { reactive, ref, watch } from "vue";

import ClearDay from "@/assets/Icons/clear-sky-day.png";
import ClearNight from "@/assets/Icons/clear-sky-night.png";

import DayClouds from "@/assets/Icons/day-clouds.png";
import NightClouds from "@/assets/Icons/night-clouds.png";
import Rainy from "@/assets/Icons/rainy.png";

import WindSpeedIcon from "@/assets/Icons/wind-speed.png";
import WindGustIcon from "@/assets/Icons/wind-gust.png";
import HumidityIcon from "@/assets/Icons/humidity.png";
import PressureIcon from "@/assets/Icons/pressure.png";


// Define a prop to receive the weather data from the parent
const props = defineProps({
  weather: Object,
});
const weatherState = ref(null);
const dateToday = () => {
  let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ,${date} ${month}, ${year}`;
}

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
  <div class="flex flex-col text-center " v-if="weatherState">
    <div :class="[ 'relative flex flex-col bg-cover bg-center bg-no-repeat h-[350px] rounded-t-xl p-2', weatherState.weather[0].icon.includes('d') ? 'bg-day' : 'bg-night' ]">
    <div class="bg-black opacity-10 absolute inset-0 rounded-t-x"></div>
    <div class="flex flex-col justify-between h-full z-10 ">
      <div class=" text-left ">
        <span>{{ dateToday() }}</span>
      </div>
    <div class="text-2xl flex gap-0 flex-col items-center justify-center ">
      <div class="flex items-center justify-center">
        <img v-if="weatherState.weather[0].icon === '01d'" :src="ClearDay" width="70" alt="Clear Sky Day" />
        <img v-else-if="weatherState.weather[0].icon === '01n'" :src="ClearNight" width="70" alt="Clear Sky Night" />
        <img v-else-if="['03d', '03n'].includes(weatherState.weather[0].icon)" :src="FewCloud" width="70" alt="Few Clouds" />
        <img v-else-if="['02d', '04d'].includes(weatherState.weather[0].icon)" :src="DayClouds" width="70" alt="Day Clouds" />
        <img v-else-if="['02n', '04n'].includes(weatherState.weather[0].icon)" :src="NightClouds" width="70" alt="Night Clouds" />
        <img v-else-if="['10d', '10n'].includes(weatherState.weather[0].icon)" :src="Rainy" width="70" alt="Raining" />
        <img v-else :src="`http://openweathermap.org/img/wn/${weatherState.weather[0].icon}@2x.png`" width="70" alt="Open Weather Icons" />
        <span class="text-sm">{{ weatherState.weather[0].description }}</span>
      </div>
     
      <h1 class="text-7xl ">{{ Math.round(weatherState.main.temp) }}&deg;C</h1>
    </div>
    <!-- <div class="text-center">
      <h1 class="text-7xl ">{{ Math.round(weatherState.main.temp) }}&deg;C</h1>
    </div> -->
      <div class="text-right">
        <span class="text-4xl "> {{ weatherState.name }},{{ weatherState.sys.country || 'Unknown Country' }}</span>
      </div>
    </div>

   
  </div>
  
    <div class="grid grid-cols-3 gap-2 mt-5">
      <div class="isolate aspect-video flex flex-row gap-2 px-2 justify-items-center items-center rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <div class=" flex p-1 rounded-full">
          <img :src="WindSpeedIcon" alt="Wind Speed" width="27">
        </div>
        <div class="flex flex-col">
          <span class="text-sm">Wind Speed</span>
          <span>{{ weatherState.wind.speed }} km/h</span>
        </div>
      </div>
      <!-- <div class="isolate aspect-video  flex flex-col rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <span>Wind Gust</span>
        <span v-if="!weatherState.wind.gust">17 km/h</span>
        <span v-else>{{ weatherState.wind.gust }}km/h</span>
      </div> -->
      <div class="isolate aspect-video  flex flex-col rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <span>Pressure</span>
        <span>{{Math.round(weatherState.main.pressure)}}</span>
      </div>
      <div class="isolate aspect-video  flex flex-col rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
        <span>Humidity</span>
        <span>{{ Math.round(weatherState.main.humidity) }}%</span>
      </div>

      <!-- trial -->
      <!-- <div class="isolate aspect-video  rounded-xl bg-white/50 dark:bg-[#3d315f]/10 shadow-lg ring-1 ring-black/5 dark:ring-white/5">

        </div> -->
    </div>
  </div>
  <div v-else>not found</div>
</template>