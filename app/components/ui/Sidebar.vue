<template>
  <div 
    class="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex h-full flex-col bg-black/20 backdrop-blur-xl border-r border-white/10">
      <!-- Logo -->
      <div class="flex h-16 items-center justify-between px-6 border-b border-white/10">
        <div class="flex items-center space-x-3 cursor-pointer" @click="$router.push('/')">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Icon name="mdi:brain" class="text-white text-xl" />
          </div>
          <span class="text-xl font-bold text-white">AI Learning</span>
        </div>
        <button @click="$emit('close')" class="lg:hidden text-gray-400 hover:text-white">
          <Icon name="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <button
          v-for="item in navigation"
          :key="item.id"
          @click="$emit('update:activeTab', item.id)"
          class="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="activeTab === item.id 
            ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
            : 'text-gray-300 hover:bg-white/10 hover:text-white'"
        >
          <Icon :name="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
          <span v-if="item.badge" class="ml-auto bg-red-500 text-xs px-2 py-1 rounded-full">
            {{ item.badge }}
          </span>
        </button>
      </nav>
      
      <!-- User section -->
      <div class="p-4 border-t border-white/10">
        <div class="flex items-center space-x-3 p-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Icon name="mdi:account" class="text-white text-sm" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-white">John Doe</p>
            <p class="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  activeTab: String
})

defineEmits(['close', 'update:activeTab'])

const navigation = [
  { id: 'overview', name: 'Overview', icon: 'mdi:view-dashboard' },
  { id: 'upload', name: 'Upload Files', icon: 'mdi:upload' },
  { id: 'processing', name: 'Processing', icon: 'mdi:cog', badge: '4' },
  { id: 'analytics', name: 'Analytics', icon: 'mdi:chart-line' },
  { id: 'history', name: 'History', icon: 'mdi:history' },
  { id: 'settings', name: 'Settings', icon: 'mdi:cog' }
]
</script>