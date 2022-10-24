const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/mvu.js'),
      name: 'mvu',
      fileName: (format) => `mvu.${format}.js`
    }
  }
});