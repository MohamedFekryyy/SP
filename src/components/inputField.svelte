<script>
	export let value, label, type = 'text', isTextarea = false, placeholder = '', tooltip = '';
	
	function typeAction(node){
		node.type = type;
	}
</script>

<p class="form-label">
	{#if label}
		<label class="label flex items-center" for>{label}  {#if tooltip}
			<span class="tooltip-container">
				<span class="ml-2 absolute top-[-10px]"><svg class="w-4 h-4 text-slate-500 hover:text-slate-300 transition-all " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
				  </svg></span>
				<span class="tooltip-text">{tooltip}</span>
			</span>
		{/if}
		</label>
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

	.input::placeholder {
		@apply text-slate-500;
	}

	.tooltip-container {
	position: relative;
	display: inline-block;
	cursor: pointer;
}



.tooltip-text {
	@apply p-2.5 shadow-lg bg-slate-950/40 absolute bottom-5 left-auto right-auto text-left text-slate-400 rounded-lg border border-slate-700/30 backdrop-blur-md text-[15px] leading-6;
	visibility: hidden;
	width: 300px;
	z-index: 1;
	opacity: 0;
	transition: opacity 0.3s;
}

.tooltip-container:hover .tooltip-text {
	@apply visible opacity-100;

}


</style>