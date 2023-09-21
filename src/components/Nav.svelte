<script>
    import ThemeSwitch from '../components/ThemeSwitch.svelte';
    export let showThemeSwitch = true; 
    import { showAuth } from './store';


  const toggleAuth = () => {
    $showAuth = !$showAuth;
  };


</script>

<nav class="nav relative z-10  p-5 sm:p-7 min-w-full  flex flex-row justify-between items-center">
    
    <div class='{showThemeSwitch ? '' : 'mx-auto'} logos relative flex items-center justify-center '>
      <a href="/" class="  dark:visible invisible "><img src="logo-on-dark.svg" class="h-8 sm:h-9" alt="Swift Proposal Logo"/></a>
      <a href="/" class=" dark:invisible visible absolute "><img src="logo-on-light.svg" class="h-8 sm:h-9" alt="Swift Proposal Logo"/></a>
    </div>

    {#if showThemeSwitch}
    <ThemeSwitch />
{/if}
<button on:click={toggleAuth} class="text-slate-200">Sign In</button>

  
</nav>

