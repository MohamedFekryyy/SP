<script>
	import { onMount } from 'svelte';
	export let value, label, type = 'text', isTextarea = false, placeholder = '', tooltip = '';
	
	function typeAction(node){
		node.type = type;
	}

	function resizeTextarea(event) {
  const target = event.target;
  target.style.height = 'auto'; // Reset the height
  target.style.height = target.scrollHeight + 'px'; // Set to scroll height
}


onMount(() => {
  if (isTextarea) {
    const textarea = document.querySelector('.input');
    resizeTextarea({ target: textarea });
  }
});

</script>

<p class="form-label">
	{#if label}
		<label class="label flex items-center  text-sm sm:text-base dark:text-slate-500 text-slate-500" for>{label}  {#if tooltip}
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
		<textarea 
		class="input  text-base shadow-md shadow-transparent outline-none focus:shadow-slate-200 dark:focus:bg-slate-800/40 dark:focus:shadow-slate-950 focus:bg-slate-50  dark:focus:border-slate-700/50 focus:border-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 dark:bg-slate-800/70 bg-slate-100 dark:text-white text-slate-950 dark:border-slate-700/30 border-slate-200/80" 
		bind:value={value} 
		on:input={resizeTextarea}
		rows="4" 
		placeholder={placeholder}
		></textarea>
	{:else}
		<input use:typeAction class="input  text-base shadow-md shadow-transparent outline-none focus:shadow-slate-200 dark:focus:bg-slate-800/40 dark:focus:shadow-slate-950 focus:bg-slate-50 focus:border-slate-200  dark:focus:border-slate-700/50 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 dark:bg-slate-800/70 bg-slate-100 dark:text-white text-slate-950 dark:border-slate-700/30 border-slate-200/80" bind:value={value} placeholder={placeholder}/>
	{/if}
</p>

<style>
	.form-label {
		text-align: left;
		font-family: 'Inter';
	}
	.input {
		@apply  rounded-md  py-2 px-2.5 mt-2 mb-5 transition-all border  ;
		width: 100%;
		display: block;
		font-family: 'Inter';
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

textarea {
  overflow: hidden;
  resize: none; /* Disables manual resizing */
}


</style>