# MongoAccess
Some functions to help working with MongoDB and Node.js for local connection, using the official MongoDB driver. Automatic connection start

## Installing
```
npm i mongoaccess --save
```

## How to use
```
const dbAccess = require('mongoaccess')('mongodb://localhost:27017/db-tests');

dbAccess.findInCollection('collectionName', { filterProperty: "Value" })
.then((documents) => { //array of objects
  console.log(documents);
}).catch((e) => {
  console.error(e);
});

dbAccess.insertInCollection('collectionName', 
  { insertProperty: "Value" }, //Object or array of objects
  optionsObj) //Optional
.then(() => console.log('Done!'))
.catch((e) => console.error(e));

dbAccess.updateInCollection('collectionName', 
  { filterProperty: "Value" }, 
  { updateProperty: "Value" },
  true) //True to update various documents, False for just one
.then(() => console.log('Done!'))
.catch((e) => console.error(e));

dbAccess.removeInCollection('collectionName', { filterProperty: "Value" })
.then(() => console.log('Done!'))
.catch((e) => console.error(e));
```