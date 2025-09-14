<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <!-- Mobile sidebar overlay -->
    <div 
      v-if="dashboardStore.sidebarOpen" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      @click="dashboardStore.closeSidebar"
    />
    
    <!-- Sidebar -->
    <UiSidebar 
      :open="dashboardStore.sidebarOpen" 
      :active-tab="dashboardStore.activeTab"
      @update:active-tab="dashboardStore.setActiveTab"
      @close="dashboardStore.closeSidebar"
    />
    
    <!-- Main content -->
    <div class="lg:pl-64 flex flex-col min-h-screen">
      <!-- Header -->
      <UiHeader 
        :notifications="3"
        @toggle-sidebar="dashboardStore.toggleSidebar"
      />
      
      <!-- Main content area -->
      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// Use dashboard store for state management
const dashboardStore = useDashboardStore()
</script>