

<script>
import nuxtStorage from 'nuxt-storage';
import axios from 'axios';
import validateToken from "../utils/validateToken.js"
export default {
  data() {
    return {
      show_dashboard: true,
      client_id: '592d7cf9cad8076',
      images: [],
      imgur_server_issue: false,
      popup_image: '',
      all_images: [],
      show_image: false,
      is_loading: false,
      is_loading2: true,
      imageDeleteHash: null
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
        this.$router.push({ path: '/snaps' });
        this.getImagesFromServer();
      } else if (nuxtStorage.localStorage.getData('qs_token')) {
        this.$router.push({ path: '/snaps' });
        this.getImagesFromServer();
      } else {
        this.$router.push({ path: '/login' });
      }
    },
    getImagesFromServer() {
      this.is_loading = true;
      const albumHash = nuxtStorage.localStorage.getData('qs_token');
      const apiUrl = `https://api.imgur.com/3/album/${albumHash}/images`;
      const clientId = this.client_id;
      // First validate albums
      validateToken(albumHash, clientId)
        .then(isAvailable => {
          if (isAvailable) {
            axios.get(apiUrl, {
              headers: {
                'Authorization': `Client-ID ${clientId}`
              }
            })
              .then(response => {
                this.images = response.data.data;
                this.images.map((e) => this.all_images.push(e.link))
                this.show_dashboard = true;
                this.is_loading = false;
                console.log(response.data); // Do something with the response data
              })
              .catch(error => {
                console.error('An error occurred:', error);
                this.is_loading = false;
              });
          } else {
            console.log(isAvailable, 'Album is not available on Imgur.');
          }
        });
    },
    deleteImage(imageHash) {
      ElMessageBox.alert(
        '🗑️ Image delete options are not available from here for now. You are unable to delete this image at the moment. However, in the future, you can delete your images by clicking the delete button. The delete button will be available right next to the copy button after uploading the image.',
        'Delete Image',
        {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: 'Got it!',
          showCancelButton: false,
          type: 'warning',
          customClass: 'qs-dark-theme',
          callback: (action) => {
            if (action === 'confirm') {
              // this.getImageDetails(imageHash);
              // Perform your deletion logic here
            } else {
              ElMessage({
                type: 'info',
                message: 'Deletion canceled. 😅',
              });
            }
          },
        }
      );
    },
    processDeleteImage(imageDeleteHash) {
      const apiUrl = `https://api.imgur.com/3/image/${imageDeleteHash}`;
      const clientId = this.client_id;
      axios.delete(apiUrl, {
        headers: {
          'Authorization': `Client-ID ${clientId}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            ElMessage({
              type: 'success',
              message: 'Image successfully deleted! 🎉',
            });
            console.log('Image deleted successfully.');
            this.getImagesFromServer();
          } else {
            console.error('Failed to delete image.');
          }
        })
        .catch(error => {
          console.error('Error deleting image:', error.message);
        });
    },
    getImageDetails(imageHash) {
      const apiUrl = `https://api.imgur.com/3/image/${imageHash}`;
      const clientId = this.client_id;
      axios.get(apiUrl, {
        headers: {
          'Authorization': `Client-ID ${clientId}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            this.processDeleteImage(response.data.data.deletehash)
          } else {
            console.error('Failed to get image details.');
          }
        })
        .catch(error => {
          console.error('Something went wrong:', error.message);
        });
    },
    openImage(img) {
      console.log(img)
      this.show_image = true;
      this.popup_image = img;
    },
    handleClose() {
      this.show_image = true;
      this.popup_image = '';
    },
    copyImgLink(link) {
      // Copy to clipboard
      const textarea = document.createElement('textarea');
      textarea.value = link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      ElMessage({
        type: 'success',
        message: 'Image link copied successfully. 🥳',
      });
    },
    downloadImage(imageUrl) {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          const currentDate = new Date();
          const formattedDate = this.formatDate(currentDate);
          a.download = `quick-snap-@imgur-${formattedDate}`; // You can customize the downloaded file name
          a.click();
          URL.revokeObjectURL(a.href);
        })
        .catch(error => {
          console.error('Error downloading image:', error);
        });
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year}-${hours}:${minutes}`;
    }
    // data": {
    //     "id": "eZE3X5S",
    //     "deletehash": "0xjXrdWXsXSM1Wi"
    // },
  },
}
</script>

<template>
  <Header />
  <div class="container mx-auto min-h-screen">
    <div v-if="show_dashboard" class="px-4 py-6">
      <div v-loading="is_loading" class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        <template v-if="images.length">
          <div v-for="(image, img_index) in images" :key="image.id" class="dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <div class="demo-image__preview">
              <el-image lazy :src="image.link" :zoom-rate="1.2" :preview-src-list="all_images" :initial-index="img_index"
                fit="cover" />
            </div>
            <!-- <img :src="image.link" alt="Image" class="w-full h-55 object-cover rounded-md mb-4 cursor-pointer"
            @click="openImage(image.link)"> -->
            <div class="text-xl font-semibold mb-2">{{ image.name }}</div>
            <div class="flex justify-end py-2 px-1">

              <!-- <svg viewBox="0 0 1024 1024" class="cursor-pointer mx-1" style="width: 25px; color: #ec5e5e;" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"></path></svg> -->
              <!-- <svg viewBox="0 0 1024 1024" class="cursor-pointer mx-1" style="width: 25px; color: #a09f9f;"
              xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
              <path fill="currentColor"
                d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z">
              </path>
              <path fill="currentColor"
                d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z">
              </path>
            </svg> -->
              <span class="flex items-center">
                <svg viewBox="0 0 1024 1024" class="cursor-pointer mx-1" style="width: 25px; color: #a09f9f;"
                  xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                  <path fill="currentColor"
                    d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z">
                  </path>
                </svg>
                <span class="font-sm mr-1" style="color: #a09f9f;">{{ image.views }}</span>
              </span>

              <svg @click="copyImgLink(image.link)" viewBox="0 0 1024 1024" class="cursor-pointer mx-1"
                style="width: 25px; color: #a09f9f;" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                <path fill="currentColor"
                  d="M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496 45.248 45.248zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152 625.152 353.6z">
                </path>
              </svg>

              <svg @click="downloadImage(image.link)" class="cursor-pointer mx-1" style="width: 25px; color: #67f7af;"
                viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                <path fill="currentColor"
                  d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z">
                </path>
              </svg>

              <svg @click="deleteImage(image.id)" class="cursor-pointer mx-1" style="width: 25px; color: #d87c7c;"
                viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                <path fill="currentColor"
                  d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z">
                </path>
              </svg>
            </div>
            <!-- <button @click="deleteImage(image.id)" class="bg-qs-color text-white px-4 py-2 rounded-lg">Delete</button> -->
          </div>
        </template>
        <template v-else-if="!images.length && !is_loading">
          <div>
            <p class="text-center text-white text-lg mt-96">
              Images not found...
            </p>
          </div>
        </template>
      </div>
    </div>
    <div v-else>
      <div v-if="imgur_server_issue" class="flex justify-center items-center h-screen">
        <div class="bg-gray-800 p-6 rounded-lg shadow-md w-72">
          <img src="../assets/img/svg/server_down.svg" alt="Server Down">
          <h2 class="text-xl font-semibold mb-4 mt- text-center text-gray-300">Server Issue</h2>
          <p class="text-gray-400">We're sorry, but the server is currently experiencing issues. Please try again later.
          </p>
        </div>
      </div>
      <p v-else class="text-center text-white text-lg mt-96">
        Please wait...
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
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

.el-loading-mask {
  background: transparent;
}
</style>