export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Dark Theme Colors */
        'background-dark': '#050505',
        'surface-dark': '#0A0A0A',
        
        /* Light Theme Colors */
        'background-light': '#FFFFFF',
        'surface-light': '#F9FAFB',
        
        /* Accents */
        primary: '#C7FF2F', // Neon Lime for Dark Sections
        secondary: '#2563EB', // Brand Blue for Light Sections
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      }
    },
  },
  plugins: [],
}
