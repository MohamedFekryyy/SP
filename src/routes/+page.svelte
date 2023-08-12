<script>
  import Form from '../components/Form.svelte';
import ProgressBar from '../components/ProgressBar.svelte';

let steps = ['clientInfo', 'ProjectInfo', 'Items', 'Milestones'], currentActive = 1, progressBar;
const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement)
	}
	
</script>

<section class="section">
<h1>Create a Proposal</h1>
<h3>Fill in the data below, and it’ll preview</h3>
<div class="container">
    <div class="hidden"><ProgressBar {steps} bind:currentActive bind:this={progressBar}/> </div>
    
    <Form active_step={steps[currentActive-1]}/>

    <div class="step-button">
        <button class="btn-back" on:click={() => handleProgress(-1)} disabled={currentActive == 1}><svg
            class="w-5 h-4 text-slate-50 hover:scale-110 tranistion-all"
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
        </svg></button>
        <button class="btn-next w-full sm:w-[91%]" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Continue</button>
    </div>		
</div>	  
</section>

<style lang="postcss">
   :global(html) {
		background-color: theme(colors.slate.950);
	}
	h1 {
		@apply text-slate-50 text-5xl font-semibold mb-4 text-center;
	}
	h3 {
		@apply text-slate-400 text-lg font-normal text-center;
	}
	.section {
		@apply min-w-full flex flex-col items-center justify-start sm:justify-center  py-12 sm:py-32 min-h-screen px-5;
	}

	.btn-next {
		@apply bg-purple-700 px-6 py-3 text-lg font-medium rounded-lg text-slate-50 hover:bg-purple-700/90  shadow-2xl shadow-purple-700/40  transition-all;
	}

	.step-button {
		@apply max-w-[700px] gap-2 mx-auto  flex flex-col sm:flex-row justify-between  items-stretch;
	}

	.btn-back {
		@apply bg-slate-900 min-h-full mr-3 rounded-lg px-5 hover:bg-slate-900/50 transition-all cursor-pointer items-center justify-center flex;
	}
</style>