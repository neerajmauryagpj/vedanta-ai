<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-white">Processing Queue</h2>
        <p class="text-gray-400 mt-2">Monitor and manage your AI processing tasks</p>
      </div>
      <div class="flex items-center space-x-3">
        <button
          @click="pauseAll"
          class="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
        >
          <Icon name="mdi:pause" class="w-4 h-4 mr-2" />
          Pause All
        </button>
        <button
          @click="retryFailed"
          class="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
        >
          <Icon name="mdi:refresh" class="w-4 h-4 mr-2" />
          Retry Failed
        </button>
      </div>
    </div>

    <!-- Processing Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400 mb-1">Active Tasks</p>
            <p class="text-3xl font-bold text-yellow-400">{{ activeProcessing }}</p>
          </div>
          <Icon name="mdi:cog" class="w-8 h-8 text-yellow-400 animate-spin" />
        </div>
      </div>
      
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400 mb-1">Completed</p>
            <p class="text-3xl font-bold text-green-400">{{ completedCount }}</p>
          </div>
          <Icon name="mdi:check-circle" class="w-8 h-8 text-green-400" />
        </div>
      </div>
      
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400 mb-1">Queue</p>
            <p class="text-3xl font-bold text-blue-400">{{ queuedCount }}</p>
          </div>
          <Icon name="mdi:clock" class="w-8 h-8 text-blue-400" />
        </div>
      </div>
      
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400 mb-1">Failed</p>
            <p class="text-3xl font-bold text-red-400">{{ failedCount }}</p>
          </div>
          <Icon name="mdi:alert-circle" class="w-8 h-8 text-red-400" />
        </div>
      </div>
    </div>

    <!-- Processing Queue -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Active Processing -->
      <div class="lg:col-span-2">
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 class="text-xl font-semibold text-white mb-6 flex items-center">
            <Icon name="mdi:play-circle" class="mr-3 text-green-400" />
            Active Processing
          </h3>
          
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div 
              v-for="task in activeProcessingTasks" 
              :key="task.id"
              class="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Icon name="mdi:cog" class="w-4 h-4 text-yellow-400 animate-spin" />
                  </div>
                  <div>
                    <p class="text-white font-medium">{{ task.name }}</p>
                    <p class="text-gray-400 text-sm">{{ task.type }}</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-400">{{ task.progress }}%</span>
                  <button
                    @click="pauseTask(task.id)"
                    class="text-yellow-400 hover:text-yellow-300 p-1"
                  >
                    <Icon name="mdi:pause" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="flex justify-between text-xs text-gray-400">
                  <span>{{ task.step }}</span>
                  <span>ETA: {{ task.eta }}</span>
                </div>
                <div class="bg-white/10 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500 animate-pulse"
                    :style="`width: ${task.progress}%`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="space-y-6">
        <!-- CPU Usage -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <Icon name="mdi:chip" class="mr-3 text-purple-400" />
            System Resources
          </h3>
          
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">CPU Usage</span>
                <span class="text-white">{{ systemStats.cpu }}%</span>
              </div>
              <div class="bg-white/10 rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  :style="`width: ${systemStats.cpu}%`"
                ></div>
              </div>
            </div>
            
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">Memory</span>
                <span class="text-white">{{ systemStats.memory }}%</span>
              </div>
              <div class="bg-white/10 rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                  :style="`width: ${systemStats.memory}%`"
                ></div>
              </div>
            </div>
            
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">Storage</span>
                <span class="text-white">{{ systemStats.storage }}%</span>
              </div>
              <div class="bg-white/10 rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  :style="`width: ${systemStats.storage}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Processing Settings -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <Icon name="mdi:tune" class="mr-3 text-blue-400" />
            Processing Settings
          </h3>
          
          <div class="space-y-4">
            <div>
              <label class="text-sm text-gray-300 mb-2 block">Concurrent Tasks</label>
              <input
                v-model="settings.concurrentTasks"
                type="range"
                min="1"
                max="10"
                class="w-full"
              >
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>{{ settings.concurrentTasks }}</span>
                <span>10</span>
              </div>
            </div>
            
            <div>
              <label class="text-sm text-gray-300 mb-2 block">Priority Mode</label>
              <select
                v-model="settings.priorityMode"
                class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              >
                <option value="fifo">First In, First Out</option>
                <option value="priority">By Priority</option>
                <option value="size">By File Size</option>
              </select>
            </div>
            
            <div class="flex items-center space-x-2">
              <input
                v-model="settings.autoRetry"
                type="checkbox"
                class="rounded"
              >
              <label class="text-sm text-gray-300">Auto-retry failed tasks</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { sources } = useFileProcessor()

const activeProcessing = computed(() => sources.value.filter(s => s.status === 'processing').length)
const completedCount = computed(() => sources.value.filter(s => s.status === 'completed').length)
const queuedCount = computed(() => sources.value.filter(s => s.status === 'queued').length)
const failedCount = computed(() => sources.value.filter(s => s.status === 'failed').length)

const activeProcessingTasks = computed(() => 
  sources.value
    .filter(s => s.status === 'processing')
    .map(s => ({
      ...s,
      step: getProcessingStep(s),
      eta: getEstimatedTime(s)
    }))
)

const systemStats = ref({
  cpu: 65,
  memory: 42,
  storage: 78
})

const settings = ref({
  concurrentTasks: 4,
  priorityMode: 'priority',
  autoRetry: true
})

// Update system stats periodically
onMounted(() => {
  setInterval(() => {
    systemStats.value.cpu = Math.max(20, Math.min(90, systemStats.value.cpu + (Math.random() - 0.5) * 20))
    systemStats.value.memory = Math.max(30, Math.min(80, systemStats.value.memory + (Math.random() - 0.5) * 10))
    systemStats.value.storage = Math.max(60, Math.min(90, systemStats.value.storage + (Math.random() - 0.5) * 5))
  }, 3000)
})

const getProcessingStep = (source) => {
  const steps = [
    'Analyzing content...',
    'Extracting text...',
    'Processing AI model...',
    'Generating embeddings...',
    'Finalizing...'
  ]
  const stepIndex = Math.floor((source.progress || 0) / 20)
  return steps[Math.min(stepIndex, steps.length - 1)]
}

const getEstimatedTime = (source) => {
  const progress = source.progress || 0
  if (progress < 10) return '5-10 min'
  if (progress < 50) return '2-5 min'
  if (progress < 80) return '1-2 min'
  return '< 1 min'
}

const pauseAll = () => {
  console.log('Pausing all tasks')
}

const retryFailed = () => {
  console.log('Retrying failed tasks')
}

const pauseTask = (taskId) => {
  console.log('Pausing task:', taskId)
}
</script>