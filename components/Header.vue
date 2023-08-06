

<script>
import nuxtStorage from 'nuxt-storage';
export default {
    data() {
        return {
            show_credit: false
        }
    },
    methods: {
        handleClose() {
            this.show_credit = false;
        },
        logoutApp() {
            if (confirm("Are you sure you want to log out?")) {
                nuxtStorage.localStorage.removeItem('qs_token'); // Assuming nuxtStorage is globally available
                this.$router.push({ path: '/login' }); // Assuming you're using Vue Router
            } else {
                ElMessage({
                    type: 'info',
                    message: 'Logout canceled. 😅',
                });
            }
        },
    },
}
</script>

<template>
    <div class="flex justify-between items-center mb-6 py-3">
        <a class="flex cursor-pointer" target="_blank"
            href="https://chrome.google.com/webstore/detail/quick-snap-app/ddacdbcbmgmgjfdncmgjbcciglehcioo#:~:text=%F0%9F%9A%80%20QuickSnap%20Chrome%20Extension%20%F0%9F%93%B8,%2C%20colleagues%2C%20or%20social%20media.">
            <img width="28px" src="../assets/img/logo/screenshot.png" alt="Q" srcset="">
            <h1 class="text-white ml-2 font-semibold"> QuickSnap </h1>
        </a>
        <div class="flex items-center space-x-6">
            <a href="#" class="text-white" @click="show_credit = true">🌟 Credits</a>
            <a href="#" class="text-white">📚 Docs</a>
            <a href="#" class="text-white">☕ Buy me a coffee</a>
            <a href="#">
                <svg @click="logoutApp()" style="width: 25px; color: #a09f9f;" viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                    <path fill="currentColor"
                        d="M352 159.872V230.4a352 352 0 1 0 320 0v-70.528A416.128 416.128 0 0 1 512 960a416 416 0 0 1-160-800.128z">
                    </path>
                    <path fill="currentColor" d="M512 64q32 0 32 32v320q0 32-32 32t-32-32V96q0-32 32-32z"></path>
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
                            <a href="https://imgur.com/" class="hover:underline">
                                🖼️ Imgur for image hosting - Keeping our visuals flying high!
                            </a>
                        </li>
                        <li>
                            <a href="https://supabase.com/" class="hover:underline">
                                🚀 Supabase for DB superpowers - Fueling our data-driven dreams!
                            </a>
                        </li>
                        <li>
                            <a href="https://nuxt.com/" class="hover:underline">
                                🏗️ Nuxt.js for frontend magic - Weaving wonders into our web!
                            </a>
                        </li>
                        <li>
                            <a href="https://element-plus.org/" class="hover:underline">
                                ✨ Element Plus for UI brilliance - Making our interface sparkle!
                            </a>
                        </li>
                        <li>
                            ChatGPT - 🤖 Our guiding light for resources, learning, and research!
                        </li>
                        <li>
                            <a href="https://github.com/" class="hover:underline">
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
</template>

<style lang="scss" scoped></style>