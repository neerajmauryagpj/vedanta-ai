<template>
  <div class="space-y-8">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UiStatCard
        title="Total Sources"
        :value="stats.totalSources"
        change="+12%"
        icon="mdi:database"
        iconBg="bg-blue-500/20"
        iconColor="text-blue-400"
      />
      <UiStatCard
        title="Processing"
        :value="stats.processing"
        change="+8%"
        icon="mdi:cog"
        iconBg="bg-yellow-500/20"
        iconColor="text-yellow-400"
      />
      <UiStatCard
        title="Completed"
        :value="stats.processed"
        change="+23%"
        icon="mdi:check-circle"
        iconBg="bg-green-500/20"
        iconColor="text-green-400"
      />
      <UiStatCard
        title="Success Rate"
        :value="stats.successRate"
        change="+2%"
        icon="mdi:chart-line"
        iconBg="bg-purple-500/20"
        iconColor="text-purple-400"
      />
    </div>
    
    <!-- Charts and Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Processing Chart -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="mdi:chart-donut" class="mr-3 text-purple-400" />
          Processing Overview
        </h3>
        <ChartsProcessingChart :data="chartData" />
      </div>
      
      <!-- Recent Activity -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="mdi:clock" class="mr-3 text-blue-400" />
          Recent Activity
        </h3>
        <div class="space-y-4 max-h-80 overflow-y-auto">
          <div 
            v-for="activity in recentActivity" 
            :key="activity.id"
            class="flex items-center space-x-3 p-3 rounded-lg bg-white/5"
          >
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center"
                   :class="getActivityStatusClass(activity.status)">
                <Icon :name="getActivityIcon(activity.status)" class="w-4 h-4" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-white font-medium">{{ activity.action }}</p>
              <p class="text-xs text-gray-400 truncate">{{ activity.file }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { stats, recentActivity } = useDashboard()

const chartData = computed(() => [
  { name: 'Completed', value: stats.value.processed, color: '#10B981' },
  { name: 'Processing', value: stats.value.processing, color: '#F59E0B' },
  { name: 'Failed', value: stats.value.failed, color: '#EF4444' }
])

const getActivityStatusClass = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-500/20 text-green-400'
    case 'processing': return 'bg-yellow-500/20 text-yellow-400'
    case 'failed': return 'bg-red-500/20 text-red-400'
    default: return 'bg-gray-500/20 text-gray-400'
  }
}

const getActivityIcon = (status) => {
  switch (status) {
    case 'completed': return 'mdi:check'
    case 'processing': return 'mdi:cog'
    case 'failed': return 'mdi:alert-circle'
    default: return 'mdi:information'
  }
}
</script>