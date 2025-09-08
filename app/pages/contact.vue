<template>
  <NuxtLayout name="default">
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="mt-1  px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="4"
          class="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>
  </div>
  </NuxtLayout>
</template>

<script setup>
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // Handle form submission here
  console.log('Form submitted:', formData.value)
  // Reset form
  formData.value = {
    name: '',
    email: '',
    message: ''
  }
}
</script>