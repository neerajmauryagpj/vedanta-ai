<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm text-gray-400 mb-1">{{ title }}</p>
        <p class="text-2xl font-bold text-white mb-2">{{ value }}</p>
        <div class="flex items-center space-x-2">
          <span 
            class="text-xs px-2 py-1 rounded-full"
            :class="changeType === 'increase' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'"
          >
            <Icon :name="changeType === 'increase' ? 'mdi:trending-up' : 'mdi:trending-down'" class="w-3 h-3 inline mr-1" />
            {{ change }}
          </span>
          <span class="text-xs text-gray-500">vs last week</span>
        </div>
      </div>
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="iconBg">
          <Icon :name="icon" class="w-6 h-6" :class="iconColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  change: String,
  changeType: {
    type: String,
    default: 'increase'
  },
  icon: String,
  iconBg: {
    type: String,
    default: 'bg-purple-500/20'
  },
  iconColor: {
    type: String,
    default: 'text-purple-400'
  }
})
</script>