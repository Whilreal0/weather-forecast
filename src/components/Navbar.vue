<script setup>
import { RouterLink } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";
import { onMounted, computed } from "vue";

import HomeLogo from "@/assets/Icons/home.png";
import AboutLogo from "@/assets/Icons/about.png";
import SunnyLogo from "@/assets/Icons/sunny.png";
import MoonLogo from "@/assets/Icons/moon.png";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const logoSrc = computed(() => (isDark.value ? SunnyLogo : MoonLogo));
// const sunnyLogo = ref('@/assets/Icons/sunny.png')
onMounted(() => {
  isDark.value = true; // Force dark mode to be active on page load
});
</script>
<template>
  <nav
    class="w-full fixed bottom-0 z-10 md:static px-2.5 md:px-0 mb-2 md:mt-2"
  >
    <!-- for nav -->
     <div class="py-3 rounded-2xl shadow-lg bg-white  bg-white/40  ring-1 ring-black/5">
      <div class="flex items-center justify-evenly text-center">
      <RouterLink class="flex items-center" to="/">
        <img
          :src="HomeLogo"
          alt="logo"
          class="bg-center"
          width="24px"
        />
      </RouterLink>
      <RouterLink class="flex items-center" to="/about">
        <img
          :src="AboutLogo"
          alt="logo"
          class="bg-center "
          width="26px"
          c
        />
      </RouterLink>
      <button class="shadow-2xl flex items-center" @click="toggleDark()">
        <!-- <box-icon :name="isDark ? 'sun' : 'moon'"  ></box-icon> -->
        <img
          :src="logoSrc"
          alt="logo"
          class="bg-center"
          width="24px"
        :class="isDark ? '' : 'scale-x-[-1]'"
        />
      </button>
    </div>
     </div>
  </nav>
</template>