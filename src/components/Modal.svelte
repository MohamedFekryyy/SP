<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { scale, fly } from 'svelte/transition';
  export let isModalOpen;
  export let title = "";
  export let content = "";
  export let onClose;
  export let isPrivacyModalOpen;




  $: modalClass = $isModalOpen || $isPrivacyModalOpen ? "modal-overlay" : "modal-overlay hidden";
 // Reactive statement to update class


      // Function to close the modal
      function handleClose() {
  if ($isModalOpen) isModalOpen.set(false);
  if ($isPrivacyModalOpen) isPrivacyModalOpen.set(false);
  if (onClose) onClose();
}


  // Function to handle the Escape key
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }

  /// On mount, add an event listener for the Escape key
  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<div class={modalClass} in:fly={{ y: -10 }} out:fly={{ y: 10 }} >
  <div class="modal bg-slate-100 dark:bg-slate-900/50 border border-slate-900 rounded-2xl px-4 sm:px-6 pt-4 sm:pt-6  mx-4  w-[800px] my-10  shadow-2xl shadow-black/40 transition-all backdrop-blur-xl"  
     >
    <div class="modal-header">
      <h2 class="dark:text-slate-50 text-slate-000 text-2xl">{title}</h2>
      <button on:click={handleClose} class="close-button p-2 rounded bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400 dark:hover:text-slate-100 transition-all"><svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
			  </svg></button>
    </div>
    <div class="modal-body mb-4 max-h-[460px] overflow-auto pb-5">
      <p class="dark:text-slate-300 text-slate-700 ">{@html content}</p>
      <div class="fixed bottom-0 min-w-full rounded-full left-0 bg-gradient-to-b dark:to-[#0A0F1F] dark:from-slate-900/0 from-slate-100/0 to-slate-100 h-20 z-10"></div>
    </div>
  </div>
</div>


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
    transform-origin: center; /* Add this line to set the transform origin for scaling */

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

  .hidden {
    display: none;
  }
</style>
