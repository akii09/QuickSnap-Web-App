<template>
    <div class="bg-black min-h-screen flex items-center justify-center">
        <div class="bg-gray-900 p-8 rounded-lg shadow-md w-full sm:w-96">
            <h1 class="text-2xl font-semibold text-white mb-4">Login</h1>
            <input v-model="token" class="bg-gray-800 text-white px-4 py-2 w-full rounded-md mb-4"
                placeholder="Enter Token" />
            <button @click="saveQsToken" class="bg-qs-color text-white px-4 py-2 w-full rounded-md">Login</button>
        </div>
    </div>
</template>
  
<script>
import validateToken from '../utils/validateToken';
import nuxtStorage from 'nuxt-storage';
export default {
    data() {
        return {
            token: '',
            client_id: '592d7cf9cad8076'
        }
    },
    methods: {
        saveQsToken() {
            if (this.token) {
                validateToken(this.token, this.client_id)
                    .then(isAvailable => {
                        if (isAvailable) {
                             // Store the token in localStorage with an expiration time of 72 hours
                            nuxtStorage.localStorage.setData('qs_token', this.token, 72, 'h');
                            // Redirect to dashboard and fetch images
                            this.$router.push({ path: '/' });
                        } else {
                            console.log('Album is not available on Imgur.');
                            alert('Please enter valid token')
                        }
                    });
            }
        }
    },
}
</script>
  
  