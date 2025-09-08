<template>
  <div class="bg-white/5 rounded-xl p-4 border border-white/10 transition-all duration-300 hover:bg-white/10 group">
    <div class="flex items-center justify-between">
      <!-- Source Info -->
      <div class="flex items-center space-x-3 flex-1 min-w-0">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="getIconBg(source.type)">
            <Icon :name="getSourceIcon(source)" class="w-5 h-5" :class="getIconColor(source.type)" />
          </div>
        </div>
        
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-1">
            <p class="text-white font-medium truncate">{{ source.name }}</p>
            <span class="text-xs px-2 py-1 rounded-full" :class="getTypeClass(source.type)">
              {{ source.type.toUpperCase() }}
            </span>
          </div>
          
          <div class="flex items-center space-x-4 text-sm text-gray-400">
            <span>{{ formatFileSize(source.size) }}</span>
            <span>{{ formatDate(source.addedAt) }}</span>
            <span v-if="source.duration" class="flex items-center">
              <Icon name="mdi:clock" class="w-3 h-3 mr-1" />
              {{ source.duration }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Status & Actions -->
      <div class="flex items-center space-x-4">
        <!-- Status Indicator -->
        <div class="flex items-center space-x-2">
          <div class="flex items-center space-x-2">
            <div :class="getStatusDot(source.status)"></div>
            <span :class="getStatusColor(source.status)" class="text-sm font-medium capitalize">
              {{ source.status }}
            </span>
          </div>
          
          <!-- Processing Time -->
          <div v-if="source.status === 'processing'" class="text-xs text-gray-500">
            {{ getProcessingTime(source) }}
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <!-- View/Download -->
          <button 
            v-if="source.status === 'completed'"
            @click="viewSource"
            class="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="View Source"
          >
            <Icon name="mdi:eye" class="w-4 h-4" />
          </button>
          
          <!-- Retry -->
          <button 
            v-if="source.status === 'failed'"
            @click="$emit('retry', source.id)"
            class="p-2 rounded-lg hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300 transition-colors"
            title="Retry Processing"
          >
            <Icon name="mdi:refresh" class="w-4 h-4" />
          </button>
          
          <!-- Pause/Resume -->
          <button 
            v-if="source.status === 'processing'"
            @click="toggleProcessing"
            class="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
            :title="source.paused ? 'Resume' : 'Pause'"
          >
            <Icon :name="source.paused ? 'mdi:play' : 'mdi:pause'" class="w-4 h-4" />
          </button>
          
          <!-- Settings -->
          <button 
            @click="showSettings = !showSettings"
            class="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Settings"
          >
            <Icon name="mdi:cog" class="w-4 h-4" />
          </button>
          
          <!-- Remove -->
          <button 
            @click="$emit('remove', source.id)"
            class="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
            title="Remove"
          >
            <Icon name="mdi:delete" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div v-if="source.status === 'processing'" class="mt-4">
      <div class="flex justify-between text-xs text-gray-400 mb-1">
        <span>Processing...</span>
        <span>{{ source.progress || 0 }}%</span>
      </div>
      <div class="bg-white/10 rounded-full h-1.5">
        <div 
          class="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500"
          :style="`width: ${source.progress || 0}%`"
          :class="source.paused ? 'animate-none' : 'animate-pulse'"
        ></div>
      </div>
    </div>
    
    <!-- Settings Panel -->
    <div v-if="showSettings" class="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
      <h4 class="text-white font-medium mb-3">Source Settings</h4>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label class="text-gray-400">Priority</label>
          <select v-model="source.priority" class="w-full mt-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-white">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label class="text-gray-400">Processing Mode</label>
          <select v-model="source.mode" class="w-full mt-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-white">
            <option value="full">Full Analysis</option>
            <option value="quick">Quick Scan</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  source: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['retry', 'remove'])

const showSettings = ref(false)

const getSourceIcon = (source) => {
  if (source.type === 'url') return 'mdi:link'
  
  const ext = source.name.split('.').pop()?.toLowerCase()
  const iconMap = {
    'pdf': 'mdi:file-pdf-box',
    'doc': 'mdi:file-word-box',
    'docx': 'mdi:file-word-box',
    'txt': 'mdi:file-document',
    'md': 'mdi:language-markdown',
    'csv': 'mdi:file-delimited',
    'xlsx': 'mdi:file-excel-box'
  }
  
  return iconMap[ext] || 'mdi:file'
}

const getIconBg = (type) => {
  return type === 'url' ? 'bg-blue-500/20' : 'bg-purple-500/20'
}

const getIconColor = (type) => {
  return type === 'url' ? 'text-blue-400' : 'text-purple-400'
}

const getTypeClass = (type) => {
  return type === 'url' 
    ? 'bg-blue-500/20 text-blue-400' 
    : 'bg-purple-500/20 text-purple-400'
}

const getStatusDot = (status) => {
  const baseClass = "w-2 h-2 rounded-full "
  const statusMap = {
    'processing': baseClass + "bg-yellow-400 animate-pulse",
    'completed': baseClass + "bg-green-400",
    'failed': baseClass + "bg-red-400",
    'paused': baseClass + "bg-gray-400"
  }
  return statusMap[status] || baseClass + "bg-gray-400"
}

const getStatusColor = (status) => {
  const colorMap = {
    'processing': 'text-yellow-400',
    'completed': 'text-green-400',
    'failed': 'text-red-400',
    'paused': 'text-gray-400'
  }
  return colorMap[status] || 'text-gray-400'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return 'N/A'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
  return date.toLocaleDateString()
}

const getProcessingTime = (source) => {
  const elapsed = new Date() - source.addedAt
  const minutes = Math.floor(elapsed / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)
  
  if (minutes > 0) return `${minutes}:${seconds.toString().padStart(2, '0')}`
  return `${seconds}s`
}

const viewSource = () => {
  // Implement view source logic
  console.log('Viewing source:', props.source.id)
}

const toggleProcessing = () => {
  // Implement pause/resume logic
  console.log('Toggling processing for:', props.source.id)
}
</script>