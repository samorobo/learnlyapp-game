<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      
      <div class="w-full max-w-md mb-4">
        <h2 class="text-xl font-semibold">Lesson 3.1</h2>
        <div class="flex justify-center my-4">
          <div class="w-36 h-1 flex space-x-1">
            <div v-for="i in 5" :key="i" class="h-1 w-6 bg-blue-600"></div>
          </div>
        </div>
        <p class="text-center font-medium mb-6">
          Tap the arrows below the cards to swipe the cards in the direction of the correct change.
        </p>
      </div>

      <div class="flex justify-between w-full max-w-md mb-2">
        <div class="text-sm text-gray-600">← Physical Change</div>
        <div class="text-sm text-gray-600">Chemical Change →</div>
      </div>
  
      <div class="relative w-full max-w-md flex flex-col items-center">

        <div v-if="allCardsCompleted" class="flex flex-col items-center justify-center h-64 w-full">
          <h2 class="text-2xl font-bold mb-8">Great Job</h2>
          <button
            v-if="hasIncorrectAttempts"
            @click="resetQuiz"
            class="bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-md mb-4 w-32"
          >
            Try Again
          </button>
        </div>
  
    
        <div v-else class="w-full h-96 flex justify-center items-center mb-4">
        
          <div class="relative w-64 h-80 card-stack-container">
          
            <div class="card-layer red-layer"></div>
            <div class="card-layer green-layer"></div>
            <div class="card-layer yellow-layer"></div>
            

            <div 
              class="card-main"
              :style="{ transform: isAnimating ? getSwipeTransform() : 'none', transition: isAnimating ? 'transform 0.5s ease' : 'none' }"
            >
              <div class="card-content">

                <div class="text-white mb-4">
                  <svg v-if="currentCard && currentCard.type === 'fire'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                    <path d="M12 2C9 4 6 7 6 12C6 17 9 20 12 22C15 20 18 17 18 12C18 7 15 4 12 2Z"></path>
                  </svg>
                  <svg v-else-if="currentCard && currentCard.type === 'water'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                    <path d="M12 2L5.5 8.5C2.5 11.5 2.5 16.5 5.5 19.5C8.5 22.5 13.5 22.5 16.5 19.5C19.5 16.5 19.5 11.5 16.5 8.5L12 2Z"></path>
                  </svg>
                  <svg v-else-if="currentCard && currentCard.type === 'metal'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                    <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z"></path>
                  </svg>
                  <svg v-else-if="currentCard && currentCard.type === 'food'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
       
                <div class="text-white text-lg font-medium">{{ currentCard ? currentCard.label : '' }}</div>
              </div>
            </div>
          </div>
        </div>
  
     
        <div v-if="showError" class="text-red-500 font-medium text-center mb-4">
          Wrong direction! Try again.
        </div>
  
        <div class="flex justify-between w-full max-w-md mb-6" v-if="!allCardsCompleted">
        
          <button
            @click="handleSwipe('LEFT')"
            class="w-10 h-10 bg-blue-200 rounded-md flex items-center justify-center text-blue-700"
            :disabled="isAnimating"
          >
            <span class="text-xl">←</span>
          </button>
  
          <button
            @click="handleSwipe('RIGHT')"
            class="w-10 h-10 bg-blue-200 rounded-md flex items-center justify-center text-blue-700"
            :disabled="isAnimating"
          >
            <span class="text-xl">→</span>
          </button>
        </div>
  
     
        <div class="w-full max-w-md">
          <button
            @click="goToNextLesson"
            class="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-md"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Card data
  const cards = ref([
    { id: 1, label: "Burning Paper", type: "fire", correctDirection: "RIGHT" }, 
    { id: 2, label: "Melting Ice", type: "water", correctDirection: "LEFT" },  // 
    { id: 3, label: "Rusting Iron", type: "metal", correctDirection: "RIGHT" }, // 
    { id: 4, label: "Dissolving Sugar", type: "food", correctDirection: "LEFT" }, 
    { id: 5, label: "Cooking Egg", type: "food", correctDirection: "RIGHT" }  
  ]);
  
 
  const currentCardIndex = ref(0);
  const isAnimating = ref(false);
  const currentSwipeDirection = ref(null);
  const showError = ref(false);
  const hasIncorrectAttempts = ref(false);
  const completedCards = ref([]);
  

  const currentCard = computed(() => cards.value[currentCardIndex.value] || null);
  const allCardsCompleted = computed(() => completedCards.value.length === cards.value.length);
  
 
  const getSwipeTransform = () => {
    if (!isAnimating.value) return 'translateX(0)';
    
    const xTranslate = currentSwipeDirection.value === 'LEFT' ? '-120%' : '120%';
    return `translateX(${xTranslate})`;
  };
  
  const handleSwipe = (direction) => {
    if (isAnimating.value || !currentCard.value) return;
    
    isAnimating.value = true;
    currentSwipeDirection.value = direction;
    showError.value = false;
    
   
    if (direction === currentCard.value.correctDirection) {
     
      setTimeout(() => {
      
        completedCards.value.push(currentCard.value);
        
        // Move to next card
        currentCardIndex.value++;
        isAnimating.value = false;
      }, 500);
    } else {
     
      hasIncorrectAttempts.value = true;
      showError.value = true;
      
      setTimeout(() => {
        isAnimating.value = false;
      }, 500);
    }
  };
 
  const resetQuiz = () => {
    currentCardIndex.value = 0;
    isAnimating.value = false;
    showError.value = false;
    hasIncorrectAttempts.value = false;
    completedCards.value = [];
  };
  

  const goToNextLesson = () => {
    // Navigate back to home page
    router.push('/');
  };
  </script>
  
  <style scoped>
  /* 3D Card Stack Container */
  .card-stack-container {
    position: relative;
    perspective: 1000px;
  }
  
  /* Base styles for all cards in the stack */
  .card-layer, .card-main {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  

  .card-main {
    z-index: 40;
    background-color: #38bdf8; /* Light blue */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s ease;
  }
  
  .card-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  

  .card-layer {
    transform-origin: top center;
  }
  
  .yellow-layer {
    background-color: #fbbf24; /* Yellow */
    z-index: 30;
    top: -8px;
    height: 99%;
    width: 96%;
    left: 2%;
  }
  
  
  .green-layer {
    background-color: #34d399; /* Green */
    z-index: 20;
    top: -16px;
    height: 98%;
    width: 92%;
    left: 4%;
  }
  
  .red-layer {
    background-color: #f87171; /* Red */
    z-index: 10;
    top: -24px;
    height: 97%;
    width: 88%;
    left: 6%;
  }
  </style>