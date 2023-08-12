<script>
	import InputField from './inputField.svelte';
	import { fade, slide } from 'svelte/transition';
	export let active_step;
	let formData = {
		clientName: '',
		clientCompany: '',
		clientEmail: '',
		clientDescription: '',
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


</script>

<form class="form-container" on:submit={handleSubmit}>
	{#if active_step == 'Info'}
	<div in:fade={{ duration: 400 }} out:slide={{ y: 30, duration: 250 }} class="flex gap-4"><div class="half-width"><InputField label={'Contact Person'} bind:value={formData.clientName} placeholder="Elon Musk" tooltip="Enter the full name of the contact person"/></div>
	<div class="half-width"><InputField label={'Company Name'} bind:value={formData.clientCompany} placeholder="X"/></div></div>
		<div in:fade={{ duration: 400, delay: 50 }} out:slide={{ y: 30, duration: 250 }}><InputField type={'email'} label={'Client Email'} bind:value={formData.clientEmail} placeholder="elon@x.com"/></div>
		<div in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: 30, duration: 250 }}><InputField label={'Company Description'} bind:value={formData.clientDescription} isTextarea={true} placeholder="an American social media company based in San Francisco, California. The company operated the social networking service Twitter and previously the Vine short video app and Periscope livestreaming service."/></div>
	{:else if active_step == 'Address'}
	<div in:fade={{ duration: 400, delay: 50 }} out:slide={{ y: 30, duration: 250 }}><InputField label={'Project Name'} bind:value={formData.projName} placeholder="Design a better logo"/></div>
	<div in:fade={{ duration: 400, delay: 100 }} out:slide={{ y: 30, duration: 250 }}><InputField label={'Project Description'} bind:value={formData.projDescription} isTextarea={true}/></div>
	<div in:fade={{ duration: 400, delay: 150 }} out:slide={{ y: 30, duration: 250 }}><InputField label={'Project Goals'} bind:value={formData.projGoals} isTextarea={true}/></div>
	{:else if active_step == 'Payment'}
		<InputField label={'Account Name'} bind:value={formData.account_name}/>
		<InputField label={'Card No'} bind:value={formData.card_no}/>
	{:else if active_step == 'Confirmation'}
		<div class="message">
			<h2>Thank you for choosing us</h2>
			<button class="btn submit">Finish </button>
		</div>
	{/if}
</form>

<style>
	
	.form-container {
		@apply bg-slate-900/50 border border-slate-900 rounded-2xl px-8 pt-8 pb-3 max-w-[700px] my-10 mx-auto shadow-2xl shadow-black/40 transition-all;
	}
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

	.half-width {
		width: 50%;
	}
</style>