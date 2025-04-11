import { createRouter, createWebHistory } from 'vue-router'
import QuizHome from '@/views/QuizHome.vue'
import TapRevealView from '@/views/TapRevealView.vue'
// import SwipeQuizView from '@/views/SwipeQuizView.vue'

const routes = [
  { path: '/', name: 'home', component: QuizHome },
  { path: '/tap-to-reveal', name: 'tap-reveal', component: TapRevealView },
  // { path: '/swipe-quiz', name: 'swipe-quiz', component: SwipeQuizView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
