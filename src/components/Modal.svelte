<script>
  export let isModalOpen = false;
  export let title = "";
  export let content = "";

  function handleClose() {
    isModalOpen = false;
    dispatch('close');
  }
</script>

{#if isModalOpen}
<div class="modal-overlay">
  <div class="modal bg-slate-900/50 border border-slate-900 rounded-2xl px-4 sm:px-6 pt-4 sm:pt-6 pb-none mx-4 sm:pb-1 w-[800px] my-10  shadow-2xl shadow-black/40 transition-all backdrop-blur-xl">
    <div class="modal-header">
      <h2 class="text-slate-50 text-2xl">{title}</h2>
      <button on:click={handleClose} class="close-button p-2 rounded bg-transparent hover:bg-slate-700/50 text-slate-400 hover:text-slate-100 transition-all"><svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
			  </svg></button>
    </div>
    <div class="modal-body">
      <p>{content}</p>
    </div>
  </div>
</div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @apply bg-slate-950/90 backdrop-blur-md;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    position: relative;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @apply mb-5;
  }
  .close-button {
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
