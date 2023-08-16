<script>
	import InputField from './inputField.svelte';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let formData = {
		clientName: '',
		clientCompany: '',
		clientEmail: '',
		freelancerEmail: '',
		freelancerName: '',
		projName: '',
		projDescription: '',
		projGoals: '',
		preFilledText: '',
	};

	export let items = [{ title: "", price: 0 }]; // Proposal items including title and price

	export let milestones = [{ title: '', deliveryDate: '' }]; // Milestones items including title and delivery date

	export let startDate = null; // Start date
	export let endDate = null; // End date

	export let active_step;

	const handleSubmit = () => {
		console.log("Your form data => ", formData)
	}

	// Initialize the items array with one empty item
	// let items = [{ title: "", price: 0 }]; // Commented since it's exported

	function addItem() {
		items = [...items, { title: "", price: 0 }];
	}

	function removeItem(index) {
		items = items.filter((_, i) => i !== index);
	}

	// Computed total sum of the prices
	$: totalSum = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

	// let milestones = [{ title: '', deliveryDate: '' }]; // Commented since it's exported

	function addMilestone() {
		milestones = [...milestones, { title: '', deliveryDate: '' }]; // Adding a new milestone
	}

	function removeMilestone(index) {
		milestones = milestones.filter((_, i) => i !== index);
	}

	function updateDates() {
	if (milestones.length === 0) {
		startDate = null;
		endDate = null;
		return;
	}
	const timestamps = milestones
		.map(milestone => new Date(milestone.deliveryDate).getTime())
		.filter(timestamp => !isNaN(timestamp)); // Only include valid dates

	if (timestamps.length === 0) {
		startDate = null;
		endDate = null;
		return;
	}
	const minDate = new Date(Math.min(...timestamps));
	const maxDate = new Date(Math.max(...timestamps));
	startDate = minDate.toISOString().split('T')[0];
	endDate = maxDate.toISOString().split('T')[0];
}


	onMount(updateDates);

	let preFilledText = `1. Payment structure: 50% at approval, the rest at delivery.
	2. Additional work for components that appear in the scope of work will be quoted before any invoicing.
	3. New components that are not described in the scope of work will be assessed in a new estimate.
	4. In case of project cancellation after the work has started, the client will pay for the relative part of the work.`;


</script>


<form class="form-container dark:bg-slate-900/50 bg-white backdrop-blur-xl border dark:border-slate-900 border-slate-200 rounded-2xl px-4 sm:px-6 pt-4 sm:pt-6 pb-none sm:pb-1 max-w-[800px] my-6 sm:my-10 mx-auto shadow-2xl dark:shadow-slate-950 shadow-slate-300 transition-all" on:submit={handleSubmit}>
	{#if active_step == 'clientInfo'}
	<h2 in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="sm:text-xl text-lg dark:text-slate-300 text-slate-700 mb-4">Client Info</h2>
	<div in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="flex flex-col sm:flex-row gap-x-4"><div class="w-full sm:w-[50%]"><InputField label={'Contact Person'} bind:value={formData.clientName} placeholder="Elon Musk"/></div>
	<div class="w-full sm:w-[50%]"><InputField label={'Company Name'} bind:value={formData.clientCompany} placeholder="X"/></div></div>
		<div in:fade={{ duration: 400, delay: 50 }} out:slide={{ y: -30, duration: 250 }}><InputField type={'email'} label={'Client Email'} bind:value={formData.clientEmail} placeholder="elon@x.com"/></div>
		<h2 in:fade={{ duration: 400, delay: 200 }} out:slide={{ y: -30, duration: 250 }} class="mt-4 sm:mt-8 sm:text-xl text-lg dark:text-slate-300 text-slate-700 mb-4">Your Info</h2>

		<div in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="flex flex-col sm:flex-row gap-x-4"><div in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }} class="w-full sm:w-[50%]"><InputField label={'Your Name'} bind:value={formData.freelancerName} placeholder="John Doe"/></div>
		<div in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }} class="w-full sm:w-[50%]"><InputField type={'email'} label={'Your Email'} bind:value={formData.freelancerEmail} placeholder="john@doe.com"/></div></div>

	{:else if active_step == 'ProjectInfo'}
	<h2 in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="sm:text-xl text-lg dark:text-slate-300 text-slate-700 mb-4">Project Info</h2>
	<div in:fade={{ duration: 400, delay: 50 }} out:slide={{ y: -30, duration: 250 }}><InputField label={'Project Name'} bind:value={formData.projName} placeholder="Design a better logo"/></div>
	<div in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }}><InputField label={'Project Description'} bind:value={formData.projDescription} isTextarea={true} tooltip="Describe your project in clear and simple terms. What needs to be done? This helps everyone involved understand the scope and purpose of the project."/> </div>
	<div in:fade={{ duration: 400, delay: 150 }} out:slide={{ y: -30, duration: 250 }}><InputField label={'Project Goals'} bind:value={formData.projGoals} isTextarea={true} tooltip="Define the desired outcomes of the project. What are you aiming to achieve? Examples: Increase sales, decrease abandoned carts, improve user engagement, etc."/></div>
	{:else if active_step == 'Items'}
	<h2 in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="sm:text-xl text-lg dark:text-slate-300 text-slate-700 mb-4">Proposal Items</h2>
	{#each items as item, index}
	<div class="list-item  sm:p-4 p-2 gap-y-4 flex-col md:flex-row dark:bg-slate-800/50 bg-slate-100/60 hover:bg-white border border-slate-200 dark:border-slate-600/20 dark:shadow-black/10 dark:shadow-xl shadow shadow-slate-200 dark:hover:bg-slate-600/10" in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }}>
		<input type="text" placeholder="Item Name" bind:value={item.title} class="text-base bg-transparent placeholder:text-slate-500 dark:text-slate-50 text-slate-900 outline-none  grow min-w-[65%]" />
		<input type="number" placeholder="Price" bind:value={item.price} class="text-base rounded-lg dark:bg-slate-700/50 bg-slate-200/70 px-3 py-3 grow max-w-[200px] text-slate-900 dark:text-slate-50 placeholder:text-slate-500 outline-none" />
		<button on:click={() => removeItem(index)} class=" absolute md:top-0 md:right-0 top-3 right-3 md:relative pl-3 grow flex items-center justify-center dark:text-slate-400 text-slate-500 hover:text-slate-700 dark:hover:text-slate-100 transition-all">
			<svg class="sm:w-3.5 sm:h-3.5 w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
			  </svg>
		</button>
	  </div>
	
	{/each}

	{#if items.length === 0}
		<div class="empty-state dark:text-slate-300/60 text-slate-500" in:fade={{ duration: 400 }} out:fade={{ duration: 250 }}>
			<p>Click the <span class="dark:text-slate-300 text-slate-800">"Add Item"</span> button to add deliverables.</p>
		</div>
	{/if}

	<div class="mb-4 flex flex-col gap-y-4 sm:flex-row justify-between items-center mt-8" in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }}><button on:click={addItem} class="small-button dark:hover:text-slate-50 hover:border-slate-300 dark:hover:border-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 w-full sm:w-auto"> <svg class="md:w-4 md:h-4 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
	  </svg> Add Item</button>
	<div class="sm:text-xl text-lg font-bold text-slate-900 dark:text-slate-50" in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }}><span class=" sm:text-xl text-lg font-normal text-slate-400">Total</span> ${totalSum}</div>	
</div>
	{:else if active_step == 'Milestones'}
	<h2 in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }} class="sm:text-xl text-lg dark:text-slate-300 text-slate-700 mb-4">Project Milestones</h2>

		
	<div>
		{#each milestones as milestone, index}
			<div class="list-item  sm:p-4 p-2 gap-y-4 flex-col md:flex-row dark:bg-slate-800/50 bg-slate-100/60 hover:bg-white border border-slate-200 dark:border-slate-600/20 dark:shadow-black/10 dark:shadow-xl shadow shadow-slate-200 dark:hover:bg-slate-600/10" in:fade={{ duration: 400 }} out:slide={{ y: -30, duration: 250 }}>
				<input type="text" placeholder="Milestone Title" bind:value={milestone.title} class="bg-transparent placeholder:text-slate-500 dark:text-slate-50 text-slate-900 outline-none text-base grow min-w-[65%]" />
				<input type="date" placeholder="Delivery Date" bind:value={milestone.deliveryDate} on:input={updateDates} class="cursor-pointer rounded-lg dark:bg-slate-700/50 bg-slate-200/70 px-3 py-3 grow max-w-[200px] text-slate-900 dark:text-slate-50 placeholder:text-slate-500 outline-none text-base" />
				<button  on:click={() => removeMilestone(index)} class=" md:top-0 md:right-0 absolute top-3 right-3 md:relative pl-3 grow flex items-center justify-center dark:text-slate-400 text-slate-500 hover:text-slate-700 dark:hover:text-slate-100 transition-all" ><svg class="sm:w-3.5 sm:h-3.5 w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
				  </svg></button>
			</div>
		{/each}

		{#if milestones.length === 0}
		<div class="empty-state dark:text-slate-300/60 text-slate-500" in:fade={{ duration: 400 }} out:fade={{ duration: 250 }}>
			<p>Click the <span class="dark:text-slate-300 text-slate-800">"Add Milestone"</span> button to add Milestones.</p>
		</div>
	{/if}

		<div class="mb-4 flex flex-col gap-y-4 sm:flex-row justify-between items-center mt-8" in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: -30, duration: 250 }}>
			<button on:click={addMilestone} class="dark:hover:text-slate-50 hover:border-slate-300 dark:hover:border-slate-800 small-button w-full sm:w-auto border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"> <svg class="md:w-4 md:h-4 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
			  </svg>Add Milestone</button>
			  {#if milestones.length > 0 && (startDate || endDate)}

			  <div class="dates flex sm:flex-row flex-col gap-x-4" in:fade={{ duration: 400, delay: 150 }} out:slide={{ y: -30, duration: 250 }}>
			<p class="text-slate-900 dark:text-slate-50 text-md sm:text-lg"><span class="text-slate-400">Start Date</span> {startDate}</p>
			<p class="text-slate-900 dark:text-slate-50 text-md sm:text-lg"><span class="text-slate-400">End Date</span> {endDate}</p>
		</div>
		{/if}
		
		</div>

	</div> 
	<h2 in:fade={{ duration: 400, delay: 200 }} out:slide={{ y: -30, duration: 250 }} class="mt-6 sm:mt-8 sm:text-xl text-lg dark:text-slate-300 text-slate-700 mb-4">Terms & Conditions</h2>
	<div in:fade={{ duration: 400, delay: 250}} out:slide={{ y: -30, duration: 250 }} ><InputField  bind:value={preFilledText} isTextarea={true}/></div>


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




	.small-button {
		@apply border  px-4 py-2 rounded-lg flex gap-1.5 transition-all  items-center justify-center;
	}


	.list-item {
		@apply relative  rounded-lg  flex justify-between mb-5 transition-all; 
	}


	.empty-state {
		@apply min-h-[150px] flex items-center justify-center ;
	}
</style>