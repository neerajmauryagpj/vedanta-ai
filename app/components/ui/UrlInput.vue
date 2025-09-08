<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
    <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
      <Icon name="mdi:link" class="mr-3 text-blue-400" />
      Add URL Sources
    </h3>
    
    <div class="space-y-4">
      <!-- URL Input -->
      <div class="relative">
        <input 
          v-model="urlInput"
          type="url" 
          placeholder="https://example.com/document or article"
          class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @keydown.enter="addUrl"
        >
        <button
          @click="addUrl"
          :disabled="!isValidUrl"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md transition-colors"
          :class="isValidUrl ? 'text-blue-400 hover:bg-blue-400/20' : 'text-gray-600 cursor-not-allowed'"
        >
          <Icon name="mdi:plus" class="w-4 h-4" />
        </button>
      </div>
      
      <!-- URL Validation -->
      <div v-if="urlInput && !isValidUrl" class="text-red-400 text-sm flex items-center">
        <Icon name="mdi:alert-circle" class="w-4 h-4 mr-2" />
        Please enter a valid URL
      </div>
      
      <!-- Bulk URL Input -->
      <div class="border-t border-white/10 pt-4">
        <button
          @click="showBulkInput = !showBulkInput"
          class="text-sm text-blue-400 hover:text-blue-300 flex items-center"
        >
          <Icon name="mdi:format-list-bulleted" class="w-4 h-4 mr-2" />
          Add Multiple URLs
        </button>
        
        <div v-if="showBulkInput" class="mt-3">
          <textarea
            v-model="bulkUrls"
            placeholder="Enter multiple URLs (one per line)"
            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
          ></textarea>
          <button
            @click="addBulkUrls"
            class="mt-2 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all"
          >
            Add {{ validBulkUrls.length }} URLs
          </button>
        </div>
      </div>
      
      <!-- Quick Add Buttons -->
      <div class="space-y-2">
        <p class="text-sm text-gray-400">Quick Add:</p>
        <div class="grid grid-cols-1 gap-2">
          <button
            v-for="quickUrl in quickUrls"
            :key="quickUrl.url"
            @click="urlInput = quickUrl.url"
            class="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <div class="flex items-center">
              <Icon :name="quickUrl.icon" class="w-4 h-4 mr-3 text-gray-400" />
              <div>
                <p class="text-white text-sm">{{ quickUrl.name }}</p>
                <p class="text-gray-400 text-xs truncate">{{ quickUrl.url }}</p>
              </div>
            </div>
            <Icon name="mdi:chevron-right" class="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['url-added'])

const urlInput = ref('')
const bulkUrls = ref('')
const showBulkInput = ref(false)

const quickUrls = [
  {
    name: 'Wikipedia Article',
    url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
    icon: 'mdi:wikipedia'
  },
  {
    name: 'Research Paper',
    url: 'https://arxiv.org/abs/2301.00001',
    icon: 'mdi:file-document'
  },
  {
    name: 'News Article',
    url: 'https://news.example.com/article',
    icon: 'mdi:newspaper'
  }
]

const isValidUrl = computed(() => {
  if (!urlInput.value) return false
  try {
    new URL(urlInput.value)
    return true
  } catch {
    return false
  }
})

const validBulkUrls = computed(() => {
  if (!bulkUrls.value) return []
  
  return bulkUrls.value
    .split('\n')
    .map(url => url.trim())
    .filter(url => {
      if (!url) return false
      try {
        new URL(url)
        return true
      } catch {
        return false
      }
    })
})

const addUrl = () => {
  if (!isValidUrl.value) return
  
  emit('url-added', urlInput.value)
  urlInput.value = ''
}

const addBulkUrls = () => {
  validBulkUrls.value.forEach(url => {
    emit('url-added', url)
  })
  
  bulkUrls.value = ''
  showBulkInput.value = false
}
</script>