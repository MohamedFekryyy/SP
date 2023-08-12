<script>
	export let value, label, type = 'text', isTextarea = false, placeholder = '';
	
	function typeAction(node){
		node.type = type;
	}
</script>

<p class="form-label">
	{#if label}
		<label class="label" for>{label}</label>
	{/if}
	{#if isTextarea}
		<textarea class="input" bind:value={value} rows="4" placeholder={placeholder}></textarea>
	{:else}
		<input use:typeAction class="input" bind:value={value} placeholder={placeholder}/>
	{/if}
</p>

<style>
	.form-label {
		@apply text-slate-400 text-base;
		text-align: left;
	}
	.input {
		@apply bg-slate-800/70 rounded-md text-white py-2 px-2.5 mt-2 mb-5 transition-all border border-slate-700/30 text-lg;
		width: 100%;
		display: block;
	}
	.input:hover {
		@apply bg-slate-800/40;
	}
	.input:focus {
		@apply border-slate-700/50 shadow-md shadow-black/60 bg-slate-800/40;
		outline: none;

	}

</style>