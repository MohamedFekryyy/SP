<script>
    import Form from '../../components/Form.svelte'
    import ProgressBar from '../../components/ProgressBar.svelte';
    import Footer from '../../components/Footer.svelte';
    import { writable } from 'svelte/store';
    import { MetaTags } from 'svelte-meta-tags';
    import Nav from '../../components/Nav.svelte';

    let formData;
    let items;
    let milestones;
    let startDate;
    let endDate;
    let totalSum;


   
const isLoading = writable(false); //  state for PDF generation

  
async function generatePDF() {
  try {
    isLoading.set(true); // Set the loading state to true

    // Create an object with the data to send to the server
    const data = {
      clientName: formData.clientName,
      clientCompany: formData.clientCompany,
      clientEmail: formData.clientEmail,
      freelancerEmail: formData.freelancerEmail,
      freelancerName: formData.freelancerName,
      projName: formData.projName,
      projDescription: formData.projDescription,
      projGoals: formData.projGoals,
      startDate: startDate,
      endDate: endDate,
      items: items,
      milestones: milestones,
      totalSum: totalSum,
    };

    // Send a POST request to the server-side endpoint
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Check if the response is successful
    if (!response.ok) {
      // Log the response to see more details about the error
      console.error('Server response:', await response.text());
      throw new Error('Failed to generate PDF');
    }

    // Get the PDF data from the response
    const pdfBlob = await response.blob();

    // Create a link to download the PDF
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = formData.projName + '.pdf';
    a.click();

    // Redirect to the next page
    window.location.href = '/proposal-generated';
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Handle the error as appropriate for your application
  } finally {
    isLoading.set(false); // Set the loading state to false
  }
}

    

    
    $: secureDataClass = currentActive === 1 ? "secure-data" : "secure-data hidden";

  
    let steps = ['clientInfo', 'ProjectInfo', 'Items', 'Milestones'], currentActive = 1, progressBar;
    const handleProgress = (stepIncrement) => {
      progressBar.handleProgress(stepIncrement);
    }

   
    
 

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
  
  
<main class="dark:bg-slate-950 bg-slate-100 min-h-screen relative">
  <div class=" z-1 inset-0 overflow-x-clip overflow-y-auto min-h-screen min-w-full bg-slate-100 dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] inner-light dark:inner-dark">

<Nav/>
<section class="section z-2 mb-16 overflow-auto">

   

    <h1>Craft Stunning PDF Proposals in <span class="bg-gradient-to-r from-purple-700 to-blue-900 bg-clip-text text-transparent font-semibold">Just Minutes.</span></h1>
<div class="container">
    <div class="hidden"><ProgressBar {steps} bind:currentActive bind:this={progressBar}/> </div>
    
    <Form active_step={steps[currentActive-1]} bind:formData bind:items bind:milestones bind:startDate bind:endDate bind:totalSum />


    <div class="step-button">
        {#if currentActive > 1}
        <button class="btn-back dark:bg-slate-900 bg-slate-200/70 dark:hover:bg-slate-900/50 hover:bg-slate-300/70" on:click={() => handleProgress(-1)} disabled={currentActive == 1}><svg
            class="w-5 h-4 dark:text-slate-50 text-slate-700 hover:scale-110 tranistion-all"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
        >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
            />
        </svg></button>
        {/if}

        {#if currentActive === steps.length}
      
        <button on:click={() => generatePDF(formData, items, milestones, startDate, endDate, totalSum)} disabled={currentActive != steps.length} class="relative  items-center justify-center inline-block p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group min-w-[220px]">
            <span class="absolute top-0 left-0 w-60 h-60 -mt-10 -ml-3 transition-all duration-700 bg-purple-700 rounded-full blur-md ease"></span>
            <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-pink-700 rounded-full blur-md"></span>
            <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-blue-900 rounded-full blur-xl"></span>
            </span>
            {#if $isLoading}
            <div class="loader"></div> <!-- CSS spinner -->
          {:else}
            <span class="relative text-lg text-white">Generate Proposal</span>
            {/if}
        </button>
        
          
        {:else}

        <button class={currentActive === 1 ? 'btn-next w-full' : 'btn-next w-auto'} on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>
            {currentActive === 1 ? 'Get Started' : 'Continue'}
        </button>
        
          
        {/if}
    </div>		
    <div class={secureDataClass}>
        <svg class="sm:w-5 sm:h-5 h-4 w-4 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="m17.351 3.063-8-3a1.009 1.009 0 0 0-.7 0l-8 3A1 1 0 0 0 0 4a19.394 19.394 0 0 0 8.47 15.848 1 1 0 0 0 1.06 0A19.394 19.394 0 0 0 18 4a1 1 0 0 0-.649-.937Zm-3.644 4.644-5 5A1 1 0 0 1 8 13c-.033 0-.065 0-.1-.005a1 1 0 0 1-.733-.44l-2-3a1 1 0 0 1 1.664-1.11l1.323 1.986 4.138-4.138a1 1 0 0 1 1.414 1.414h.001Z"/>
          </svg>
        Your data is securely handled with utmost care.
      </div>


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