const MongoClient = require('mongodb').MongoClient;

module.exports = (dbUrl) => {    

  var db,
      module = {};

  /**
   * @param {String} url
   */
  module.startConnection = (url) => {
    return new Promise((successCallback, errorCallback) => {

      function startDbAccess(){
        MongoClient.connect(dbUrl, (e, dbConn) => { 
          if(e){
            errorCallback(e);
          } else {
            db = dbConn;
            successCallback(db);
          }
        });
      }

      try {

        if(db) db.close();

        if(url){
          dbUrl = url;
        } else if(!dbUrl) {
          var dbException = new Error();
          dbException.name = 'Arguments error';
          dbException.message = 'Argument `dbUrl` was not given';
          errorCallback(dbException);
        }

        startDbAccess();

      } catch (e){
        errorCallback(e);
      }
    });
  };

  /**
   * @param {String} collection
   * @param {Object} filter
   * @param {Object} options
   */
  module.find = (collection, filter, options) => {
    return new Promise((successCallback, errorCallback) => {

      function find(){
        if(!collection){
          var collectionException = new Error();
          collectionException.name = 'Arguments error';
          collectionException.message = 'Argument `collection` was not given';
          errorCallback(collectionException);
        } else {

          var findFilter = typeof filter === 'object' && filter !== null ? filter : {},
              findOptions = typeof options === 'object' && options !== null ? options : {};

          var dbCollection = db.collection(collection);

          dbCollection.find(findFilter, findOptions).toArray((e, docs) => {
            if(e){
              errorCallback(e);
            } else {
              successCallback(docs);
            }
          });
        }
      }

      try {
        if(!db){
          module.startConnection()
            .then(find)
            .catch(errorCallback);
        } else find(); 
      } catch (e){
        errorCallback(e); 
      }
    });
  };

  /**
   * @param {String} collection
   * @param {Object} documents
   */
  module.insert = (collection, documents) => {
    return new Promise((successCallback, errorCallback) => {

      function insert(){
        if(!collection){
          var collectionException = new Error();
          collectionException.name = 'Arguments error';
          collectionException.message = 'Argument `collection` was not given';
          errorCallback(collectionException);
        } else {

          var dbCollection = db.collection(collection);
          
          var insertDocuments = typeof documents === 'object' && documents !== null ? documents : {};

          dbCollection.insert(insertDocuments, (e, result) => {
            if(e){
              errorCallback(e);
            } else {
              successCallback(result);
            }
          });
        }
      }

      try {
        if(!db){
          module.startConnection()
            .then(insert)
            .catch(errorCallback);
        } else insert(); 
      } catch (e){
        errorCallback(e); 
      }
    });
  };

  /**
   * @param {String} collection
   * @param {Object} filter
   * @param {Object} updateObj
   * @param {Boolean} multi
   */
  module.update = (collection, filter, updateObj, multi) => { 
    return new Promise((successCallback, errorCallback) => {
      
      function update(){
        if(!collection){
          var collectionException = new Error();
          collectionException.name = 'Arguments error';
          collectionException.message = 'Argument `collection` was not given';
          errorCallback(collectionException);
        } else {

          var dbCollection = db.collection(collection);

          var updateFilter = typeof filter === 'object' && filter !== null ? filter : {};
          
          if(updateObj){
            if(multi){
              dbCollection.updateMany(updateFilter, {$set: updateObj}, (e, result) => {
                if(e){
                  errorCallback(e);
                } else {
                  successCallback(result);
                }
              });
            } else {
              dbCollection.updateOne(updateFilter, {$set: updateObj}, (e, result) => {
                if(e){
                  errorCallback(e);
                } else {
                  successCallback(result);
                }
              });
            }
          } else {
            var updateException = new Error();
            updateException.name = 'Update error';
            updateException.message = 'Empty updateObj var';
            errorCallback(updateException); 
          }
        }
      }
      
      try {
        if(!db){
          module.startConnection()
            .then(update)
            .catch(errorCallback);
        } else update(); 
      } catch (e){
        errorCallback(e); 
      }
    });
  };

  /**
   * @param {String} collection
   * @param {Object} filter
   */
  module.remove = (collection, filter) => { 
    return new Promise((successCallback, errorCallback) => {
      
      function remove(){
        if(!collection){
          var collectionException = new Error();
          collectionException.name = 'Arguments error';
          collectionException.message = 'Argument `collection` was not given';
          errorCallback(collectionException);
        } else {

          var dbCollection = db.collection(collection);

          var removeFilter = typeof filter === 'object' && filter !== null ? filter : {};
          dbCollection.remove(removeFilter, {}, (e, result) => {
            if(e){
              errorCallback(e);
            } else {
              successCallback(result);
            }
          });
        }
      }
      
      try {
        if(!db){
          module.startConnection()
            .then(remove)
            .catch(errorCallback);
        } else remove(); 
      } catch (e){
        errorCallback(e); 
      }
    });
  };

  return module;

}