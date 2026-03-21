<template>
   <NavCircles
   :currentIndex ="currentIndex"
   @navigate="goToPanel"
   />

  <div
    class="scroll-container"
    :style="{ transform: slidePosition }"
   
  >
    <section class="panel" id="home">
      <h1>Hello 👋</h1>
    </section>

    <section class="panel" id="about">
      <h1>About</h1>
    </section>

    <section class="panel" id="articles">
      <h1>Articles</h1>
    </section>

    <section class="panel" id="podcast">
      <h1>Podcast</h1>
    </section>

    <section class="panel" id="contact">
      <h1>Contact</h1>
    </section>
  </div>
</template>

<script setup>
import NavCircles from '@/components/NavCircles.vue'
import { ref, computed, onMounted, onUnmounted} from 'vue'

const container = ref(null)
const currentIndex = ref(0)
const TOTAL_PANELS = 5

const slidePosition = computed(() => {
  return `translateX(${currentIndex.value * -100}vw)`
})

function goToPanel(index) {
    currentIndex.value = index
}
function handleScroll(event) {
  //@wheel and the function handleScroll work majorly for the mouse thus inability to work on another device
  // I want to fix this version by enabling each scroll event on different devices to be accommodated
  if (event.deltaY > 0) {
    if (currentIndex.value < TOTAL_PANELS - 1) {
      currentIndex.value++
    }
  } else {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }
}

onMounted(() => {
    window.addEventListener('wheel',handleScroll, {passive: false})

})
onUnmounted(() => {
    window.removeEventListener("wheel", handleScroll)
})
</script>

<style scoped>
.scroll-container {
  display: flex;
  flex-direction: row;
  width: 500vw;
  height: 100vh;
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.18, 1);
}

.panel {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

#home     { background: #BEAEDB; }
#about    { background: #a08cc9; }
#articles { background: #b6a4ff; }
#podcast  { background: #9575cd; }
#contact  { background: #a185c9; }
</style>
```
