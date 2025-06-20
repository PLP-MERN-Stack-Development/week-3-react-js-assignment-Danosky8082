
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
};

// PostCSS config (postcss.config.js)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
