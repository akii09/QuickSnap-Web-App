<template>
   <Header />
   <div
      class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div class="max-w-7xl mx-auto p-8">
         <div class="text-center mb-6">
            <a class="button-30" href="/login" role="button">Log In 🚀 </a>
         </div>
         <!-- Header -->
         <header class="text-center mb-12">
            <h1 class="text-5xl font-extrabold mb-4">Boost Productivity with QuickSnap 🚀</h1>
            <p class="text-lg">Capture Screenshots Instantly and Effortlessly</p>
         </header>

         <!-- Features Section -->
         <!-- Features Section -->
         <section class="grid grid-cols-1 md:grid-cols-3  gap-12 mb-16">
            <!-- Feature 1 -->
            <div class="flex items-center">

               <div>
                  <h2 class="text-xl font-semibold mb-2">Capture Screenshots Quickly</h2>
                  <p>QuickSnap empowers professionals like developers, designers, and digital marketers to capture
                     screenshots effortlessly, helping you stay productive in your tasks.</p>
               </div>
            </div>

            <!-- Feature 2 -->
            <div class="flex items-center">

               <div>
                  <h2 class="text-xl font-semibold mb-2">Instant Sharing</h2>
                  <p>With QuickSnap, sharing your captured screenshots is a breeze. Share them with colleagues, clients, or
                     on your social media platforms with just a few clicks.</p>
               </div>
            </div>

            <div class="flex items-center">

               <div>
                  <h2 class="text-xl font-semibold mb-2">Effortlessly Manage Your Screenshots</h2>
                  <p>QuickSnap goes beyond capturing and sharing screenshots. Experience the convenience of managing your visual content with the QuickSnap Web
                     App.</p>
               </div>
            </div>

            <!-- Add more feature sections as needed -->
         </section>



         <!-- CTA Section -->
         <section class="text-center">
            <h2 class="text-2xl font-semibold mb-4">Get Started Today</h2>
            <p class="text-lg mb-6">Download QuickSnap now and experience improved productivity Its Free 🔥!
            </p>
            <a class="button-30"
               href="https://chrome.google.com/webstore/detail/quick-snap-app/ddacdbcbmgmgjfdncmgjbcciglehcioo#:~:text=%F0%9F%9A%80%20QuickSnap%20Chrome%20Extension%20%F0%9F%93%B8,%2C%20colleagues%2C%20or%20social%20media.">
               Download Now ⬇️
            </a>
         </section>

         <!-- Bottom menu section -->
         <!-- <section class="text-center mt-16">
            <a href="" class="text-white text-sm cursor-pointer mx-2">
               Changelog
            </a>
            <a href="" class="text-white text-sm cursor-pointer mx-2">
               Upcoming features
            </a>
            <a href="/docs" class="text-white text-sm cursor-pointer mx-2">
               Docs
            </a>
         </section> -->
      </div>
   </div>
</template>
 
<script>
export default {};
</script>
 
<style scoped>
.bg-gradient-to-br {
   background: linear-gradient(to bottom right, #1f2937, #111827);
}

/* CSS */
.button-30 {
   align-items: center;
   appearance: none;
   background-color: #FCFCFD;
   border-radius: 4px;
   border-width: 0;
   box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
   box-sizing: border-box;
   color: #36395A;
   cursor: pointer;
   display: inline-flex;
   font-family: "JetBrains Mono", monospace;
   height: 48px;
   justify-content: center;
   line-height: 1;
   list-style: none;
   overflow: hidden;
   padding-left: 16px;
   padding-right: 16px;
   position: relative;
   text-align: left;
   text-decoration: none;
   transition: box-shadow .15s, transform .15s;
   user-select: none;
   -webkit-user-select: none;
   touch-action: manipulation;
   white-space: nowrap;
   will-change: box-shadow, transform;
   font-size: 18px;
}

.button-30:focus {
   box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
   box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
   transform: translateY(-2px);
}

.button-30:active {
   box-shadow: #D6D6E7 0 3px 7px inset;
   transform: translateY(2px);
}</style>
 