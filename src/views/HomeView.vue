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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NavCircles from '@/components/NavCircles.vue'

const currentIndex = ref(0)
const TOTAL_PANELS = 5
const touchStartX = ref(0)  // ← was missing

const slidePosition = computed(() => {
  return `translateX(${currentIndex.value * -100}vw)`
})

function goToPanel(index) {
  currentIndex.value = index
}

function goNext() {
  if (currentIndex.value < TOTAL_PANELS - 1) {
    currentIndex.value++
  }
}

function goPrev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
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
