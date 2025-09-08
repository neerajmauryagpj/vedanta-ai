<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-white">Upload & Add Sources</h2>
        <p class="text-gray-400 mt-2">Add documents and URLs for AI processing</p>
      </div>
      <div class="flex items-center space-x-3">
        <button
          @click="clearAllSources"
          class="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          <Icon name="mdi:delete-sweep" class="w-4 h-4 mr-2" />
          Clear All
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Upload Controls -->
      <div class="space-y-6">
        <!-- File Upload -->
        <UiFileUpload @files-added="handleFilesAdded" />
        
        <!-- URL Input -->
        <UiUrlInput @url-added="handleUrlAdded" />
        
        <!-- Quick Actions -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 class="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button
              @click="addSampleData"
              class="w-full text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              <Icon name="mdi:flash" class="w-4 h-4 mr-3 text-yellow-400 inline" />
              Add Sample Data
            </button>
            <button
              @click="importFromCloud"
              class="w-full text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              <Icon name="mdi:cloud-download" class="w-4 h-4 mr-3 text-blue-400 inline" />
              Import from Cloud
            </button>
            <button
              @click="scheduleBatch"
              class="w-full text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              <Icon name="mdi:clock-outline" class="w-4 h-4 mr-3 text-purple-400 inline" />
              Schedule Batch
            </button>
          </div>
        </div>
      </div>

      <!-- Source List -->
      <div class="lg:col-span-2">
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-white">Sources Queue</h3>
            <div class="flex items-center space-x-3">
              <div class="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Icon name="mdi:magnify" class="w-4 h-4 text-gray-400" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search sources..."
                  class="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-32"
                >
              </div>
              <select
                v-model="statusFilter"
                class="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <!-- Sources List -->
          <div class="space-y-3 max-h-96 overflow-y-auto">
            <div v-if="filteredSources.length === 0" class="text-center py-8">
              <Icon name="mdi:inbox" class="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p class="text-gray-400">No sources found</p>
            </div>
            
            <UiSourceItem
              v-for="source in filteredSources"
              :key="source.id"
              :source="source"
              @retry="retrySource"
              @remove="removeSource"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { sources, addSource, removeSource, clearAllSources } = useFileProcessor()

const searchQuery = ref('')
const statusFilter = ref('all')

const filteredSources = computed(() => {
  let filtered = sources.value

  if (searchQuery.value) {
    filtered = filtered.filter(source =>
      source.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(source => source.status === statusFilter.value)
  }

  return filtered
})

const handleFilesAdded = (files) => {
  files.forEach(file => {
    addSource('file', file.name, file.size)
  })
}

const handleUrlAdded = (url) => {
  const urlName = new URL(url).hostname + new URL(url).pathname
  addSource('url', urlName, 0)
}

const retrySource = (sourceId) => {
  const source = sources.value.find(s => s.id === sourceId)
  if (source) {
    source.status = 'processing'
    source.progress = 0
  }
}

const addSampleData = () => {
  const sampleFiles = [
    { name: 'sample_document.pdf', size: 2048576 },
    { name: 'research_paper.docx', size: 1536000 },
    { name: 'data_analysis.txt', size: 512000 }
  ]
  
  sampleFiles.forEach(file => {
    addSource('file', file.name, file.size)
  })
}

const importFromCloud = () => {
  // Simulate cloud import
  console.log('Importing from cloud...')
}

const scheduleBatch = () => {
  // Simulate batch scheduling
  console.log('Scheduling batch processing...')
}
</script>