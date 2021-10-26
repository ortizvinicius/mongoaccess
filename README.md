# MongoAccess
Small library with some asynchronous functions (Promises) to help working with MongoDB and Node.js, using the official MongoDB driver. Automatic connection start.

## Installing
```
npm i mongoaccess --save
```

## How to use
```js 
const db = require('mongoaccess')('mongodb://localhost:27017', 'db-name');

db.find('collection', { filterProperty: "Value" })
  .then((documents) => console.log(documents)) //Array of objects
  .catch((e) => console.error(e));

db.insert('collection', { insertProperty: "Value" }) //Object or array of objects
  .then(() => console.log('Done!'))
  .catch((e) => console.error(e));

db.update('collection', 
  { filterProperty: "Value" }, 
  { updateProperty: "Value" }) 
  .then(() => console.log('Done!'))
  .catch((e) => console.error(e));

db.remove('collection', { filterProperty: "Value" })
  .then(() => console.log('Done!'))
  .catch((e) => console.error(e));

db.aggregate('collection', [pipeline], [options])
  .then((documents) => console.log(documents)) //Array of objects
  .catch((e) => console.error(e));
```