<script setup>
import { reactive, ref, onMounted} from "vue";
const apiKey = ref("3be6f304706344cd3c68ae99f0a9f8d2");
const baseUrl = ref('https://api.openweathermap.org/data/2.5/')

const search = reactive({
    query: '',
    timeout: null,
    results: null
})
const emit = defineEmits(['weather-data'])

const handleSearch = ()=>{
    clearTimeout(search.timeout)
    search.timeout = setTimeout(async () =>{
        if( search.query !== ''){
            const res = await fetch(
        `${baseUrl.value}weather?q=${search.query}&appid=${apiKey.value}&units=metric`
        )
        const data = await res.json()
        search.results = data
        emit('weather-data', data)

        // Save search results to localStorage
        localStorage.setItem('weatherData', JSON.stringify(data));
        localStorage.setItem('lastQuery', search.query); // Save the last searched city as well
        }else{
            search.results = null
        }
    },500)
} 
// Check if there's saved data in localStorage on mount
onMounted(() => {
  const savedWeatherData = localStorage.getItem('weatherData');
  const savedQuery = localStorage.getItem('lastQuery');

  if (savedWeatherData && savedQuery) {
    // If data exists, load it into the app
    search.results = JSON.parse(savedWeatherData);
    search.query = savedQuery;
    emit('weather-data', JSON.parse(savedWeatherData)); // Emit saved weather data
  } else {
    // Default city to load on first page visit
    search.query = 'Manila';
    handleSearch();
  }
});
</script>
<template>
    <form @submit.prevent="handleSearch">
        <input class="bg-transparent outline-1" type="text" placeholder="Search a City" v-model="search.query">
    </form>

</template>