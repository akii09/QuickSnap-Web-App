<script>
import nuxtStorage from 'nuxt-storage';
export default {
    data() {
        return {
            show_credit: false
        }
    },
    computed:{
        is_logged_in(){
            return nuxtStorage.localStorage.getData('qs_token');
        }
    },
    methods: {
        handleClose() {
            this.show_credit = false;
        },
        logoutApp() {
            if (nuxtStorage.localStorage.getData('qs_token')) {
                if (confirm("Are you sure you want to log out?")) {
                    nuxtStorage.localStorage.removeItem('qs_token'); // Assuming nuxtStorage is globally available
                    window.location.reload();
                    // this.$router.push({ path: '/login' }); // Assuming you're using Vue Router
                } else {
                    ElMessage({
                        type: 'info',
                        message: 'Logout canceled. 😅',
                    });
                }
            } else {
                window.location.href = '/login';
            }
        },
    },
}
</script>

<template>
    <div class="bg-transparent">
        <div class="h-20 container mx-auto mb-6 py-5 qs-header">
            <a class="flex items-center cursor-pointer" target="_blank"
                href="https://chrome.google.com/webstore/detail/quick-snap-app/ddacdbcbmgmgjfdncmgjbcciglehcioo#:~:text=%F0%9F%9A%80%20QuickSnap%20Chrome%20Extension%20%F0%9F%93%B8,%2C%20colleagues%2C%20or%20social%20media.">
                <img style="width: 28px;" src="../assets/img/logo/screenshot.png" alt="Q" srcset="">
                <h1 class="text-white ml-2 font-semibold"> QuickSnap </h1>
            </a>
            <div class="flex items-center space-x-6">
                <a v-if="!is_logged_in" href="/" class="text-white">🏠️ Home</a>
                <a v-if="is_logged_in" href="/snaps" class="text-white">📸 Snaps</a>
                <a href="#" class="text-white" @click="show_credit = true">🌟 Credits</a>
                <a href="/docs" class="text-white">📚 Docs</a>
                <a href="https://www.buymeacoffee.com/akii09" class="text-white">☕ Buy me a coffee</a>
                <a href="#">
                    <svg @click="logoutApp()" style="width: 25px; color: #a09f9f;" viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                        <path fill="currentColor"
                            d="M118.656 438.656a32 32 0 0 1 0-45.248L416 96l4.48-3.776A32 32 0 0 1 461.248 96l3.712 4.48a32.064 32.064 0 0 1-3.712 40.832L218.56 384H928a32 32 0 1 1 0 64H141.248a32 32 0 0 1-22.592-9.344zM64 608a32 32 0 0 1 32-32h786.752a32 32 0 0 1 22.656 54.592L608 928l-4.48 3.776a32.064 32.064 0 0 1-40.832-49.024L805.632 640H96a32 32 0 0 1-32-32z">
                        </path>
                    </svg>
                </a>
            </div>
            <!-- Image dialog -->
            <client-only>
                <el-dialog v-model="show_credit" customClass="qs-dark-theme" :title="'🙌  With Immense Gratitude To:'"
                    width="35%" :before-close="handleClose">
                    <div class="bg-gray-900 text-white">
                        <!-- <p class="text-2xl mb-4">🙌 With Immense Gratitude To:</p> -->
                        <ul class="list-disc ml-6 space-y-2">
                            <li>
                                <a href="https://imgur.com/" target="_blank" class="hover:underline">
                                    🖼️ Imgur for image hosting - Keeping our visuals flying high!
                                </a>
                            </li>
                            <li>
                                <a href="https://supabase.com/" target="_blank" class="hover:underline">
                                    🚀 Supabase for DB superpowers - Fueling our data-driven dreams!
                                </a>
                            </li>
                            <li>
                                <a href="https://nuxt.com/" target="_blank" class="hover:underline">
                                    🏗️ Nuxt.js for frontend magic - Weaving wonders into our web!
                                </a>
                            </li>
                            <li>
                                <a href="https://element-plus.org/" target="_blank" class="hover:underline">
                                    ✨ Element Plus for UI brilliance - Making our interface sparkle!
                                </a>
                            </li>
                            <li>
                                ChatGPT - 🤖 Our guiding light for resources, learning, and research!
                            </li>
                            <li>
                                <a href="https://github.com/" target="_blank" class="hover:underline">
                                    🐙 Github for versioning harmony - Keeping us in sync across time and space!
                                </a>
                            </li>
                        </ul>
                        <p class="mt-4">Thank you all for making our journey a blast! 🎉</p>
                    </div>
                </el-dialog>
            </client-only>
            <!-- Image dialog -->
        </div>
    </div>
</template>

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
</style>