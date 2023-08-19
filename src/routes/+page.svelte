<script>
    import ThemeSwitch from '../components/ThemeSwitch.svelte';
    import { MetaTags } from 'svelte-meta-tags';
    import Footer from '../components/Footer.svelte';
    import { writable } from 'svelte/store';





   
   

 

 </script>

<MetaTags
title="Swift Proposal"
description="Craft Stunning PDF Proposals in Just Minutes."
openGraph={{
  url: 'https://www.url.ie/a',
  title: 'Swift Proposal',
  description: 'Craft Stunning PDF Proposals in Just Minutes.',
  images: [
    {
      url: 'https://www.example.ie/og-image-01.jpg',
      width: 800,
      height: 600,
      alt: 'Og Image Alt'
    },
    {
      url: 'https://www.example.ie/og-image-02.jpg',
      width: 900,
      height: 800,
      alt: 'Og Image Alt Second'
    },
    { url: 'https://www.example.ie/og-image-03.jpg' },
    { url: 'https://www.example.ie/og-image-04.jpg' }
  ],
  site_name: 'SwiftProposal'
}}
twitter={{
  handle: '@fekryaiad',
  cardType: 'summary_large_image',
  title: 'Swift Proposal',
  description: 'Craft Stunning PDF Proposals in Just Minutes.',
  image: 'https://www.example.ie/twitter-image.jpg',
  imageAlt: 'Craft Stunning PDF Proposals in Just Minutes.'
}}
facebook={{
  appId: '1234567890'
}}
/>
  
  
<main class="dark:bg-slate-950 bg-slate-100 min-h-screen">
  <div class=" z-1 inset-0 overflow-x-clip min-h-full min-w-full bg-slate-100 dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] inner-light dark:inner-dark">

<div class="nav  p-5 sm:p-6 min-w-full  flex flex-row justify-between items-center">
    
    <div class=" logos relative flex items-center justify-center shadow-xl dark:shadow-slate-950 shadow-slate-100 dark:bg-slate-950 bg-slate-100">
      <a href="#" class="  dark:visible invisible "><img src="logo-on-dark.svg" class="h-8 sm:h-9" alt="Swift Proposal Logo"/></a>
      <a href="#" class=" dark:invisible visible absolute "><img src="logo-on-light.svg" class="h-8 sm:h-9" alt="Swift Proposal Logo"/></a>
    </div>
  <ThemeSwitch />
  
  </div>
<section class="section z-2">

   

    <h1>Hello World <span class="bg-gradient-to-r from-purple-700 to-blue-900 bg-clip-text text-transparent font-semibold">Just Minutes.</span></h1>
<div class="container">
    


        <a class='btn-next' href="/create-proposal" >
            Get Started
        </a>
        
          
   


</div>	  
</section>


<Footer/>
</div>
</main>


<style lang="postcss">
  

  
	h1 {
		@apply text-slate-900 dark:text-slate-50 w-3/4 sm:w-auto text-xl sm:text-2xl font-semibold   text-center;
	}
	h3 {
		@apply text-slate-900 dark:text-slate-200 w-full  text-lg sm:text-xl font-normal text-center;
	}
	.section {
		@apply min-w-full flex flex-col items-center justify-start   pt-0 sm:pt-8 pb-8  px-5;
	}

	.btn-next {
		@apply bg-purple-700 px-6 py-3 text-lg font-medium rounded-lg text-slate-50 hover:bg-purple-700/90  shadow-2xl shadow-purple-700/40  transition-all  outline outline-transparent focus:outline-purple-700/20;
	}

	.step-button {
		@apply max-w-[800px] gap-2 mx-auto  flex  gap-y-5  flex-row justify-between  items-stretch;
	}

	.btn-back {
		@apply  min-h-full mr-3 rounded-lg px-5  sm:h-auto    transition-all cursor-pointer items-center justify-center flex;
	}

    .btn-next.w-full {
  width: 100%; /* Adjust as needed */
}

.btn-next.w-auto {
  width: auto; /* Adjust as needed */
}

.secure-data {
  @apply dark:text-slate-400 text-slate-500 text-sm sm:text-base gap-2 mt-5 sm:mt-7  flex items-center  mb-4 max-w-[800px] mx-auto justify-center ;
  font-family: 'Inter';
}

.hidden {
  display: none;
}

.footer-dark-shadow {
    box-shadow: 0px -52px 100px 0px #030616;

}






.loader {
  margin-left: auto;
  margin-right: auto;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>