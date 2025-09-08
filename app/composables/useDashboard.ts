import type { DashboardStats, ActivityItem, AIInsight, SystemStats, ProcessingSettings } from '~/types/dashboard'

export const useDashboard = () => {
  const { sources, stats: processingStats } = useFileProcessor()
  
  // Enhanced dashboard stats
  const stats = computed<DashboardStats>(() => ({
    totalSources: processingStats.value.total,
    processed: processingStats.value.completed,
    processing: processingStats.value.processing,
    failed: processingStats.value.failed,
    totalStorage: calculateTotalStorage(),
    avgProcessingTime: processingStats.value.averageProcessingTime,
    successRate: processingStats.value.successRate,
    activeUsers: 156 // Mock data
  }))

  // Recent activity with real data
  const recentActivity = computed<ActivityItem[]>(() => {
    return sources.value
      .slice(0, 10)
      .map(source => ({
        id: source.id,
        action: getActionDescription(source),
        file: source.name,
        time: getRelativeTime(source.addedAt),
        status: source.status,
        user: 'Current User'
      }))
  })

  // System monitoring
  const systemStats = ref<SystemStats>({
    cpu: 45,
    memory: 32,
    storage: 67,
    network: 12,
    temperature: 58
  })

  // AI-generated insights
  const aiInsights = ref<AIInsight[]>([
    {
      id: 1,
      type: 'positive',
      icon: 'mdi:trending-up',
      title: 'Processing Efficiency Improved',
      description: 'Your processing speed has increased by 23% this week due to optimized algorithms.',
      time: '2 hours ago',
      actionable: false
    },
    {
      id: 2,
      type: 'warning',
      icon: 'mdi:alert-triangle',
      title: 'Queue Bottleneck Detected',
      description: 'Large files are causing delays. Consider processing during off-peak hours.',
      time: '4 hours ago',
      actionable: true,
      action: () => console.log('Optimize queue')
    }
  ])

  // Processing settings
  const processingSettings = ref<ProcessingSettings>({
    concurrentTasks: 4,
    priorityMode: 'priority',
    autoRetry: true,
    maxRetries: 3,
    timeout: 300000, // 5 minutes
    enableNotifications: true
  })

  // Real-time updates
  onMounted(() => {
    // Update system stats every 5 seconds
    setInterval(() => {
      updateSystemStats()
    }, 5000)

    // Generate new insights periodically
    setInterval(() => {
      generateNewInsight()
    }, 60000) // Every minute
  })

  const calculateTotalStorage = () => {
    const totalBytes = sources.value.reduce((sum, source) => sum + source.size, 0)
    const gb = totalBytes / (1024 ** 3)
    return `${gb.toFixed(1)} GB`
  }

  const getActionDescription = (source: Source) => {
    switch (source.status) {
      case 'completed':
        return `Successfully processed ${source.type}`
      case 'processing':
        return `Processing ${source.type}`
      case 'failed':
        return `Failed to process ${source.type}`
      default:
        return `Added ${source.type} to queue`
    }
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} min ago`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
    return `${Math.floor(minutes / 1440)}d ago`
  }

  const updateSystemStats = () => {
    // Simulate realistic system stats fluctuation
    systemStats.value.cpu = Math.max(10, Math.min(90, 
      systemStats.value.cpu + (Math.random() - 0.5) * 20
    ))
    systemStats.value.memory = Math.max(20, Math.min(80, 
      systemStats.value.memory + (Math.random() - 0.5) * 10
    ))
    systemStats.value.storage = Math.max(50, Math.min(95, 
      systemStats.value.storage + (Math.random() - 0.5) * 5
    ))
  }

  const generateNewInsight = () => {
    const insights = [
      {
        type: 'info' as const,
        icon: 'mdi:information',
        title: 'Usage Pattern Detected',
        description: 'You tend to process more documents on weekdays between 9-11 AM.',
        actionable: false
      },
      {
        type: 'positive' as const,
        icon: 'mdi:check-circle',
        title: 'Quality Improvement',
        description: 'Processing accuracy has improved by 5% with recent algorithm updates.',
        actionable: false
      }
    ]

    if (Math.random() > 0.7 && aiInsights.value.length < 5) {
      const newInsight = insights[Math.floor(Math.random() * insights.length)]
      aiInsights.value.unshift({
        ...newInsight,
        id: Date.now(),
        time: 'Just now'
      })
    }
  }

  const exportReport = async (timeRange: string) => {
    // Simulate report generation
    console.log(`Generating report for ${timeRange}...`)
    
    const reportData = {
      timeRange,
      stats: stats.value,
      sources: sources.value,
      insights: aiInsights.value,
      systemStats: systemStats.value,
      generatedAt: new Date()
    }

    // In a real app, this would generate and download a PDF/CSV
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-learning-report-${timeRange}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return {
    stats: readonly(stats),
    recentActivity: readonly(recentActivity),
    systemStats: readonly(systemStats),
    aiInsights,
    processingSettings,
    sources,
    exportReport,
    generateNewInsight
  }
}