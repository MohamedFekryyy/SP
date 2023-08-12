<script>
	import Form from '../components/Form.svelte';
	import ProgressBar from '../components/ProgressBar.svelte';

	let steps = ['Info', 'Address', 'Payment', 'Confirmation'],
		currentActive = 1,
		progressBar;
     
        const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement)
	}
</script>

<section class="section">
	<h1>Create a Proposal</h1>
	<h3>Fill in the data below, and it’ll preview</h3>
	<div class="container">
        
        <Form active_step={steps[currentActive-1]}/>
		
        <div class="step-button">
			<div class="flex w-[30%]">
				<button class="btn-back" on:click={() => handleProgress(-1)} disabled={currentActive == 1}
					><svg
						class="w-5 h-4 text-gray-800 dark:text-white"
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
					</svg></button
				>
				<button
					class="btn-next"
                    on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Continue</button
				>
			</div>

			<ProgressBar {steps} bind:currentActive bind:this={progressBar} />
		</div>
	</div>
</section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.slate.900);
	}
	h1 {
		@apply text-slate-50 text-4xl font-semibold mb-4;
	}
	h3 {
		@apply text-slate-400 text-lg font-normal;
	}
	.section {
		@apply min-w-full flex flex-col items-center justify-center  py-32 min-h-screen;
	}

	.btn-next {
		@apply bg-purple-200 px-6 py-3 text-lg font-medium rounded-lg text-blue-950 hover:bg-purple-300  transition-all;
	}

	.step-button {
		@apply max-w-[700px] mx-auto  flex justify-between items-center;
	}

	.btn-back {
		@apply bg-slate-600 min-h-full mr-3 rounded-lg px-5 hover:bg-slate-700 transition-all cursor-pointer;
	}
</style>
