<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Mobile sidebar overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      @click="sidebarOpen = false"
    ></div>
    
    <!-- Sidebar -->
    <UiSidebar 
      :open="sidebarOpen" 
      :active-tab="activeTab"
      @update:activeTab="activeTab = $event"
      @close="sidebarOpen = false"
    />
    
    <!-- Main content -->
    <div class="lg:pl-64 flex flex-col min-h-screen">
      <!-- Header -->
      <UiHeader 
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        :notifications="3"
      />
      
      <!-- Main content area -->
      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const sidebarOpen = ref(false)
const activeTab = ref('overview')

// Provide active tab to child components
provide('activeTab', activeTab)
provide('sidebarOpen', sidebarOpen)
</script>