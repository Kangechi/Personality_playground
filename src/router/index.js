import { createRouter, createWebHistory } from 'vue-router'
// We'll import our view components here in order to create routes for them
// an example is import HomeView.vue
import HomeView from '@/views/HomeView.vue'

//Then for ease in working lets just create a variable that holds all our routes then we put the variable inthe createroute section
const routes = [
   // Each route is an object with:
  // path  → the URL
  // name  → a nickname (useful for navigation)
  // component → which Vue component to show
  {
    path: '/',
    name: 'home',
    component: HomeView
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
//In order to enable the horizontal scroll of the different views - we wont use ormal routing
//Normal routing when the url changes - the whole page swaps out
//So our homeview will be the scrollcontainer 
export default router
