<script>
	export let value,
		label,
		type = 'text',
		isTextarea = false;

	function typeAction(node) {
		node.type = type;
	}
</script>

<p class="form-label">
	{#if label}
		<label class="label" for>{label}</label>
	{/if}
	{#if isTextarea}
		<textarea use:typeAction class="input" bind:value rows="4" />
	{:else}
		<input use:typeAction class="input" bind:value />
	{/if}
</p>

<style>
	.form-label {
		@apply text-slate-400 text-base;
		text-align: left;
	}
	.input {
		@apply bg-slate-800 rounded-md text-white px-3 mt-2 mb-4;
		width: 100%;
		display: block;
		padding: 0.5rem 0;
	}
</style>
