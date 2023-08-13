<script>
   import Form from '../components/Form.svelte';
  import ProgressBar from '../components/ProgressBar.svelte';
  import jsPDF from 'jspdf';

  let formData = {
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    freelancerEmail: '',
    freelancerName: '',
    projName: '',
    projDescription: '',
    projGoals: '',
  };

  let items = [{ title: "", price: 0 }];
  let milestones = [{ title: '', deliveryDate: '' }];
  let startDate = null;
  let endDate = null;
  let totalSum = 0; // You'll need to calculate this based on the items


function generatePDF(formData, items, milestones, startDate, endDate, totalSum) {
  console.log('Generating PDF with:', formData, items, milestones, startDate, endDate, totalSum);
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
  yPosition += 10;

  milestones.forEach(milestone => {
    doc.text('Milestone Title: ' + milestone.title, 10, yPosition);
    yPosition += 10;
    doc.text('Milestone Delivery Date: ' + milestone.deliveryDate, 10, yPosition);
    yPosition += 10;
  });

  doc.save('proposal.pdf');
}


let steps = ['clientInfo', 'ProjectInfo', 'Items', 'Milestones'], currentActive = 1, progressBar;
const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement)
	}



	
</script>

<section class="section">
    <a href="#" class="mb-10 opacity-90 hover:opacity-100 transition-all"><img src="logo-on-dark.svg" class="h-10" alt="Swift Proposal Logo"/></a>
<h1>Create a Proposal</h1>
<h3>Fill in the data below, and it’ll preview</h3>
<div class="container">
    <div class="hidden"><ProgressBar {steps} bind:currentActive bind:this={progressBar}/> </div>
    
    <Form active_step={steps[currentActive-1]} {formData} {items} {milestones} {startDate} {endDate}/>

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
        <button class="btn-next w-auto" on:click={() => generatePDF(formData, items, milestones, startDate, endDate, totalSum)} disabled={currentActive == steps.length}>
            Generate Proposal
          </button>
          
        {:else}

        <button class={currentActive === 1 ? 'btn-next w-full' : 'btn-next w-auto'} on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>
            {currentActive === 1 ? 'Get Started' : 'Continue'}
        </button>
        {/if}
    </div>		
</div>	  
</section>

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
</style>