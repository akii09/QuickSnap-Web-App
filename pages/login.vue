<template>
    <div class="bg-gray-900 min-h-screen flex items-center justify-center">
        <div class="bg-gray-800 p-8 rounded-lg shadow-md w-full sm:w-96">
            <h1 class="text-2xl font-semibold text-white mb-4">Login</h1>
            <input v-model="token" required class="bg-gray-700 text-white px-4 py-2 w-full rounded-md mb-4"
                placeholder="Enter Token" />
            <button @click="saveQsToken" class="bg-qs-color text-white px-4 py-2 w-full rounded-md mb-4">Login</button>

            <a class="cursor-pointer text-white text-sm font-semibold text-underline" @click="show_info = true">How to get
                token ?</a>
        </div>
    </div>
    <client-only>
        <el-dialog v-model="show_info" customClass="qs-dark-theme" title="🔑 How to Get Your Token?" width="65%">
            <div class="qs-info-dialog">
                <p class="text-white mb-2">It's a Breeze! 🌬️</p>
                <p class="text-white">1. Click on the extension's settings icon</p>
                <img style="width: 950px; display: block; margin: 30px auto;" src="https://i.imgur.com/BVxpq0J.png" alt="" srcset="">
                <p class="text-white mb-2">You're on Fire! 🎉</p>
                <p class="text-white">2. Now, copy that shiny token and put it to use... 🚀 *Pssst: If you haven't got a token yet, generate one effortlessly. To do so, fill in the form details... easy peasy! 📝</p>
                <img style="width: 950px; display: block; margin: 30px auto;" src="https://i.imgur.com/8Xabuzh.png" alt="" srcset="">
            </div>
        </el-dialog>

    </client-only>
</template>
  
<script>
import validateToken from '../utils/validateToken';
import nuxtStorage from 'nuxt-storage';
export default {
    data() {
        return {
            token: '',
            client_id: '592d7cf9cad8076',
            show_info: false
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
                            ElMessage({
                                type: 'error',
                                message: 'Please enter valid token',
                            });
                            // alert('Please enter valid token')
                        }
                    });
            } else {
                ElMessage({
                    type: 'error',
                    message: 'Please enter token',
                });
            }
        }
    },
}
</script>
<style>
.qs-dark-theme {
    background-color: #111827;
}

.qs-dark-theme .el-notification__title {
    color: #fff !important;
}

.qs-dark-theme .el-message-box__title {
    color: #fff !important;
}

.qs-dark-theme .el-notification__content p {
    color: #fff !important;
}

.qs-dark-theme .el-message-box__message p {
    color: #fff !important;
}

.qs-dark-theme .el-dialog__title {
    color: #fff !important;
}
.qs-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.qs-info-dialog{
    height: 60vh;
    overflow-y: scroll;
}
</style>
  