<script>
    import { createEventDispatcher } from 'svelte';
  
    export let isOpen = false; // Prop to control whether the modal is open or closed
    export let title = ''; // Prop for the modal title
    export let content = ''; // Prop for the modal content
  
    // Event dispatcher to notify parent component when the modal is closed
    const dispatch = createEventDispatcher();
  
    function closeModal() {
      dispatch('close');
    }
  </script>
  
  <div class={isOpen ? 'modal open' : 'modal'} on:click={closeModal}>
    <div class="modal-content" on:click={e => e.stopPropagation()}>
      <div class="modal-header">
        <h2>{title}</h2>
        <button on:click={closeModal} class="close-modal-btn">X</button>
      </div>
      <div class="modal-body">
        {content}
      </div>
    </div>
  </div>
  
  <style>
.modal {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

.modal.open {
  display: flex;
}

.modal-content {
  background-color: #ffffff;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-modal-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  /* Add styles for the body content */
}
  </style>
  