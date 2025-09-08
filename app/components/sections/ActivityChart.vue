<template>
  <div class="w-full h-64">
    <canvas ref="chartCanvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const chartCanvas = ref(null)

onMounted(() => {
  drawChart()
})

watch(() => props.data, drawChart, { deep: true })

const drawChart = () => {
  if (!chartCanvas.value || !props.data.length) return
  
  const canvas = chartCanvas.value
  const ctx = canvas.getContext('2d')
  const rect = canvas.getBoundingClientRect()
  
  // Set canvas size
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = rect.height * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  
  // Clear canvas
  ctx.clearRect(0, 0, rect.width, rect.height)
  
  // Chart dimensions
  const padding = 40
  const chartWidth = rect.width - padding * 2
  const chartHeight = rect.height - padding * 2
  
  // Find max value for scaling
  const maxValue = Math.max(...props.data.map(d => Math.max(d.processed, d.failed)))
  const scaleY = chartHeight / maxValue
  const scaleX = chartWidth / (props.data.length - 1)
  
  // Draw grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 1
  
  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(rect.width - padding, y)
    ctx.stroke()
  }
  
  // Vertical grid lines
  props.data.forEach((_, i) => {
    const x = padding + scaleX * i
    ctx.beginPath()
    ctx.moveTo(x, padding)
    ctx.lineTo(x, rect.height - padding)
    ctx.stroke()
  })
  
  // Draw processed line
  ctx.strokeStyle = '#10B981'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  props.data.forEach((point, i) => {
    const x = padding + scaleX * i
    const y = rect.height - padding - (point.processed * scaleY)
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()
  
  // Draw failed line
  ctx.strokeStyle = '#EF4444'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  props.data.forEach((point, i) => {
    const x = padding + scaleX * i
    const y = rect.height - padding - (point.failed * scaleY)
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()
  
  // Draw points
  props.data.forEach((point, i) => {
    const x = padding + scaleX * i
    
    // Processed points
    const processedY = rect.height - padding - (point.processed * scaleY)
    ctx.fillStyle = '#10B981'
    ctx.beginPath()
    ctx.arc(x, processedY, 4, 0, Math.PI * 2)
    ctx.fill()
    
    // Failed points
    const failedY = rect.height - padding - (point.failed * scaleY)
    ctx.fillStyle = '#EF4444'
    ctx.beginPath()
    ctx.arc(x, failedY, 3, 0, Math.PI * 2)
    ctx.fill()
  })
  
  // Draw labels
  ctx.fillStyle = '#9CA3AF'
  ctx.font = '12px Inter'
  ctx.textAlign = 'center'
  
  props.data.forEach((point, i) => {
    const x = padding + scaleX * i
    ctx.fillText(point.day, x, rect.height - 10)
  })
  
  // Draw legend
  ctx.textAlign = 'left'
  ctx.fillStyle = '#10B981'
  ctx.fillRect(rect.width - 120, 20, 12, 3)
  ctx.fillText('Processed', rect.width - 100, 25)
  
  ctx.fillStyle = '#EF4444'
  ctx.fillRect(rect.width - 120, 35, 12, 2)
  ctx.fillText('Failed', rect.width - 100, 40)
}
</script>