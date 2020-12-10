/* eslint-disable */ 
const critical = require('critical');

critical.generate({
  base: 'build/',
  src: 'index.html',
  target: 'index.html',
  inline: true,
  minify: true,
  dimensions: [
    {
      height: 568,
      width: 320,
    },
    {
      height: 768,
      width: 1024,
    },
  ],
});
