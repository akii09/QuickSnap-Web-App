<template>
    <div class="bg-black min-h-screen flex items-center justify-center">
        <div class="bg-gray-900 p-8 rounded-lg shadow-md w-full sm:w-96">
            <h1 class="text-2xl font-semibold text-white mb-4">Login</h1>
            <input v-model="token" class="bg-gray-800 text-white px-4 py-2 w-full rounded-md mb-4"
                placeholder="Enter Token" />
            <button class="bg-qs-color text-white px-4 py-2 w-full rounded-md">Login</button>
        </div>
    </div>
</template>
  
<script setup>
const token = ref('');
</script>
  
  