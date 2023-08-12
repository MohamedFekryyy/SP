<script>
	import InputField from './inputField.svelte';
	export let active_step;
	let formData = {
		clientName: '',
		clientCompany: '',
		email: '',
		password: '',
		address: '',
		city: '',
		country: '',
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
		<InputField label={'Contact Person'} bind:value={formData.clientName}/>
		<InputField label={'Company Name'} bind:value={formData.clientCompany}/>
		<InputField type={'password'} label={'Password'} bind:value={formData.password}/>
	{:else if active_step == 'Address'}
		<InputField label={'Address'} bind:value={formData.address}/>
		<InputField label={'City'} bind:value={formData.city}/>
		<InputField label={'Country'} bind:value={formData.country}/>
		<InputField label={'Postcode'} bind:value={formData.postcode}/>
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
		@apply border border-slate-700 rounded-2xl p-8 gap-y-2 max-w-[700px] mx-auto;
		
	}
	.btn{
		color: white;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		display: inline-block;
		width: 100%;
		border-radius: 0.25rem;
		cursor:pointer;
	}
	.submit{
		background:linear-gradient(to bottom, #44c767 5%, #50b01c 100%);
		background-color:#44c767;
	}
	.submit:hover {
		background:linear-gradient(to bottom, #50b01c 5%, #44c767 100%);
		background-color:#50b01c;
	}
	.message{
		text-align: center;
	}
</style>