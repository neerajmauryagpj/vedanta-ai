import type { Source } from '~/types/dashboard'

export const useFileProcessor = () => {
  const sources = ref<Source[]>([])
  const nextId = ref(1)

  // Add a new source
  const addSource = (type: 'file' | 'url', name: string, size: number) => {
    const source: Source = {
      id: nextId.value++,
      type,
      name,
      size,
      status: 'processing',
      progress: 0,
      addedAt: new Date(),
      priority: 'normal',
      mode: 'full'
    }
    
    sources.value.unshift(source)
    simulateProcessing(source.id)
    return source.id
  }

  // Simulate processing with realistic progress
  const simulateProcessing = (id: number) => {
    const source = sources.value.find(s => s.id === id)
    if (!source) return

    let progress = 0
    const processingSteps = [
      'Initializing...',
      'Analyzing content...',
      'Extracting features...',
      'Training model...',
      'Finalizing...'
    ]
    
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5 // 5-20% per step
      source.progress = Math.min(progress, 100)
      
      // Update processing step
      const stepIndex = Math.floor(source.progress / 20)
      source.currentStep = processingSteps[Math.min(stepIndex, processingSteps.length - 1)]
      
      if (progress >= 100) {
        clearInterval(interval)
        // 85% success rate
        source.status = Math.random() > 0.15 ? 'completed' : 'failed'
        source.progress = 100
        source.completedAt = new Date()
        
        if (source.status === 'completed') {
          source.confidence = Math.floor(Math.random() * 20) + 80 // 80-100%
        }
      }
    }, 300 + Math.random() * 700) // Variable speed
  }

  // Retry processing for failed sources
  const retrySource = (id: number) => {
    const source = sources.value.find(s => s.id === id)
    if (source && source.status === 'failed') {
      source.status = 'processing'
      source.progress = 0
      source.retryCount = (source.retryCount || 0) + 1
      simulateProcessing(id)
    }
  }

  // Remove source
  const removeSource = (id: number) => {
    const index = sources.value.findIndex(s => s.id === id)
    if (index > -1) {
      sources.value.splice(index, 1)
    }
  }

  // Clear all sources
  const clearAllSources = () => {
    sources.value = []
    nextId.value = 1
  }

  // Pause/Resume processing
  const pauseSource = (id: number) => {
    const source = sources.value.find(s => s.id === id)
    if (source) {
      source.paused = !source.paused
    }
  }

  // Bulk operations
  const retryAllFailed = () => {
    sources.value
      .filter(s => s.status === 'failed')
      .forEach(s => retrySource(s.id))
  }

  const pauseAllProcessing = () => {
    sources.value
      .filter(s => s.status === 'processing')
      .forEach(s => pauseSource(s.id))
  }

  // Statistics
  const stats = computed(() => {
    const total = sources.value.length
    const completed = sources.value.filter(s => s.status === 'completed').length
    const processing = sources.value.filter(s => s.status === 'processing').length
    const failed = sources.value.filter(s => s.status === 'failed').length
    const paused = sources.value.filter(s => s.paused).length
    
    return {
      total,
      completed,
      processing,
      failed,
      paused,
      successRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      averageProcessingTime: calculateAverageProcessingTime()
    }
  })

  const calculateAverageProcessingTime = () => {
    const completedSources = sources.value.filter(s => 
      s.status === 'completed' && s.completedAt && s.addedAt
    )
    
    if (completedSources.length === 0) return 0
    
    const totalTime = completedSources.reduce((sum, source) => {
      const duration = source.completedAt!.getTime() - source.addedAt.getTime()
      return sum + duration
    }, 0)
    
    return Math.round(totalTime / completedSources.length / 1000 / 60 * 10) / 10 // minutes
  }

  return {
    sources: readonly(sources),
    stats,
    addSource,
    removeSource,
    retrySource,
    clearAllSources,
    pauseSource,
    retryAllFailed,
    pauseAllProcessing
  }
}