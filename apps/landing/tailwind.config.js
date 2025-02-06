const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const  {defaultThemeColors} = require('../../libs/shared/config/src/lib/tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      ... defaultThemeColors
    },
  },
  plugins: [],
};
