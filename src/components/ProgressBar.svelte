<script>
	export let steps = [],
		currentActive = 1;
	let circles, progress;

	export const handleProgress = (stepIncrement) => {
		circles = document.querySelectorAll('.circle');
		if (stepIncrement == 1) {
			currentActive++;

			if (currentActive > circles.length) {
				currentActive = circles.length;
			}
		} else {
			currentActive--;

			if (currentActive < 1) {
				currentActive = 1;
			}
		}

		update();
	};

	function update() {
		circles.forEach((circle, idx) => {
			if (idx < currentActive) {
				circle.classList.add('active');
			} else {
				circle.classList.remove('active');
			}
		});

		const actives = document.querySelectorAll('.active');

		progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
	}
</script>

<div class="progress-container" bind:this={circles}>
	<div class="progress" bind:this={progress} />
	{#each steps as step, i}
		<div class="circle {i == 0 ? 'active' : ''}" />
	{/each}
</div>

<style>
	.progress-container {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin-bottom: 30px;
		max-width: 100%;
		width: 350px;
	}

	.progress-container::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 100%;
		z-index: -1;
	}

	.progress {
		background-color: #3498db;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 0%;
		z-index: -1;
		transition: 0.4s ease;
	}

	.circle {
		@apply h-2 rounded-full bg-slate-700;
		color: #999;
		width: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.4s ease;
		cursor: pointer;
	}

	.circle::after {
		@apply bg-white;
		content: attr(data-title) ' ';
		position: absolute;
		bottom: 35px;
		transition: 0.4s ease;
	}

	.circle.active::after {
		@apply bg-white;
	}

	.circle.active {
		border-color: #3498db;
	}
</style>
