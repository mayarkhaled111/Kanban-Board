/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: '50px',
    },
    colors: {
      background: '#D3E5ED',
      CardBackGround: '#BAD1DF',
      borderColor: '#3382bb',
      customThumb: '#A0BDD1', 
      customTrack: '#C3D9E5',
    },
    extend: {}
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
}

