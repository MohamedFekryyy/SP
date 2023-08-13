<script>
    import Form from '../components/Form.svelte';
    import ProgressBar from '../components/ProgressBar.svelte';
    import Modal from '../components/Modal.svelte';
    import { writable } from 'svelte/store';


    import jsPDF from 'jspdf';
  
    let formData;
    let items;
    let milestones;
    let startDate;
    let endDate;
    let totalSum;
  
    async function generatePDF() {
      const doc = new jsPDF();
      doc.text('Client Name: ' + formData.clientName, 10, 10);
      doc.text('Client Company: ' + formData.clientCompany, 10, 20);
      doc.text('Client Email: ' + formData.clientEmail, 10, 30);
      doc.text('Freelancer Email: ' + formData.freelancerEmail, 10, 40);
      doc.text('Freelancer Name: ' + formData.freelancerName, 10, 50);
      doc.text('Project Name: ' + formData.projName, 10, 60);
      doc.text('Project Description: ' + formData.projDescription, 10, 70);
      doc.text('Project Goals: ' + formData.projGoals, 10, 80);
      doc.text('Start Date: ' + startDate, 10, 90);
      doc.text('End Date: ' + endDate, 10, 100);
  
      let yPosition = 110;
      items.forEach(item => {
        doc.text('Item Title: ' + item.title, 10, yPosition);
        yPosition += 10;
        doc.text('Item Price: ' + item.price, 10, yPosition);
        yPosition += 10;
      });
  
      doc.text('Total Sum: ' + totalSum, 10, yPosition);
      console.log('Total Sum:', totalSum);

  
      milestones.forEach(milestone => {
        doc.text('Milestone Title: ' + milestone.title, 10, yPosition);
        yPosition += 10;
        doc.text('Milestone Delivery Date: ' + milestone.deliveryDate, 10, yPosition);
        yPosition += 10;
      });
  
      doc.save('proposal.pdf');

      window.location.href = '/proposal-generated';
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

<p class="text-slate-400 italic mb-2">Last updated: 13 Aug 2023</p>

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
<p class="text-slate-400 italic mb-2">Last updated: 13 Aug 2023</p>


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
  class="absolute z-1 inset-0 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] inner-shadow"
>
<section class="section z-2">
    <a href="#" class="mb-10 opacity-90 hover:opacity-100 transition-all"><img src="logo-on-dark.svg" class="h-10" alt="Swift Proposal Logo"/></a>
<h1>Create a Proposal</h1>
<h3>Fill in the data below, and get a nice PDF proposal</h3>
<div class="container">
    <div class="hidden"><ProgressBar {steps} bind:currentActive bind:this={progressBar}/> </div>
    
    <Form active_step={steps[currentActive-1]} bind:formData bind:items bind:milestones bind:startDate bind:endDate bind:totalSum />


    <div class="step-button">
        {#if currentActive > 1}
        <button class="btn-back" on:click={() => handleProgress(-1)} disabled={currentActive == 1}><svg
            class="w-5 h-4 text-slate-50 hover:scale-110 tranistion-all"
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
      
        <button on:click={() => generatePDF(formData, items, milestones, startDate, endDate, totalSum)} disabled={currentActive != steps.length} class="relative inline-flex items-center justify-center inline-block p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group">
            <span class="absolute top-0 left-0 w-60 h-60 -mt-10 -ml-3 transition-all duration-700 bg-purple-700 rounded-full blur-md ease"></span>
            <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-pink-700 rounded-full blur-md"></span>
            <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-blue-900 rounded-full blur-xl"></span>
            </span>
            <span class="relative text-xl text-white">Generate Proposal</span>
        </button>
        
          
        {:else}

        <button class={currentActive === 1 ? 'btn-next w-full' : 'btn-next w-auto'} on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>
            {currentActive === 1 ? 'Get Started' : 'Continue'}
        </button>
        
          
        {/if}
    </div>		
    <div class={secureDataClass}>
        <svg class="w-6 h-6 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="m17.351 3.063-8-3a1.009 1.009 0 0 0-.7 0l-8 3A1 1 0 0 0 0 4a19.394 19.394 0 0 0 8.47 15.848 1 1 0 0 0 1.06 0A19.394 19.394 0 0 0 18 4a1 1 0 0 0-.649-.937Zm-3.644 4.644-5 5A1 1 0 0 1 8 13c-.033 0-.065 0-.1-.005a1 1 0 0 1-.733-.44l-2-3a1 1 0 0 1 1.664-1.11l1.323 1.986 4.138-4.138a1 1 0 0 1 1.414 1.414h.001Z"/>
          </svg>
        Your data is securely handled with utmost care.
      </div>


</div>	  
</section>


<footer class="flex items-center justify-center pt-12 pb-8 fixed bottom-0 right-0 left-0 bg-gradient-to-b from-slate-950/0 to-slate-950 ">
    <a href="#" on:click={handleOpenModal} class="text-base text-slate-500 hover:text-slate-300 transition-all mx-3">Terms & Conditions</a>
    <a href="#" on:click={handleOpenPrivacyModal} class="text-base text-slate-500 hover:text-slate-300 transition-all mx-3">Privacy Policy</a>
    <a href="mailto:fekry@scienft.com" class="text-base text-slate-500 hover:text-slate-300 transition-all mx-3" >Reach Out</a>


  </footer>
  
  <Modal {isModalOpen} title="Terms & Conditions" content={termsContent} on:close={handleCloseModal} />
  <Modal {isPrivacyModalOpen} title="Privacy Policy" content={privacyContent} on:close={handleClosePrivacyModal} />
</div>



<style lang="postcss">
   :global(html) {
		background-color: theme(colors.slate.950);
        
	}
	h1 {
		@apply text-slate-50 text-3xl sm:text-4xl font-semibold mb-2  text-center;
	}
	h3 {
		@apply text-slate-400 text-lg sm:text-lg font-normal text-center;
	}
	.section {
		@apply min-w-full flex flex-col items-center justify-start   py-8 sm:py-16 min-h-screen px-5;
	}

	.btn-next {
		@apply bg-purple-700 px-6 py-3 text-lg font-medium rounded-lg text-slate-50 hover:bg-purple-700/90  shadow-2xl shadow-purple-700/40  transition-all;
	}

	.step-button {
		@apply max-w-[800px] gap-2 mx-auto  flex flex-col-reverse gap-y-5  sm:flex-row justify-between  items-stretch;
	}

	.btn-back {
		@apply bg-slate-900 min-h-full mr-3 rounded-lg px-5 h-12 sm:h-auto w-full sm:w-auto  hover:bg-slate-900/50 transition-all cursor-pointer items-center justify-center flex;
	}

    .btn-next.w-full {
  width: 100%; /* Adjust as needed */
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