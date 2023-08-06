

<script>
export default {
    data() {
        return {
            show_credit: false
        }
    },
    methods: {
        handleClose() {
            this.show_credit = false;
        }
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
            <a href="#" class="text-white">☕ Buy me coffee</a>
            <a href="#">
                <svg viewBox="0 0 1024 1024" style="width: 25px; color: #a09f9f;" xmlns="http://www.w3.org/2000/svg"
                    data-v-ea893728="">
                    <path fill="currentColor"
                        d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z">
                    </path>
                </svg>
            </a>
        </div>
        <!-- Image dialog -->
        <client-only>
            <el-dialog v-model="show_credit" customClass="qs-dark-theme" :title="'🙌  With Immense Gratitude To:'" width="35%" :before-close="handleClose">
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