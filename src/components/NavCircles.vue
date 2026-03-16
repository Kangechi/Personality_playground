<template>
  <nav class="nav-circles">
    <button
      v-for="(section, index) in sections"
      :key="section.id"
      class="circle"
      :class="{ active: index === currentIndex }"
      @click="$emit('navigate', index)"
    >
      <span class="label">{{ section.name }}</span>
    </button>
  </nav>
</template>

<script setup>
defineProps({
  currentIndex: {
    type: Number,
    required: true
  }
})

defineEmits(['navigate'])

const sections = [
  { id: 'home',     name: 'Home' },
  { id: 'about',    name: 'About' },
  { id: 'articles', name: 'Articles' },
  { id: 'podcast',  name: 'Podcast' },
  { id: 'contact',  name: 'Contact' }
]
</script>

<style scoped>
.nav-circles {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 100;
}

.circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2.5px solid #fff;
  background: transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.circle.active {
  background: rgba(251, 198, 235, 0.3);
  transform: scale(1.2);
}

.circle:hover {
  background: rgba(251, 198, 235, 0.1);
}

.label {
  position: absolute;
  bottom: -1.8rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.65rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
  font-family: sans-serif;
}

.circle:hover .label {
  opacity: 1;
}
</style>