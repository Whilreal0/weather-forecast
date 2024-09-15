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
    search.query = '';
  } else {
    // Default city to load on first page visit
    search.query = 'Manila';
    handleSearch();
  }
});
</script>
<template>
    <form @submit.prevent="handleSearch">
        <div class="relative mt-2">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input v-model="search.query" type="text" id="default-search" class="block w-full p-4 ps-10 text-sm  border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 bg-transparent" placeholder="Search a City" required />
        
    </div>
        <!-- <input class="bg-transparent outline-1 w-full outline-solid" type="text" placeholder="Search a City" v-model="search.query"> -->
    </form>
    
</template>