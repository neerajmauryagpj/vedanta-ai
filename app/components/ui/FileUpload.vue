<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
    <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
      <Icon name="mdi:upload" class="mr-3 text-purple-400" />
      Upload Documents
    </h3>
    
    <div 
      class="border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer"
      :class="isDragging ? 'border-purple-400 bg-purple-400/10' : 'border-purple-400/50 hover:border-purple-400 hover:bg-purple-400/5'"
      @click="$refs.fileInput.click()"
      @dragover.prevent="handleDragOver"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <input 
        ref="fileInput" 
        type="file" 
        multiple 
        accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx"
        @change="handleFileSelect" 
        class="hidden"
      >
      
      <div class="space-y-4">
        <div class="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center">
          <Icon name="mdi:cloud-upload" class="w-8 h-8 text-purple-400" />
        </div>
        
        <div>
          <p class="text-white font-medium mb-2">
            {{ isDragging ? 'Drop files here!' : 'Drop files here or click to browse' }}
          </p>
          <p class="text-gray-400 text-sm">
            Supports PDF, DOC, DOCX, TXT, MD, CSV, XLSX (Max 10MB each)
          </p>
        </div>
        
        <!-- Upload Progress -->
        <div v-if="uploadProgress.length > 0" class="mt-4 space-y-2">
          <div v-for="progress in uploadProgress" :key="progress.id" class="text-left">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-300 truncate">{{ progress.name }}</span>
              <span class="text-gray-400">{{ progress.percent }}%</span>
            </div>
            <div class="bg-white/10 rounded-full h-1.5">
              <div 
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
                :style="`width: ${progress.percent}%`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-4 grid grid-cols-2 gap-3">
      <button 
        @click="$refs.fileInput.click()"
        class="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
      >
        <Icon name="mdi:file-plus" class="w-4 h-4 mr-2" />
        Select Files
      </button>
      
      <button 
        @click="openFolderUpload"
        class="flex items-center justify-center px-4 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
      >
        <Icon name="mdi:folder-upload" class="w-4 h-4 mr-2" />
        Upload Folder
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['files-added'])

const isDragging = ref(false)
const uploadProgress = ref([])
const dragCounter = ref(0)

const handleDragEnter = (e) => {
  dragCounter.value++
  isDragging.value = true
}

const handleDragLeave = (e) => {
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

const handleDragOver = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}

const handleDrop = (e) => {
  isDragging.value = false
  dragCounter.value = 0
  
  const files = Array.from(e.dataTransfer.files)
  processFiles(files)
}

const handleFileSelect = (e) => {
  const files = Array.from(e.target.files)
  processFiles(files)
}

const processFiles = (files) => {
  const validFiles = files.filter(file => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const validTypes = ['.pdf', '.doc', '.docx', '.txt', '.md', '.csv', '.xlsx']
    const extension = '.' + file.name.split('.').pop().toLowerCase()
    
    return file.size <= maxSize && validTypes.includes(extension)
  })
  
  if (validFiles.length > 0) {
    simulateUpload(validFiles)
    emit('files-added', validFiles)
  }
}

const simulateUpload = (files) => {
  files.forEach(file => {
    const progressItem = {
      id: Math.random(),
      name: file.name,
      percent: 0
    }
    
    uploadProgress.value.push(progressItem)
    
    const interval = setInterval(() => {
      progressItem.percent += Math.random() * 25
      if (progressItem.percent >= 100) {
        progressItem.percent = 100
        clearInterval(interval)
        
        // Remove from progress after delay
        setTimeout(() => {
          uploadProgress.value = uploadProgress.value.filter(p => p.id !== progressItem.id)
        }, 1000)
      }
    }, 200)
  })
}

const openFolderUpload = () => {
  // Note: Folder upload requires webkitdirectory attribute
  const input = document.createElement('input')
  input.type = 'file'
  input.webkitdirectory = true
  input.multiple = true
  input.onchange = (e) => {
    const files = Array.from(e.target.files)
    processFiles(files)
  }
  input.click()
}
</script>