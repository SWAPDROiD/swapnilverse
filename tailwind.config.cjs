module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0e1a',
        surface: '#0d1526',
        'surface-high': '#0d1b2e',
        accent: '#00d4ff',
        border: '#1a2a4a',
        'border-subtle': '#162236',
        'text-primary': '#ffffff',
        'text-secondary': '#8899aa',
        'text-muted': '#546e7a',
        secondary: '#00ffff',
        glow: '#00bcd4',
        active: '#00e5ff',
        progress: '#00acc1',
        trace: '#00ff9f',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 20px 50px rgba(0, 212, 255, 0.2)',
      },
    },
  },
  plugins: [],
};
