<script>
  function redirectToHomePage() {
    window.location.href = '/'; // Redirect to the home page
  }
</script>

<div
  class="absolute z-1 inset-0 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] inner-shadow"
>
<section class="section z-2">
 <div class="form-container bg-slate-900/50 backdrop-blur-xl border border-slate-900 rounded-2xl p-4 sm:p-6  w-full sm:w-[600px] my-10 mx-auto shadow-2xl shadow-slate-950 transition-all">
<h1 class="sm:max-w-[300px] mx-auto max-w-none">Thank you for using Swift Proposal</h1>
<p class="text-slate-300 mt-4 text-center sm:max-w-[420px] mx-auto text-base">This is an early release of the product, if you have any feedback or suggestions please feel free to <a href="mailto:fekry@scienft.com" class="text-white underline decoration-purple-700 hover:text-purple-700 transition-all">Reach out</a> !</p>
<button on:click={redirectToHomePage} class="btn-next mt-6"> <svg class="md:w-4 md:h-4 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
  </svg>
    Create More
</button>
<script class="min-w-full" type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="fekry" data-color="#1b1d2c" data-emoji="🚀"  data-font="Inter" data-text="Support for more" data-outline-color="#ffffff" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script></section></div>

<style lang="postcss">
    :global(html) {
         background-color: theme(colors.slate.950);
         
     }
     h1 {
         @apply text-slate-50 text-2xl sm:text-3xl font-semibold mb-2  text-center !leading-10;
     }
     h3 {
         @apply text-slate-400 text-lg sm:text-lg font-normal text-center;
     }
     .section {
         @apply min-w-full flex flex-col items-center justify-center   py-8 sm:py-16 min-h-screen px-5;
     }
 
     .btn-next {
         @apply bg-purple-700 px-6 py-3 text-lg font-medium rounded-lg text-slate-50 hover:bg-purple-700/90  shadow-2xl shadow-purple-700/40  transition-all w-full flex items-center justify-center gap-2;
     }
 
     .step-button {
         @apply max-w-[800px] gap-2 mx-auto  flex flex-col-reverse gap-y-5  sm:flex-row justify-between  items-stretch;
     }
 
     .btn-back {
         @apply bg-slate-900 min-h-full mr-3 rounded-lg px-5 h-12 sm:h-auto w-full sm:w-auto  hover:bg-slate-900/50 transition-all cursor-pointer items-center justify-center flex;
     }
 


 
 .btn-next.w-auto {
   width: auto; /* Adjust as needed */
 }
 
 .secure-data {
   @apply text-slate-400 text-sm sm:text-base gap-2 mt-5 sm:mt-7  flex items-center  mb-4 max-w-[800px] mx-auto justify-center ;
 }
 
 .hidden {
   display: none;
 }
 
 
 .inner-shadow {
     box-shadow: inset 0 0 300px 200px  theme(colors.slate.950);
 
 }
 </style>