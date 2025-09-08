export interface Source {
  id: number
  type: 'file' | 'url'
  name: string
  size: number
  status: 'processing' | 'completed' | 'failed' | 'paused' | 'queued'
  progress: number
  addedAt: Date
  completedAt?: Date
  paused?: boolean
  priority?: 'low' | 'normal' | 'high'
  mode?: 'full' | 'quick' | 'custom'
  currentStep?: string
  confidence?: number
  retryCount?: number
  estimatedTime?: string
  errorMessage?: string
}

export interface DashboardStats {
  totalSources: number
  processed: number
  processing: number
  failed: number
  paused?: number
  totalStorage: string
  avgProcessingTime: string | number
  successRate: string | number
  activeUsers: number
}

export interface ActivityItem {
  id: number
  action: string
  file: string
  time: string
  status: 'completed' | 'processing' | 'failed'
  user?: string
  details?: string
}

export interface ChartData {
  name: string
  value: number
  color: string
}

export interface ProcessingTask {
  id: number
  name: string
  type: string
  progress: number
  step: string
  eta: string
  priority: 'low' | 'normal' | 'high'
  startedAt: Date
}

export interface SystemStats {
  cpu: number
  memory: number
  storage: number
  network?: number
  temperature?: number
}

export interface AIInsight {
  id: number
  type: 'positive' | 'warning' | 'info'
  icon: string
  title: string
  description: string
  time: string
  actionable?: boolean
  action?: () => void
}

export interface ProcessingSettings {
  concurrentTasks: number
  priorityMode: 'fifo' | 'priority' | 'size'
  autoRetry: boolean
  maxRetries: number
  timeout: number
  enableNotifications: boolean
}

export interface AnalyticsData {
  id: number
  name: string
  type: string
  size: string
  processingTime: string
  status: string
  confidence: number
  createdAt: Date
  completedAt?: Date
}