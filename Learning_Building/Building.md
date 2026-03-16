Routing to a horizontal scroll.

As I was craeting the website I ensure that as one presses the routing icons, other than a reload to a new page, routing does a horizontal scroll to the next section.

This was achieved by ensuring:
1. The only route path was contained for the HomeView only, rather than ensuring we have router links for all the views which would then result in a re-loading of the page.

thus in index.js:
import {creatWebHistory, createRoute}
import HomeView from  '@/views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component:HomeView
            }
]

const router = createRouter({
     history:  createWebHistory(import.meta.env.BASE_URL),
     routes

})
export default router

then ensure that all the section- five of them are in the homeview
-The homeview has the scroll container with all the sections


Display flex - aligns the sections side by side

(use of props/ On mounted/computed)