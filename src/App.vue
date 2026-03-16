<script setup>
// We import RouterView so Vue knows about it
// (In Vue 3, you must import components before using them in template)

import { RouterView } from 'vue-router';

</script>

<template>
   <!--
   This is our app shell.
    RouterView is a special Vue Router component — it's a
    "placeholder" that renders whichever view matches the
    current URL. Think of it as a window that swaps content.
  -->
    <main>
  <RouterView/>
  </main>

</template>

<style>
/* No "scoped" here — these are GLOBAL styles for the whole app */

* {
  margin: 0;
  padding: 0; 
  box-sizing: border-box;

}

html, body {
  overflow: hidden; /* We control scrolling ourselves */
  width: 100vw;
  height: 100vh;
}

</style>
