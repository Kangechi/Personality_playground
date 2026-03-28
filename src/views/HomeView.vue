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
      <HomeSection
      :stage="homeStage"
      @enter="goToPanel(1)"

      />
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NavCircles from '@/components/NavCircles.vue'
import HomeSection from '@/components/HomeSection.vue'


const currentIndex = ref(0)
const TOTAL_PANELS = 5
const touchStartX = ref(0)  // ← was missing

/*
When adding the slide process for Hello, I'm Patience + a photo of me
and lastly wlecome leading you to the next route - its like stages
Stages within the same page - the home section
Hence ref- reactive then enseuring the 0,1,2 stages are constant
*/ 
const homeStage = ref(0)
const HOME_STAGES = 3


const slidePosition = computed(() => {
  return `translateX(${currentIndex.value * -100}vw)`
})

function goToPanel(index) {
  currentIndex.value = index
}
/*
Now this will have two behavoirs
IF were on the Home panel (currentIndex === 0)
AND we havent seen all home stage yet
-> advance homeStage instead of moving panels
ELSE -> Move to the next panel as normal
*/
function goNext() {
  if (currentIndex.value === 0 && homeStage.value < HOME_STAGES - 1) {
    homeStage.value++
  }else {
    if (currentIndex.value < TOTAL_PANELS -1){
      currentIndex.value++
    }

  }
}
/*
If were on Home and homestage is above 0
-> go back a stage instead of going to previous panel

ELSE -> move to previous panel as normal
*/
function goPrev() {
  if (currentIndex.value === 0 && homeStage.value > 0) {
    homeStage.value--
  }else {
    if(currentIndex.value > 0){
      currentIndex.value--
    }
  }
}

// Mouse Wheel
function handleWheel(event) {
  event.preventDefault()
  if (event.deltaY > 0) {
    goNext()
  } else {
    goPrev()
  }
}

// Touch
function handleTouchStart(event) {
  touchStartX.value = event.touches[0].clientX
}

function handleTouchEnd(event) {
  const touchEndX = event.changedTouches[0].clientX
  const diff = touchStartX.value - touchEndX

  if (diff > 50) {
    goNext()
  } else if (diff < -50) {
    goPrev()
  }
}  // ← only ONE closing brace here

// Keyboard
function handleKeydown(event) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    goNext()
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    goPrev()
  }
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchend', handleTouchEnd)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)  // ← handleWheel not handleScroll
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  window.removeEventListener('keydown', handleKeydown)
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
