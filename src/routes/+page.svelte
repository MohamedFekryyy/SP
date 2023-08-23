<script>
    import ThemeSwitch from '../components/ThemeSwitch.svelte';
    import { MetaTags } from 'svelte-meta-tags';
    import Footer from '../components/Footer.svelte';
    import Nav from '../components/Nav.svelte'
    import { fade } from 'svelte/transition';

 

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
  
<main class="dark:bg-slate-950 bg-slate-100 min-h-screen ">
  <div class="!z-2"><Nav />
  </div>
  
<section class="section " in:fade={{ duration: 500, delay: 100 }}>

   
    <div class="dark:text-slate-300 text- py-1.5 px-2.5 dark:bg-slate-950/60 bg-slate-200/50 rounded-md dark:shadow-lg shadow  mb-8 border dark:border-slate-800/70 border-slate-300/50">💎  FREE DURING BETA  💎</div>
    <h1>Craft Stunning PDF <br> Proposals in Just Minutes</h1>
    <p class="dark:text-slate-400 text-slate-700 mt-4 mb-8 max-w-md text-center">Create professional PDF proposals effortlessly with your preferred currency. Just fill a form, and it's ready.</p>

    


        <a class=' bg-purple-700 px-4 py-2 text-lg font-medium rounded-lg text-slate-50 hover:bg-purple-700/90  shadow-2xl shadow-purple-700/40  transition-all  outline outline-transparent focus:outline-purple-700/20;
        ' href="/create-proposal" >
        Create Proposal
        </a>
        
          
   


	  
</section>


<div class="z-1"><Footer/></div>

</main>


<style lang="postcss">
  

  
	h1 {
		@apply text-slate-900 dark:text-slate-50 w-3/4 sm:w-auto text-2xl sm:text-4xl font-semibold   text-center;
	}
	h3 {
		@apply text-slate-900 dark:text-slate-200 w-full  text-lg sm:text-xl font-normal text-center;
	}
	.section {
		@apply absolute min-w-full justify-center min-h-[100vh] flex flex-col items-center top-0   px-5;
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


.gradient-top {
  background: radial-gradient(circle at 50% 0%, #0E0E6C 0%, #0C0C5A00 82%);
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