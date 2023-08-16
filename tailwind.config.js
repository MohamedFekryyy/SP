/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
	  extend: {
		boxShadow: {
		  'inner-dark': 'inset 0 0 300px 200px #030616', // Replace with actual color value if needed
		  'inner-light': 'inset 0 0 300px 200px #F3F5F8', // Replace with actual color value if needed
		},
	  },
	},
	plugins: [],
  };
  