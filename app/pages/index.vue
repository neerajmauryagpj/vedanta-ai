<template>
  <NuxtLayout name="default">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Upload Section -->
        <div class="lg:col-span-2">
          <SectionsChatSection />
        </div>

        <!-- Sidebar Section -->
        <div class="lg:col-span-1">
          <SidebarChatSection />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
