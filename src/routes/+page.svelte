<script>
  import Form from '../components/Form.svelte';
import ProgressBar from '../components/ProgressBar.svelte';

let steps = ['Info', 'Address', 'Payment', 'Confirmation'], currentActive = 1, progressBar;
const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement)
	}
	
</script>

<section class="section">
<h1>Create a Proposal</h1>
<h3>Fill in the data below, and it’ll preview</h3>
<div class="container">
    <ProgressBar {steps} bind:currentActive bind:this={progressBar}/>
    
    <Form active_step={steps[currentActive-1]}/>

    <div class="step-button">
        <button class="btn-back" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Prev</button>
        <button class="btn-next" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Continue</button>
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
    @apply min-w-full flex flex-col items-center justify-start  py-32 min-h-screen;
}

.btn-next {
    @apply bg-purple-300 px-6 py-3 text-lg font-medium rounded-lg text-blue-950;
}

.step-button {
    @apply  max-w-[700px] mx-auto mt-10;
}

.btn-back {
    
}
</style>