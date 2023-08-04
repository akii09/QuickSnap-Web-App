

<script>
import nuxtStorage from 'nuxt-storage';
export default {
  data() {
    return {
      show_dashboard: false,
      images: []
    }
  },
  created() {
    this.authenticateUser();
  },
  methods: {
    authenticateUser() {
      const qsToken = this.$route.query.qs_token;
      if (qsToken) {
        // Store the token in localStorage with an expiration time of 72 hours
        nuxtStorage.localStorage.setData('qs_token', qsToken, 72, 'h');
        // Redirect to dashboard and fetch images
        this.$router.push({ path: '/' });
        this.getImagesFromServer();
      } else if (nuxtStorage.localStorage.getData('qs_token')) {
        this.$router.push({ path: '/' });
        this.getImagesFromServer();
      } else {
        this.$router.push({ path: '/login' });
      }
    },
    getImagesFromServer() {
      const clientID = '592d7cf9cad8076';
      const qs_token = nuxtStorage.localStorage.getData('qs_token');
      const apiUrl = `https://api.imgur.com/3/album/${qs_token}/images`;
      const headers = new Headers();
      headers.append("Authorization", `Client-ID ${clientID}`);
      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const images = data.data;
            console.log("Images in the album:", images);
          } else {
            console.error("Failed to get images from the album:", data);
          }
        })
        .catch((error) => {
          console.error("An error occurred while fetching images from the album:", error);
        });
    },
    deleteImage() {
      alert('Image')
    }
  },
}
</script>

<template>
  <div class="container mx-auto">
    <div v-if="show_dashboard" class="px-4 py-6">
      <Header />
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        <div v-for="image in images" :key="image.id" class="dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <img :src="image.url" alt="Image" class="w-full h-40 object-cover rounded-md mb-4">
          <div class="text-xl font-semibold mb-2">{{ image.name }}</div>
          <button @click="deleteImage(image.id)" class="bg-qs-color text-white px-4 py-2 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-white text-lg mt-96">
        Please wait...
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>