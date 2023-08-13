<script>
	import InputField from './inputField.svelte';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	export let active_step;
	let formData = {
		clientName: '',
		clientCompany: '',
		clientEmail: '',
		freelancerEmail: '',
		freelancerName: '',
		projName: '',
		projDescription: '',
		projGoals: '',
		postcode: '',
		account_name: '',
		card_no: ''
	}
	
	const handleSubmit = () => {
		console.log("Your form data => ",formData)
	}

	// Initialize the items array with one empty item
	let items = [{ title: "", price: 0 }];

// Function to add a new empty item
function addItem() {
  items = [...items, { title: "", price: 0 }];
}

// Function to remove an item by index
function removeItem(index) {
  items = items.filter((_, i) => i !== index);
}

// Computed total sum of the prices
$: totalSum = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

let milestones = [{ title: '', deliveryDate: '' }];

	let startDate = null;
	let endDate = null;

	function addMilestone() {
  console.log("Adding milestone"); // Debug log
  milestones = [...milestones, { title: '', deliveryDate: '' }]; // Adding a new milestone
}


function removeMilestone(index) {
  console.log("Removing milestone at index", index); // Debug log
  milestones = milestones.filter((_, i) => i !== index);
}


	function updateDates() {
		startDate = milestones.length > 0 ? milestones[0].deliveryDate : null;
		endDate = milestones.length > 0 ? milestones[milestones.length - 1].deliveryDate : null;
	}

	onMount(updateDates);

	let preFilledText = `1. Payment structure: 50% at approval, the rest at delivery.
2. Additional work for components that appear in the scope of work will be quoted before any invoicing.
3. New components that are not described in the scope of work will be assessed in a new estimate.
4. In case of project cancellation after the work has started, the client will pay for the relative part of the work.`;</script>

<form class="form-container bg-slate-900/50 border border-slate-900 rounded-2xl px-4 sm:px-6 pt-4 sm:pt-6 pb-none sm:pb-1 max-w-[800px] my-10 mx-auto shadow-2xl shadow-black/40 transition-all" on:submit={handleSubmit}>
	{#if active_step == 'clientInfo'}
	<h2 in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="sm:text-2xl text-xl">Client Info</h2>
	<div in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="flex flex-col sm:flex-row gap-4"><div class="w-full sm:w-[50%]"><InputField label={'Contact Person'} bind:value={formData.clientName} placeholder="Elon Musk"/></div>
	<div class="w-full sm:w-[50%]"><InputField label={'Company Name'} bind:value={formData.clientCompany} placeholder="X"/></div></div>
		<div in:fade={{ duration: 400, delay: 50 }} out:slide={{ y: -30, duration: 250 }}><InputField type={'email'} label={'Client Email'} bind:value={formData.clientEmail} placeholder="elon@x.com"/></div>
		<h2 in:fade={{ duration: 400, delay: 200 }} out:slide={{ y: -30, duration: 250 }} class="mt-4 sm:mt-8 sm:text-2xl text-xl">Your Info</h2>

		<div in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="flex flex-col sm:flex-row gap-4"><div in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }} class="w-full sm:w-[50%]"><InputField label={'Your Name'} bind:value={formData.freelancerName} placeholder="John Doe"/></div>
		<div in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }} class="w-full sm:w-[50%]"><InputField type={'email'} label={'Your Email'} bind:value={formData.freelancerEmail} placeholder="john@doe.com"/></div></div>

	{:else if active_step == 'ProjectInfo'}
	<h2 in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="sm:text-2xl text-xl">Project Info</h2>
	<div in:fade={{ duration: 400, delay: 50 }} out:slide={{ y: -30, duration: 250 }}><InputField label={'Project Name'} bind:value={formData.projName} placeholder="Design a better logo"/></div>
	<div in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }}><InputField label={'Project Description'} bind:value={formData.projDescription} isTextarea={true} tooltip="Describe your project in clear and simple terms. What needs to be done? This helps everyone involved understand the scope and purpose of the project."/> </div>
	<div in:fade={{ duration: 400, delay: 150 }} out:slide={{ y: -30, duration: 250 }}><InputField label={'Project Goals'} bind:value={formData.projGoals} isTextarea={true} tooltip="Define the desired outcomes of the project. What are you aiming to achieve? Examples: Increase sales, decrease abandoned carts, improve user engagement, etc."/></div>
	{:else if active_step == 'Items'}
	<h2 in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="sm:text-2xl text-xl">Proposal Items</h2>
	{#each items as item, index}
	<div class="list-item" in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }}>
		<input type="text" placeholder="Item Name" bind:value={item.title} class="bg-transparent placeholder:text-slate-500 text-slate-50 outline-none text-lg grow min-w-[65%]" />
		<input type="number" placeholder="Price" bind:value={item.price} class="rounded-lg bg-slate-700/50 px-3 py-3 grow max-w-[200px] text-slate-50 placeholder:text-slate-500 outline-none" />
		<button on:click={() => removeItem(index)} class=" pl-3 grow flex items-center justify-center text-slate-400 hover:text-slate-100 transition-all">
			<svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
			  </svg>
		</button>
	  </div>
	
	{/each}

	{#if items.length === 0}
		<div class="empty-state" in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }}>
			<p>Click the <span class="text-slate-300">"Add More"</span> button to add deliverables.</p>
		</div>
	{/if}

	<div class="mb-4 flex flex-col gap-y-4 sm:flex-row justify-between items-center mt-8" in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }}><button on:click={addItem} class="small-button w-full sm:w-auto"> <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
	  </svg> Add More</button>
	<div class="text-2xl  font-bold text-slate-50" in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }}><span class=" text-xl font-normal text-slate-400">Total</span> ${totalSum}</div>	
</div>
	{:else if active_step == 'Milestones'}
	<h2 in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="sm:text-2xl text-xl">Project Milestones</h2>

		
	<div>
		{#each milestones as milestone, index}
			<div class="list-item" in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }}>
				<input type="text" placeholder="Milestone Title" bind:value={milestone.title} class="bg-transparent placeholder:text-slate-500 text-slate-50 outline-none text-lg grow min-w-[65%]" />
				<input type="date" placeholder="Delivery Date" bind:value={milestone.deliveryDate} on:input={updateDates} class="rounded-lg bg-slate-700/50 px-3 py-3 grow max-w-[200px] text-slate-50 placeholder:text-slate-500 outline-none cursor-pointer" />
				<button  on:click={() => removeMilestone(index)} class=" pl-3 grow flex items-center justify-center text-slate-400 hover:text-slate-100 transition-all" ><svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
				  </svg></button>
			</div>
		{/each}
		<div class="mb-4 flex flex-col gap-y-4 sm:flex-row justify-between items-center mt-8" in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }}>
			<button on:click={addMilestone} class="small-button w-full sm:w-auto"> <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
			  </svg>Add Milestone</button>
			<div class="dates flex flex-row gap-x-4" in:fade={{ duration: 400, delay: 150 }} out:slide={{ y: -30, duration: 250 }}>
			<p class="text-slate-50 text-lg sm:text-xl"><span class="text-slate-400">Start Date</span> {startDate}</p>
			<p class="text-slate-50 text-lg sm:text-xl"><span class="text-slate-400">End Date</span> {endDate}</p>
		</div>
		
		</div>

	</div> 
	<h2 in:fade={{ duration: 400, delay: 200 }} out:slide={{ y: -30, duration: 250 }} class="mt-6 sm:mt-8 sm:text-2xl text-xl">Terms & Conditions</h2>
	<InputField label={'Terms and Condidtions'} bind:value={preFilledText} isTextarea={true}/>


	{/if}
</form>

<style>
	
	
	.btn {
		color: white;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		display: inline-block;
		width: 100%;
		border-radius: 0.25rem;
		cursor: pointer;
	}
	.submit {
		background: linear-gradient(to bottom, #44c767 5%, #50b01c 100%);
		background-color: #44c767;
	}
	.submit:hover {
		background: linear-gradient(to bottom, #50b01c 5%, #44c767 100%);
		background-color: #50b01c;
	}
	.message {
		text-align: center;
	}


	h2 {
		@apply text-slate-400 mb-4;
	}

	.small-button {
		@apply border border-slate-700 text-slate-200 px-4 py-2 rounded-lg flex gap-1.5 transition-all  items-center justify-center;
	}
	.small-button:hover {
		@apply text-slate-50 border-slate-800;
	}

	.list-item {
		@apply bg-slate-800/50 border border-slate-600/20  shadow-xl shadow-black/10 rounded-lg p-4 flex justify-between mb-5 transition-all ; 
	}

	.list-item:hover {
		@apply bg-slate-600/10;    
	}

	.empty-state {
		@apply min-h-[150px] flex items-center justify-center text-slate-300/60;
	}
</style>