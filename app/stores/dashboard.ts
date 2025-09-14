export type DashboardTab = 'overview' | 'upload' | 'processing' | 'analytics' | 'history' | 'settings'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const activeTab = ref<DashboardTab>('overview')
  const sidebarOpen = ref(false)
  
  // Actions
  function setActiveTab(tab: DashboardTab) {
    activeTab.value = tab
  }
  
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  function closeSidebar() {
    sidebarOpen.value = false
  }
  
  function openSidebar() {
    sidebarOpen.value = true
  }
  
  // Getters/Computed
  const isTabActive = computed(() => (tab: DashboardTab) => activeTab.value === tab)
  
  return {
    // State
    activeTab: activeTab,
    sidebarOpen: sidebarOpen,
    
    // Actions
    setActiveTab,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    
    // Getters
    isTabActive
  }
})
