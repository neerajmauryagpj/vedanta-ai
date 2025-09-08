<template>
  <NuxtLayout name="dashboard">
    <!-- Dynamic content based on active tab -->
    <Transition name="fade" mode="out-in">
      <SectionsOverviewSection v-if="activeTab === 'overview'" key="overview" />
      <SectionsUploadSection v-else-if="activeTab === 'upload'" key="upload" />
      <SectionsProcessingSection v-else-if="activeTab === 'processing'" key="processing" />
      <SectionsAnalyticsSection v-else-if="activeTab === 'analytics'" key="analytics" />
      <div v-else-if="activeTab === 'history'" key="history" class="text-white">
        <h2 class="text-2xl font-bold mb-4">Processing History</h2>
        <p class="text-gray-400">History component coming soon...</p>
      </div>
      <div v-else-if="activeTab === 'settings'" key="settings" class="text-white">
        <h2 class="text-2xl font-bold mb-4">Settings</h2>
        <p class="text-gray-400">Settings component coming soon...</p>
      </div>
      <SectionsOverviewSection v-else key="default" />
    </Transition>
  </NuxtLayout>
</template>

<script setup>
// Get active tab from layout
const activeTab = inject('activeTab', ref('overview'))

// Set page meta
definePageMeta({
  title: 'AI Learning Dashboard',
  description: 'Manage and monitor your AI document processing'
})

// SEO head
useHead({
  title: 'AI Learning Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Advanced AI-powered document processing and learning platform'
    }
  ]
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>