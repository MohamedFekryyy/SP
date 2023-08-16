<script>
     import { browser } from '$app/environment';

let darkMode = true;

function handleSwitchDarkMode() {
    darkMode = !darkMode;

    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    darkMode
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark');
}

if (browser) {
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
        darkMode = true;
    } else {
        document.documentElement.classList.remove('dark');
        darkMode = false;
    }
}
</script>

<div class="dark:bg-slate-900 bg-slate-100 border border-slate-200 dark:border-slate-700/40 shadow-lg dark:shadow-slate-900 rounded-full  p-3 flex items-center justify-center">
    <input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
    <label for="theme-toggle" />
    
</div>

<style lang="postcss">
    #theme-toggle {
        @apply hidden;
    }

    #theme-toggle + label {
        @apply inline-block cursor-pointer  h-5 w-5  rounded-full duration-300 content-[''];
    }

    #theme-toggle:not(:checked) + label {
        @apply bg-amber-500;
    }

    #theme-toggle:checked + label {
        @apply bg-transparent  shadow-amber-500;
        box-shadow: inset -5px -6px 1px 1px #97A2B7;
        
    }
</style>