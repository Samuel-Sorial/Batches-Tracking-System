const fs = require('fs');

let db = 'batches';
let port = '3030';
process.argv.forEach((val) => {
  if (val.toLowerCase().indexOf('port') !== -1) {
    port = val.substr(5);
  } else if (val.toLowerCase().indexOf('db') !== -1) {
    db = val.substr(3);
  }
});
fs.writeFileSync(
  '.env',
  `PORT=${port}
MONGODB_URI=mongodb://localhost/${db}
DEVELOPMENT_MONGODB_URI=mongodb://localhost/${db}development
TEST_MONGODB_URI=mongodb://localhost/${db}test`
);
