<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
  >
    <header class="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between space-x-3">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg flex items-center justify-center"
            >
              <Icon name="mdi:brain" class="text-white text-xl" />
            </div>
            <h1 class="text-3xl font-bold text-white">Vedanta AI</h1>
          </div>
          <nav class="hidden md:flex space-x-6">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
              Home
            </NuxtLink>
            <NuxtLink to="/dashboard" class="text-gray-700 hover:text-blue-600">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/chat" class="text-gray-700 hover:text-blue-600">
              Learning Content
            </NuxtLink>
            <NuxtLink to="/chat" class="text-gray-700 hover:text-blue-600">
              Chat Preview
            </NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-600">
              Contact
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
