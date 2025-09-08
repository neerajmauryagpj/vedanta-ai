<template>
  <NuxtLayout name="default">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Upload Section -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Document Upload -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
              <Icon name="mdi:upload" class="mr-3 text-purple-400" />
              Upload Documents
            </h2>
            
            <div 
              class="border-2 border-dashed border-purple-400/50 rounded-xl p-8 text-center transition-all duration-300 hover:border-purple-400 hover:bg-purple-400/5 cursor-pointer"
              @click="$refs.fileInput.click()"
              @dragover.prevent
              @dragenter.prevent
              @drop.prevent="handleFileDrop"
            >
              <input 
                ref="fileInput" 
                type="file" 
                multiple 
                accept=".pdf,.doc,.docx,.txt,.md"
                @change="handleFileUpload" 
                class="hidden"
              >
              <Icon name="mdi:cloud-upload" class="text-4xl text-purple-400 mb-4 mx-auto block" />
              <p class="text-white mb-2">Drop files here or click to browse</p>
              <p class="text-gray-400 text-sm">Supports PDF, DOC, DOCX, TXT, MD</p>
            </div>
            
            <button 
              @click="$refs.fileInput.click()"
              class="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="mdi:plus" class="mr-2" />
              Select Files
            </button>
          </div>

          <!-- URL Input -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
              <Icon name="mdi:link" class="mr-3 text-blue-400" />
              Add URL
            </h2>
            
            <div class="space-y-4">
              <input 
                v-model="urlInput"
                type="url" 
                placeholder="https://example.com/document"
                class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <button 
                @click="addUrl"
                :disabled="!urlInput.trim()"
                class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Icon name="mdi:plus" class="mr-2" />
                Add URL
              </button>
            </div>
          </div>

          <!-- Learning Stats -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
              <Icon name="mdi:chart-line" class="mr-3 text-green-400" />
              Learning Stats
            </h2>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Total Sources</span>
                <span class="text-white font-bold">{{ totalSources }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Processed</span>
                <span class="text-green-400 font-bold">{{ processedSources }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Processing</span>
                <span class="text-yellow-400 font-bold">{{ processingSources }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Failed</span>
                <span class="text-red-400 font-bold">{{ failedSources }}</span>
              </div>
            </div>
            
            <div class="mt-4 bg-white/10 rounded-full h-2">
              <div 
                class="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500"
                :style="`width: ${progressPercentage}%`"
              ></div>
            </div>
            <p class="text-center text-gray-300 text-sm mt-2">{{ progressPercentage.toFixed(1) }}% Complete</p>
          </div>
        </div>

        <!-- Status List -->
        <div class="lg:col-span-2">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-white flex items-center">
                <Icon name="mdi:format-list-bulleted" class="mr-3 text-indigo-400" />
                Processing Status
              </h2>
              <button 
                @click="clearAll"
                class="text-red-400 hover:text-red-300 transition-colors"
                :disabled="sources.length === 0"
              >
                <Icon name="mdi:delete" class="mr-2" />
                Clear All
              </button>
            </div>
            
            <div v-if="sources.length === 0" class="text-center py-12">
              <Icon name="mdi:inbox" class="text-6xl text-gray-500 mb-4 mx-auto block" />
              <p class="text-gray-400 text-lg">No sources added yet</p>
              <p class="text-gray-500 text-sm">Upload documents or add URLs to get started</p>
            </div>
            
            <div v-else class="space-y-4 max-h-96 overflow-y-auto">
              <div 
                v-for="source in sources" 
                :key="source.id"
                class="bg-white/5 rounded-xl p-4 border border-white/10 transition-all duration-300 hover:bg-white/10"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3 flex-1 min-w-0">
                    <div class="flex-shrink-0">
                      <Icon :name="getSourceIcon(source)" class="text-xl" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-white font-medium truncate">{{ source.name }}</p>
                      <p class="text-gray-400 text-sm">{{ formatFileSize(source.size) }}</p>
                      <p class="text-xs text-gray-500">{{ formatDate(source.addedAt) }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <div class="flex items-center space-x-2">
                      <div :class="getStatusClass(source.status)"></div>
                      <span :class="getStatusColor(source.status)" class="text-sm font-medium capitalize">
                        {{ source.status }}
                      </span>
                    </div>
                    
                    <div class="flex space-x-2">
                      <button 
                        v-if="source.status === 'failed'"
                        @click="retryProcessing(source.id)"
                        class="text-yellow-400 hover:text-yellow-300 transition-colors"
                        title="Retry"
                      >
                        <Icon name="mdi:refresh" class="text-sm" />
                      </button>
                      <button 
                        @click="removeSource(source.id)"
                        class="text-red-400 hover:text-red-300 transition-colors"
                        title="Remove"
                      >
                        <Icon name="mdi:close" class="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Progress bar for processing items -->
                <div v-if="source.status === 'processing'" class="mt-3">
                  <div class="bg-white/10 rounded-full h-1.5">
                    <div 
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full animate-pulse"
                      :style="`width: ${source.progress || 50}%`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </NuxtLayout>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data
const urlInput = ref('')
const sources = ref([])
const nextId = ref(1)
const fileInput = ref(null)

// Computed properties
const totalSources = computed(() => sources.value.length)
const processedSources = computed(() => sources.value.filter(s => s.status === 'completed').length)
const processingSources = computed(() => sources.value.filter(s => s.status === 'processing').length)
const failedSources = computed(() => sources.value.filter(s => s.status === 'failed').length)
const progressPercentage = computed(() => {
  if (totalSources.value === 0) return 0
  return (processedSources.value / totalSources.value) * 100
})

// Methods
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => addSource('file', file.name, file.size))
  event.target.value = ''
}

const handleFileDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  files.forEach(file => addSource('file', file.name, file.size))
}

const addUrl = () => {
  if (!urlInput.value.trim()) return
  
  const urlName = getUrlName(urlInput.value)
  addSource('url', urlName, 0)
  urlInput.value = ''
}

const addSource = (type, name, size) => {
  const source = {
    id: nextId.value++,
    type,
    name,
    size,
    status: 'processing',
    progress: 0,
    addedAt: new Date()
  }
  
  sources.value.unshift(source)
  simulateProcessing(source.id)
}

const simulateProcessing = (id) => {
  const source = sources.value.find(s => s.id === id)
  if (!source) return
  
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 20
    source.progress = Math.min(progress, 100)
    
    if (progress >= 100) {
      clearInterval(interval)
      // Random outcome: 80% success, 20% failure
      source.status = Math.random() > 0.2 ? 'completed' : 'failed'
      source.progress = 100
    }
  }, 200 + Math.random() * 300)
}

const retryProcessing = (id) => {
  const source = sources.value.find(s => s.id === id)
  if (source) {
    source.status = 'processing'
    source.progress = 0
    simulateProcessing(id)
  }
}

const removeSource = (id) => {
  sources.value = sources.value.filter(s => s.id !== id)
}

const clearAll = () => {
  sources.value = []
}

const getUrlName = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname + urlObj.pathname
  } catch {
    return url
  }
}

const getSourceIcon = (source) => {
  if (source.type === 'url') {
    return 'mdi:link'
  }
  
  const ext = source.name.split('.').pop().toLowerCase()
  switch (ext) {
    case 'pdf': return 'mdi:file-pdf-box'
    case 'doc':
    case 'docx': return 'mdi:file-word-box'
    case 'txt': return 'mdi:file-document'
    case 'md': return 'mdi:language-markdown'
    default: return 'mdi:file'
  }
}

const getStatusClass = (status) => {
  const baseClass = "w-3 h-3 rounded-full "
  switch (status) {
    case 'processing': return baseClass + "bg-yellow-400 animate-pulse"
    case 'completed': return baseClass + "bg-green-400"
    case 'failed': return baseClass + "bg-red-400"
    default: return baseClass + "bg-gray-400"
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'processing': return 'text-yellow-400'
    case 'completed': return 'text-green-400'
    case 'failed': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return 'N/A'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
/* Custom scrollbar for the status list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.7);
}
</style>