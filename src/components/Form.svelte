<script>
	import InputField from './inputField.svelte';
	import { fade, slide } from 'svelte/transition';
 
	export let active_step;
	let formData = {
		clientName: '',
		clientCompany: '',
		clientEmail: '',
		clientDescription: '',
		address: '',
		city: '',
		country: '',
		postcode: '',
		account_name: '',
		card_no: ''
	};

	const handleSubmit = () => {
		console.log('Your form data => ', formData);
	};
</script>

<form class="form-container" on:submit={handleSubmit}>
	{#if active_step == 'Info'}
		<div in:fade={{ duration: 300 }} out:slide={{ y: 30, duration: 300 }} class="flex gap-4">
			<div class="half-width">
				<InputField label={'Contact Person'} bind:value={formData.clientName} />
			</div>
			<div class="half-width">
				<InputField label={'Company Name'} bind:value={formData.clientCompany} />
			</div>
		</div>
		<div in:fade={{ duration: 300 }} out:slide={{ y: 30, duration: 300 }}>
			<InputField type={'email'} label={'Company Email'} bind:value={formData.clientEmail} />
		</div>
		<div in:fade={{ duration: 300 }} out:slide={{ y: 30, duration: 300 }}>
			<InputField
				label={'Company Description'}
				bind:value={formData.clientDescription}
				isTextarea={true}
			/>
		</div>
	{:else if active_step == 'Address'}
		<div in:fade={{ duration: 300 }} out:slide={{ y: 30, duration: 300 }}>
			<InputField label={'Address'} bind:value={formData.address} />
		</div>
		<div in:fade={{ duration: 300 }} out:slide={{ y: 30, duration: 300 }}>
			<InputField label={'City'} bind:value={formData.city} />
		</div>
		<div in:fade={{ duration: 300 }} out:slide={{ y: 30, duration: 300 }}>
			<InputField label={'Country'} bind:value={formData.country} />
		</div>
		<div in:fade={{ duration: 300 }} out:slide={{ y: 30, duration: 300 }}>
			<InputField label={'Postcode'} bind:value={formData.postcode} />
		</div>
	{:else if active_step == 'Payment'}
		<InputField label={'Account Name'} bind:value={formData.account_name} />
		<InputField label={'Card No'} bind:value={formData.card_no} />
	{:else if active_step == 'Confirmation'}
		<div class="message">
			<h2>Thank you for choosing us</h2>
			<button class="btn submit">Finish </button>
		</div>
	{/if}
</form>

<style>
	.form-container {
		@apply bg-slate-900/50 border border-slate-900 rounded-2xl px-8 pt-8 pb-3 max-w-[700px] my-10 mx-auto shadow-2xl shadow-black/40;
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
