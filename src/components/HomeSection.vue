<template>
  <div class="home-section">

    <!-- 
      STAGE 0: Hello
      v-show keeps it in DOM always
      :class adds 'visible' when stage is 0
      our CSS then animates it in/out
    -->
    <div class="stage stage-0" :class="{ visible: stage === 0 }">
      <h1 class="hello-text">Hello.</h1>
      <p class="scroll-hint">scroll to continue</p>
    </div>

    <!-- 
      STAGE 1: Impatience + photo
      Same pattern — visible class controls the animation
    -->
    <div class="stage stage-1" :class="{ visible: stage === 1 }">
      <div class="stage-1-content">
        <div class="photo-container">
          <!-- 
            We'll replace this with your real photo later
            For now it's a placeholder
          -->
          <div class="photo-placeholder">📸</div>
        </div>
        <h2 class="impatience-text">I'm Patience Kiboi.</h2>
      </div>
    </div>

    <!-- 
      STAGE 2: Welcome + button
      @click on the button calls a function we'll emit up
    -->
    <div class="stage stage-2" :class="{ visible: stage === 2 }">
      <h2 class="welcome-text">Welcome! to my page.</h2>
      <p class="welcome-sub">Discover more about me!</p>
      <button class="enter-btn" @click="$emit('enter')">
        Let's go →
      </button>
    </div>

  </div>
</template>

<script setup>
/*
  This component receives two props:
  - stage: which home stage we're on (0, 1, or 2)
  
  And emits one event:
  - enter: when the button is pressed
*/
defineProps({
  stage: {
    type: Number,
    required: true
  }
})

defineEmits(['enter'])
</script>

<style scoped>
.home-section {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f0ff;
  overflow: hidden;
}

/* 
  Every stage is positioned on top of each other
  using absolute positioning.
  They all occupy the same space — only one is
  visible at a time via the .visible class
*/
.stage {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  /* Hidden by default */
  opacity: 0;
  transform: translateY(30px);

  /*
    This transition animates opacity and transform
    whenever Vue adds or removes the .visible class
  */
  transition: opacity 0.7s ease, transform 0.7s ease;

  /* Prevents hidden stages from capturing clicks */
  pointer-events: none;
}

/* When .visible is added, animate into view */
.stage.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

/* --- Stage 0 styles --- */
.hello-text {
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 800;
  color: #2d1b69;
  letter-spacing: -3px;
  font-family: Georgia, serif;
}

.scroll-hint {
  font-size: 0.85rem;
  color: #9575cd;
  letter-spacing: 3px;
  text-transform: uppercase;
  animation: pulse 2s ease infinite;
}

/* A subtle breathing animation on the hint */
@keyframes pulse {
  0%, 100% { opacity: 0.4 }
  50%       { opacity: 1 }
}

/* --- Stage 1 styles --- */
.stage-1-content {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.photo-placeholder {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: #e0d4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  border: 4px solid #9575cd;
}

.impatience-text {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  color: #2d1b69;
  font-family: Georgia, serif;
  font-style: italic;
}

/* --- Stage 2 styles --- */
.welcome-text {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: #2d1b69;
  font-family: Georgia, serif;
  text-align: center;
}

.welcome-sub {
  font-size: 1rem;
  color: #9575cd;
  letter-spacing: 2px;
}

.enter-btn {
  margin-top: 1rem;
  padding: 1rem 2.5rem;
  background: #2d1b69;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.enter-btn:hover {
  background: #9575cd;
  transform: scale(1.05);
}
</style>