

<script>
import nuxtStorage from 'nuxt-storage';
export default {
  data() {
    return {
      show_dashboard: false,
      images: [],
      imgur_server_issue: false,
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
      this.getImagesFromImgurAlbum2(clientID,qs_token)
      this.getAlbums();
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
            if(data.status === 403) {
              this.imgur_server_issue = true;
            }
            console.error("Failed to get images from the album:", data);
          }
        })
        .catch((error) => {
          console.error("An error occurred while fetching images from the album:", error);
        });
    },
    getAlbums() {
      const clientId = "2aa42594970b8f4"; // Replace with your actual client ID
      const username = "akii09"; // Replace with the Imgur username of the user

      const apiUrl = `https://api.imgur.com/3/account/${username}/albums`;

      const headers = new Headers();
      headers.append("Authorization", `Client-ID ${clientId}`);

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // The albums data is available in data.data array
            const albums = data.data;
            console.log("User Albums:", albums);
          } else {
            console.error("Failed to fetch albums:", data);
          }
        })
        .catch((error) => {
          console.error("An error occurred while fetching albums:", error);
        });

    },
    deleteImage() {
      alert('Image')
    },
    async getImagesFromImgurAlbum(clientId, albumId) {
      const apiUrl = `https://api.imgur.com/3/album/${albumId}/images`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Client-ID ${clientId}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        const images = data.data.map(image => image.link);
        return images;
      } catch (error) {
        console.error('Error fetching images:', error.message);
        if(error.status === 403) {
          this.imgur_server_issue = true;
        }
        return [];
      }
    },
    async getImagesFromImgurAlbum2() {
      const albumHash = "2aa42594970b8f4"; // Replace with the hash of your newly created album

      const apiUrl = `https://api.imgur.com/3/album/${albumHash}/images`;

      const clientId = "592d7cf9cad8076"; // Replace with your actual client ID

      const headers = new Headers();
      headers.append("Authorization", `Client-ID ${clientId}`);

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
    }
    // data": {
    //     "id": "eZE3X5S",
    //     "deletehash": "0xjXrdWXsXSM1Wi"
    // },
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
      <div v-if="imgur_server_issue" class="flex justify-center items-center h-screen">
        <div class="bg-gray-800 p-6 rounded-lg shadow-md w-72">
          <img src="../assets/img/svg/server_down.svg" alt="Server Down">
          <h2 class="text-xl font-semibold mb-4 mt- text-center text-gray-300">Server Issue</h2>
          <p class="text-gray-400">We're sorry, but the server is currently experiencing issues. Please try again later.</p>
        </div>
      </div>
      <p v-else class="text-center text-white text-lg mt-96">
        Please wait...
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>