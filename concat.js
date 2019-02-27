var concat = require('concat-files');
concat([
  './dist/inline.bundle.js',
  './dist/vendor.bundle.js',
  './dist/polyfills.bundle.js',
  './dist/main.bundle.js'
], './dist/airship-signin.min.js', function(err) {
  if (err) throw err
  console.log('done');
});
concat([
  './dist/styles.bundle.css',
], './dist/airship-signin.min.css', function(err) {
  if (err) throw err
  console.log('done');
});