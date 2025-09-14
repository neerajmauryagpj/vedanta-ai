interface User {
  id: number
  name: string
  email: string
}

interface UserState {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)
  const loading = ref(false)

  const userDisplayName = computed(() => {
    return user.value ? user.value.name : 'Guest'
  })

  async function login(email: string, password: string) {
    loading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      user.value = {
        id: 1,
        name: 'John Doe',
        email: email
      }
      isLoggedIn.value = true
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
  }

  function updateUser(userData: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...userData }
    }
  }

  return {
    user: readonly(user),
    isLoggedIn: readonly(isLoggedIn),
    loading: readonly(loading),
    userDisplayName,
    login,
    logout,
    updateUser
  }
})
