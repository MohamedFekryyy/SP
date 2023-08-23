<script>
    import ThemeSwitch from '../components/ThemeSwitch.svelte';
    import { MetaTags } from 'svelte-meta-tags';
    import Footer from '../components/Footer.svelte';
    import Nav from '../components/Nav.svelte'




   
   

 

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
  
  
<main class="dark:bg-slate-950 bg-slate-100 min-h-screen gradient-top">

<Nav showThemeSwitch={false}/>
<section class="section z-2">

   
    <div class="text-slate-300 py-1.5 px-2.5 bg-slate-950/60 rounded-md shadow-lg mb-8 border border-slate-800/70">💎  FREE DURING BETA  💎</div>
    <h1>Craft Stunning PDF <br> Proposals in Just Minutes</h1>
    <p class="text-slate-400 mt-4 mb-8 max-w-md text-center">Create professional PDF proposals effortlessly with your preferred currency. Just fill a form, and it's ready.</p>

    


        <a class=' bg-purple-700 px-4 py-2 text-lg font-medium rounded-lg text-slate-50 hover:bg-purple-700/90  shadow-2xl shadow-purple-700/40  transition-all  outline outline-transparent focus:outline-purple-700/20;
        ' href="/create-proposal" >
        Create Proposal
        </a>
        
          
   


	  
</section>


<Footer/>

</main>


<style lang="postcss">
  

  
	h1 {
		@apply text-slate-900 dark:text-slate-50 w-3/4 sm:w-auto text-2xl sm:text-4xl font-semibold   text-center;
	}
	h3 {
		@apply text-slate-900 dark:text-slate-200 w-full  text-lg sm:text-xl font-normal text-center;
	}
	.section {
		@apply min-w-full flex flex-col items-center justify-start   pt-0 sm:pt-8 pb-8  px-5;
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