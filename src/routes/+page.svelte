<script>
    import Form from '../components/Form.svelte';
    import { supabase } from '../supabaseClient';
    import ProgressBar from '../components/ProgressBar.svelte';
    import Modal from '../components/Modal.svelte';
    import { writable } from 'svelte/store';
    import ThemeSwitch from '../components/ThemeSwitch.svelte';




    let formData;
    let items;
    let milestones;
    let startDate;
    let endDate;
    let totalSum;


    async function addFormSubmission(formData, items, milestones, startDate, endDate, totalSum) {
  // Inserting into the form_submissions table
  const { data: submission, error: submissionError } = await supabase
    .from('form_submissions')
    .insert([
      { 
        clientName: formData.clientName,
        clientCompany: formData.clientCompany,
        clientEmail: formData.clientEmail,
        freelancerEmail: formData.freelancerEmail,
        freelancerName: formData.freelancerName,
        projName: formData.projName,
        projDescription: formData.projDescription,
        projGoals: formData.projGoals,
        preFilledText: formData.preFilledText,
        start_date: startDate, 
        end_date: endDate,
        total_price: totalSum 
      },
    ]);

  if (submissionError) {
    console.error('Error adding submission:', submissionError);
    return;
  }

  const submissionId = submission[0].id;

  // Inserting into the proposal_items table
  const proposalItems = items.map(item => ({
    title: item.title,
    price: item.price,
    form_submission_id: submissionId
  }));

  await supabase.from('proposal_items').insert(proposalItems);

  // Inserting into the milestones table
  const milestoneItems = milestones.map(milestone => ({
    title: milestone.title,
    delivery_date: milestone.deliveryDate,
    form_submission_id: submissionId
  }));

  await supabase.from('milestones').insert(milestoneItems);
}

const isLoading = writable(false); //  state for PDF generation

  
async function generatePDF() {
  try {
    isLoading.set(true); // Set the loading state to true

    // Make sure the submission is added
    await addFormSubmission(formData, items, milestones, startDate, endDate, totalSum);

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

   
    const isModalOpen = writable(false); // Using a Svelte store for modal state

    const isPrivacyModalOpen = writable(false);

    
    function handleOpenModal(event) {
      event.preventDefault();
      isModalOpen.set(true);
    }

    // Content for the Terms & Conditions modal
    const termsContent = `

<p class="dark:text-slate-400 text-slate-500 italic mb-2">Last updated: 13 Aug 2023</p>

<p class="mb-2 leading-relaxed">Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using Swift Proposal (the "Service") operated by SwiftThings ("us", "we", or "our").</p>

<p class="mb-2 leading-relaxed">Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all users and others who access or use the Service.</p>

<p class="mb-2 leading-relaxed">By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

<h3 class="text-lg mb-1 mt-3">1. Accounts</h3>
<p class="leading-relaxed">When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

<h3 class="text-lg mb-1 mt-3">2. Use of the Service</h3>
<p class="leading-relaxed">You agree to use the Service in accordance with all applicable local, state, national, and international laws, rules, and regulations.</p>

<h3 class="text-lg mb-1 mt-3">3. Termination</h3>
<p class="leading-relaxed">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

<h3 class="text-lg mb-1 mt-3">4. Governing Law</h3>
<p class="leading-relaxed">These Terms shall be governed and construed in accordance with the laws of Cairo, Egypt, without regard to its conflict of law provisions.</p>

<h3 class="text-lg mb-1 mt-3">5. Changes</h3>
<p class="leading-relaxed">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 7 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

<p class="leading-relaxed">If you have any questions about these Terms, please <a href="mailto:contact@example.com">contact us</a>.</p>
`;

const privacyContent = `
<p class="dark:text-slate-400 text-slate-500 italic mb-2">Last updated: 13 Aug 2023</p>


<h4 class="text-lg mb-1 mt-3">1. Introduction</h4>
<p class="leading-relaxed">At Swift Proposal, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.</p>

<h4 class="text-lg mb-1 mt-3">2. Information We Collect</h4>
<p class="leading-relaxed">We may collect the following types of information:</p>
<ul>
  <li class="leading-relaxed"><strong>Personal Information:</strong> Such as your name, email address, and contact details.</li>
  <li class="leading-relaxed"><strong>Usage Data:</strong> Information about how you use our service.</li>
  <li class="leading-relaxed"><strong>Cookies and Tracking Data:</strong> We may use cookies to track activity on our website.</li>
</ul>

<h4 class="text-lg mb-1 mt-3">3. How We Use Your Information</h4>
<p class="leading-relaxed">We may use your personal information for the following purposes:</p>
<ul>
  <li class="leading-relaxed">To provide and maintain our service.</li>
  <li class="leading-relaxed">To notify you about changes to our service.</li>
  <li class="leading-relaxed">To provide customer support.</li>
  <li class="leading-relaxed">To gather analysis or valuable information to improve our service.</li>
  <li class="leading-relaxed">To monitor the usage of our service.</li>
</ul>

<h4 class="text-lg mb-1 mt-3">4. Sharing Your Information</h4>
<p class="leading-relaxed">We do not sell or share your personal information with third parties for marketing purposes. We may share your information with third-party service providers to provide and support our service.</p>

<h4 class="text-lg mb-1 mt-3">5. Security</h4>
<p class="leading-relaxed">We take the security of your information seriously and use appropriate security measures to prevent unauthorized access, disclosure, alteration, or destruction of your information.</p>

<h4 class="text-lg mb-1 mt-3">6. Your Rights</h4>
<p class="leading-relaxed">You have the right to access, update, or delete the personal information we have on you. You can contact us at any time to exercise these rights.</p>

<h4 class="text-lg mb-1 mt-3">7. Changes to This Privacy Policy</h4>
<p class="leading-relaxed">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

<h4 class="text-lg mb-1 mt-3">8. Contact Us</h4>
<p class="leading-relaxed">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
<address>
  Email: support@fekryaiad.com<br>
</address>

`;

function handleOpenPrivacyModal(event) {
  event.preventDefault();
  isPrivacyModalOpen.set(true);
}

function handleClosePrivacyModal() {
  isPrivacyModalOpen.set(false);
}



    // Function to close the modal
    function handleCloseModal() {
      isModalOpen.set(false);
    }

 

 </script>
  
  
  <div
  class="absolute z-1 inset-0 h-full w-full bg-slate-50 dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] inner-light dark:inner-dark"
>

<div class="nav  p-6 min-w-full  flex flex-row justify-between items-center">
    
    <div class=" logos relative flex items-center justify-center">
      <a href="#" class="  dark:visible invisible "><img src="logo-on-dark.svg" class="h-8 sm:h-10" alt="Swift Proposal Logo"/></a>
      <a href="#" class=" dark:invisible visible absolute "><img src="logo-on-light.svg" class="h-8 sm:h-10" alt="Swift Proposal Logo"/></a>
    </div>
  <ThemeSwitch />
  
  </div>
<section class="section z-2">

   

    <h3>Fill in the data below, and get a <span class="bg-gradient-to-r from-purple-700 to-blue-900 bg-clip-text text-transparent font-semibold">Nice PDF Proposal</span></h3>
<div class="container">
    <div class="hidden"><ProgressBar {steps} bind:currentActive bind:this={progressBar}/> </div>
    
    <Form active_step={steps[currentActive-1]} bind:formData bind:items bind:milestones bind:startDate bind:endDate bind:totalSum />


    <div class="step-button">
        {#if currentActive > 1}
        <button class="btn-back dark:bg-slate-900 bg-slate-200 dark:hover:bg-slate-900/50 hover:bg-slate-300/70" on:click={() => handleProgress(-1)} disabled={currentActive == 1}><svg
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
            <span class="relative text-xl text-white">Generate Proposal</span>
            {/if}
        </button>
        
          
        {:else}

        <button class={currentActive === 1 ? 'btn-next w-full' : 'btn-next w-auto'} on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>
            {currentActive === 1 ? 'Get Started' : 'Continue'}
        </button>
        
          
        {/if}
    </div>		
    <div class={secureDataClass}>
        <svg class="sm:w-6 sm:h-6 h-4 w-4 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="m17.351 3.063-8-3a1.009 1.009 0 0 0-.7 0l-8 3A1 1 0 0 0 0 4a19.394 19.394 0 0 0 8.47 15.848 1 1 0 0 0 1.06 0A19.394 19.394 0 0 0 18 4a1 1 0 0 0-.649-.937Zm-3.644 4.644-5 5A1 1 0 0 1 8 13c-.033 0-.065 0-.1-.005a1 1 0 0 1-.733-.44l-2-3a1 1 0 0 1 1.664-1.11l1.323 1.986 4.138-4.138a1 1 0 0 1 1.414 1.414h.001Z"/>
          </svg>
        Your data is securely handled with utmost care.
      </div>


</div>	  
</section>


<footer class="flex gap-y-3 flex-col sm:flex-row items-center justify-center py-6  bg-gradient-to-b dark:from-slate-950/0 dark:to-slate-950 from-slate-50/0 to-slate-50 mt-4">
    <a href="#" on:click={handleOpenModal} class="text-base text-slate-500 hover:text-slate-300 transition-all mx-3">Terms & Conditions</a>
    <a href="#" on:click={handleOpenPrivacyModal} class="text-base text-slate-500 hover:text-slate-300 transition-all mx-3">Privacy Policy</a>
    <a href="mailto:fekry@scienft.com" class="text-base text-slate-500 hover:text-slate-300 transition-all mx-3" >Reach Out</a>


  </footer>
  
  <Modal {isModalOpen} title="Terms & Conditions" content={termsContent} on:close={handleCloseModal} />
  <Modal {isPrivacyModalOpen} title="Privacy Policy" content={privacyContent} on:close={handleClosePrivacyModal} />
</div>



<style lang="postcss">
  

    body {
        @apply dark:bg-slate-950 bg-slate-100;
    }

	h1 {
		@apply text-slate-900 dark:text-slate-50 text-3xl sm:text-4xl font-semibold mb-2  text-center;
	}
	h3 {
		@apply text-slate-900 dark:text-slate-200 w-full  text-lg sm:text-xl font-normal text-center;
	}
	.section {
		@apply min-w-full flex flex-col items-center justify-start   pt-0 sm:pt-8 min-h-[80%] px-5;
	}

	.btn-next {
		@apply bg-purple-700 px-6 py-3 text-lg font-medium rounded-lg text-slate-50 hover:bg-purple-700/90  shadow-2xl shadow-purple-700/40  transition-all;
	}

	.step-button {
		@apply max-w-[800px] gap-2 mx-auto  flex  gap-y-5  flex-row justify-between  items-stretch;
	}

	.btn-back {
		@apply  min-h-full mr-3 rounded-lg px-5 h-12 sm:h-auto w-full sm:w-auto   transition-all cursor-pointer items-center justify-center flex;
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