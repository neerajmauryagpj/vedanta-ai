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
  // Simple canvas-based donut chart
  drawChart()
})



const drawChart = () => {
  if (!chartCanvas.value || !props.data.length) return
  
  const canvas = chartCanvas.value
  const ctx = canvas.getContext('2d')
  const rect = canvas.getBoundingClientRect()
  
  // Set canvas size
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = rect.height * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const radius = Math.min(centerX, centerY) - 20
  const innerRadius = radius * 0.6
  
  // Clear canvas
  ctx.clearRect(0, 0, rect.width, rect.height)
  
  // Calculate total
  const total = props.data.reduce((sum, item) => sum + item.value, 0)
  
  // Draw segments
  let currentAngle = -Math.PI / 2
  
  props.data.forEach((item, index) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI
    
    // Draw outer arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true)
    ctx.closePath()
    ctx.fillStyle = item.color
    ctx.fill()
    
    currentAngle += sliceAngle
  })
  watch(() => props.data, drawChart, { deep: true })
  // Draw center text
  ctx.fillStyle = '#ffffff'
  ctx.font = '18px Inter'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(total.toString(), centerX, centerY - 10)
  
  ctx.font = '12px Inter'
  ctx.fillStyle = '#9CA3AF'
  ctx.fillText('Total Sources', centerX, centerY + 10)
}
</script>