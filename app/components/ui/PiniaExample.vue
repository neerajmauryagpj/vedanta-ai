<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4">
    <h2 class="text-2xl font-bold text-gray-900">Pinia Store Example</h2>
    
    <!-- Counter Store Example -->
    <div class="border rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-2">Counter Store</h3>
      <p class="text-gray-600 mb-2">Count: {{ counterStore.count }}</p>
      <p class="text-gray-600 mb-2">Doubled: {{ counterStore.doubledCount }}</p>
      <p class="text-gray-600 mb-4">Name: {{ counterStore.name }}</p>
      
      <div class="flex gap-2">
        <button 
          @click="counterStore.increment()"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
        <button 
          @click="counterStore.decrement()"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <button 
          @click="counterStore.reset()"
          class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- User Store Example -->
    <div class="border rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-2">User Store</h3>
      <p class="text-gray-600 mb-2">Welcome, {{ userStore.userDisplayName }}!</p>
      <p class="text-gray-600 mb-4">Status: {{ userStore.isLoggedIn ? 'Logged In' : 'Not Logged In' }}</p>
      
      <div v-if="!userStore.isLoggedIn" class="space-y-2">
        <input 
          v-model="email"
          type="email" 
          placeholder="Email"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <input 
          v-model="password"
          type="password" 
          placeholder="Password"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button 
          @click="handleLogin"
          :disabled="userStore.loading"
          class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {{ userStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>
      
      <div v-else class="space-y-2">
        <p class="text-sm text-gray-600">Email: {{ userStore.user?.email }}</p>
        <button 
          @click="userStore.logout()"
          class="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const counterStore = useCounterStore()
const userStore = useUserStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await userStore.login(email.value, password.value)
  if (userStore.isLoggedIn) {
    email.value = ''
    password.value = ''
  }
}
</script>
