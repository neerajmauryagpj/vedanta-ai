<template>
  <header class="bg-black/20 backdrop-blur-lg border-b border-white/10 px-4 lg:px-8 py-4">
    <div class="flex items-center justify-between">
      <!-- Left side -->
      <div class="flex items-center space-x-4">
        <button 
          @click="$emit('toggleSidebar')"
          class="lg:hidden text-gray-400 hover:text-white"
        >
          <Icon name="mdi:menu" class="w-6 h-6" />
        </button>
        
        <div>
          <h1 class="text-2xl font-bold text-white">Dashboard</h1>
          <p class="text-sm text-gray-400">Manage your AI learning sources</p>
        </div>
      </div>
      
      <!-- Right side -->
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="hidden md:flex items-center space-x-2">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-64 bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
            <Icon name="mdi:magnify" class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <!-- Notifications -->
        <button class="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Icon name="mdi:bell" class="w-5 h-5" />
          <span v-if="notifications > 0" class="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
            {{ notifications }}
          </span>
        </button>
        
        <!-- User menu -->
        <div class="relative">
          <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Icon name="mdi:account" class="text-white text-sm" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  notifications: {
    type: Number,
    default: 0
  }
})

defineEmits(['toggleSidebar'])

const searchQuery = ref('')
</script>