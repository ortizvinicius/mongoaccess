# MongoAccess
Some functions to help working with MongoDB and Node.js for local connection, using the official MongoDB driver. Automatic connection start

## Installing
```
npm i mongoaccess --save
```

## How to use
```
const dbAccess = require('mongoaccess')('mongodb://localhost:27017/db-tests');

dbAccess.findInCollection(
  'collectionName', 
  { filterProperty: "Value" }
);

dbAccess.insertInCollection(
  'collectionName', 
  { insertProperty: "Value" }, //Object or array of objects
  optionsObj //Optional
);

dbAccess.updateInCollection(
  'collectionName', 
  { filterProperty: "Value" }, 
  { updateProperty: "Value" },
  true //True to update various documents, False for just one 
);

dbAccess.removeInCollection(
  'collectionName', 
  { filterProperty: "Value" }
);
```