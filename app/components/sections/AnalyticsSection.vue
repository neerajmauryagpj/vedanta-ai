<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-white">Analytics & Insights</h2>
        <p class="text-gray-400 mt-2">Deep insights into your AI learning performance</p>
      </div>
      <div class="flex items-center space-x-3">
        <select
          v-model="timeRange"
          class="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 3 months</option>
        </select>
        <button class="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
          <Icon name="mdi:download" class="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UiStatCard
        title="Processing Speed"
        value="3.2 min"
        change="-15%"
        changeType="decrease"
        icon="mdi:speedometer"
        iconBg="bg-green-500/20"
        iconColor="text-green-400"
      />
      <UiStatCard
        title="Success Rate"
        value="94.2%"
        change="+2.1%"
        icon="mdi:target"
        iconBg="bg-blue-500/20"
        iconColor="text-blue-400"
      />
      <UiStatCard
        title="Data Processed"
        value="847 MB"
        change="+34%"
        icon="mdi:database"
        iconBg="bg-purple-500/20"
        iconColor="text-purple-400"
      />
      <UiStatCard
        title="Cost Savings"
        value="$1,247"
        change="+18%"
        icon="mdi:currency-usd"
        iconBg="bg-emerald-500/20"
        iconColor="text-emerald-400"
      />
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Processing Trends -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="mdi:chart-line" class="mr-3 text-blue-400" />
          Processing Trends
        </h3>
        <ChartsActivityChart :data="processingTrends" />
      </div>

      <!-- File Types Distribution -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="mdi:chart-donut" class="mr-3 text-purple-400" />
          File Types
        </h3>
        <ChartsProcessingChart :data="fileTypeDistribution" />
      </div>

      <!-- Performance Metrics -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="mdi:gauge" class="mr-3 text-green-400" />
          Performance Metrics
        </h3>
        <div class="space-y-6">
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-300">Average Processing Time</span>
              <span class="text-white">3.2 min</span>
            </div>
            <div class="bg-white/10 rounded-full h-2">
              <div class="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full w-3/4"></div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-300">Resource Utilization</span>
              <span class="text-white">67%</span>
            </div>
            <div class="bg-white/10 rounded-full h-2">
              <div class="bg-gradient-to-r from-blue-400 to-cyan-500 h-full rounded-full w-2/3"></div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-300">Error Rate</span>
              <span class="text-white">2.3%</span>
            </div>
            <div class="bg-white/10 rounded-full h-2">
              <div class="bg-gradient-to-r from-red-400 to-pink-500 h-full rounded-full w-1/12"></div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-300">Queue Efficiency</span>
              <span class="text-white">89%</span>
            </div>
            <div class="bg-white/10 rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-400 to-pink-500 h-full rounded-full w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Insights -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="mdi:lightbulb" class="mr-3 text-yellow-400" />
          AI Insights
        </h3>
        <div class="space-y-4">
          <div 
            v-for="insight in aiInsights" 
            :key="insight.id"
            class="p-4 rounded-lg border border-white/10"
            :class="insight.type === 'positive' ? 'bg-green-500/10' : insight.type === 'warning' ? 'bg-yellow-500/10' : 'bg-blue-500/10'"
          >
            <div class="flex items-start space-x-3">
              <Icon 
                :name="insight.icon" 
                class="w-5 h-5 mt-0.5 flex-shrink-0"
                :class="insight.type === 'positive' ? 'text-green-400' : insight.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'"
              />
              <div>
                <p class="text-white font-medium mb-1">{{ insight.title }}</p>
                <p class="text-gray-400 text-sm">{{ insight.description }}</p>
                <p class="text-xs text-gray-500 mt-2">{{ insight.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Analytics Table -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold text-white flex items-center">
          <Icon name="mdi:table" class="mr-3 text-indigo-400" />
          Detailed Analytics
        </h3>
        <div class="flex items-center space-x-3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm w-48"
          >
          <button class="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-400 hover:text-white">
            <Icon name="mdi:filter" class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-3 px-4 text-gray-300 font-medium">Source</th>
              <th class="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
              <th class="text-left py-3 px-4 text-gray-300 font-medium">Size</th>
              <th class="text-left py-3 px-4 text-gray-300 font-medium">Processing Time</th>
              <th class="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
              <th class="text-left py-3 px-4 text-gray-300 font-medium">Confidence</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in filteredAnalytics" 
              :key="item.id"
              class="border-b border-white/5 hover:bg-white/5"
            >
              <td class="py-3 px-4 text-white">{{ item.name }}</td>
              <td class="py-3 px-4 text-gray-400">{{ item.type }}</td>
              <td class="py-3 px-4 text-gray-400">{{ item.size }}</td>
              <td class="py-3 px-4 text-gray-400">{{ item.processingTime }}</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs" :class="getStatusClass(item.status)">
                  {{ item.status }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <div class="bg-white/10 rounded-full h-2 w-16">
                    <div 
                      class="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full"
                      :style="`width: ${item.confidence}%`"
                    ></div>
                  </div>
                  <span class="text-gray-400 text-xs">{{ item.confidence }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const timeRange = ref('30d')
const searchQuery = ref('')

const processingTrends = ref([
  { day: 'Mon', processed: 12, failed: 1 },
  { day: 'Tue', processed: 19, failed: 0 },
  { day: 'Wed', processed: 15, failed: 2 },
  { day: 'Thu', processed: 22, failed: 1 },
  { day: 'Fri', processed: 18, failed: 0 },
  { day: 'Sat', processed: 8, failed: 1 },
  { day: 'Sun', processed: 14, failed: 0 }
])

const fileTypeDistribution = ref([
  { name: 'PDF', value: 45, color: '#EF4444' },
  { name: 'DOCX', value: 30, color: '#3B82F6' },
  { name: 'TXT', value: 15, color: '#10B981' },
  { name: 'URLs', value: 10, color: '#F59E0B' }
])

const aiInsights = ref([
  {
    id: 1,
    type: 'positive',
    icon: 'mdi:trending-up',
    title: 'Processing Speed Improved',
    description: 'Your average processing time has decreased by 15% this week.',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'warning',
    icon: 'mdi:alert-triangle',
    title: 'High Memory Usage Detected',
    description: 'Consider optimizing large file processing to reduce memory consumption.',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'info',
    icon: 'mdi:information',
    title: 'New Pattern Discovered',
    description: 'PDF files process 20% faster when uploaded during off-peak hours.',
    time: '1 day ago'
  }
])

const analyticsData = ref([
  {
    id: 1,
    name: 'research_paper.pdf',
    type: 'PDF',
    size: '2.4 MB',
    processingTime: '2.1 min',
    status: 'completed',
    confidence: 94
  },
  {
    id: 2,
    name: 'article_url_1',
    type: 'URL',
    size: 'N/A',
    processingTime: '1.8 min',
    status: 'completed',
    confidence: 87
  },
  {
    id: 3,
    name: 'document.docx',
    type: 'DOCX',
    size: '1.2 MB',
    processingTime: '3.2 min',
    status: 'failed',
    confidence: 0
  }
])

const filteredAnalytics = computed(() => {
  if (!searchQuery.value) return analyticsData.value
  
  return analyticsData.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getStatusClass = (status) => {
  const classes = {
    completed: 'bg-green-500/20 text-green-400',
    processing: 'bg-yellow-500/20 text-yellow-400',
    failed: 'bg-red-500/20 text-red-400'
  }
  return classes[status] || 'bg-gray-500/20 text-gray-400'
}
</script>