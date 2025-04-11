<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <!-- Heading -->
      <h1 class="text-2xl font-bold mb-6 text-center">
        Tap to Discover States of Matter!
      </h1>
      <!-- Cards Container -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="relative w-36 h-48 perspective"
          @click="flipCard(index)"
        >
          <!-- Card wrapper with flipping condition -->
          <div :class="['relative w-full h-full duration-500 transform-style-preserve-3d', 
                        flippedIndices.includes(index) ? 'rotate-y-180' : '']">
            <!-- Front side -->
            <div 
              class="absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center font-semibold text-white"
              :style="{ backgroundColor: card.color }"
            >
              {{ card.label }}
            </div>
            <!-- Back side -->
            <div 
              class="absolute w-full h-full backface-hidden rounded-lg flex flex-col items-center justify-center p-2 transform rotate-y-180 bg-white text-gray-700"
            >
              <p class="font-semibold mb-2">{{ card.revealTitle }}</p>
              <p class="text-sm">{{ card.revealText }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Next Button -->
      <button 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        @click="goToSwipeQuiz"
      >
        Next →
      </button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    name: "TapToReveal",
    setup() {
      const router = useRouter();
      
      const goToSwipeQuiz = () => {
        router.push('/swipe-quiz');
      };
      
      return {
        goToSwipeQuiz
      };
    },
    data() {
      return {
        cards: [
          {
            label: "Steam",
            color: "#4DD0E1",
            revealTitle: "Gas",
            revealText: "A gas expands to fill any container. Particles move freely."
          },
          {
            label: "Water",
            color: "#BA68C8",
            revealTitle: "Liquid",
            revealText: "A liquid takes the shape of its container but keeps volume."
          },
          {
            label: "Ice",
            color: "#FFB74D",
            revealTitle: "Solid",
            revealText: "Fixed shape & volume. Particles vibrate but don't move freely."
          },
          {
            label: "Lightning",
            color: "#7E57C2",
            revealTitle: "Plasma",
            revealText: "Ionized gas with free-moving ions and electrons."
          }
        ],
        flippedIndices: []
      }
    },
    methods: {
      flipCard(index) {
        if (this.flippedIndices.includes(index)) {
          this.flippedIndices = this.flippedIndices.filter(i => i !== index)
        } else {
          // Allow multiple card flips or limit to one depending on your design:
          this.flippedIndices.push(index)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .perspective {
    perspective: 1000px;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  </style>
  