const MongoClient = require('mongodb').MongoClient;

module.exports = (aUrl, aDB) => {    

  var db,
      module = {};

  /**
   * @param {String} url
   * @param {String} dbName
   */
  module.startConnection = (url, dbName) => {
    return new Promise((successCallback, errorCallback) => {

      function startDbAccess(){
        MongoClient.connect(aUrl, (e, client) => { 
          if(e){
            errorCallback(e);
          } else {
            db = client.db(aDB);
            successCallback(db);
          }
        });
      }

      try {

        if(db) db.close();

        if(url){
          aUrl = url;
        } else if(!aUrl) {
          var dbException = new Error();
          dbException.name = 'Arguments error';
          dbException.message = 'Empty `url`';
          errorCallback(dbException);
        }

        if(dbName){
          aDB = dbName;
        } else if(!aDB) {
          var dbException = new Error();
          dbException.name = 'Arguments error';
          dbException.message = 'Empty `dbName`';
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
          collectionException(errorCallback);
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
          collectionException(errorCallback);
        } else {
          var dbCollection = db.collection(collection);
          
          var insertDocuments = typeof documents === 'object' && documents !== null ? documents : [];
          insertDocuments = [].concat(insertDocuments);

          dbCollection.insertMany(insertDocuments, (e, result) => {
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
   * @param {Boolean} customUpdateObj
   */
  module.update = (collection, filter, updateObj, customUpdateObj) => { 
    return new Promise((successCallback, errorCallback) => {
      
      function update(){
        if(!collection){
          collectionException(errorCallback);
        } else {
          var dbCollection = db.collection(collection);

          var updateFilter = typeof filter === 'object' && filter !== null ? filter : {};
          
          if(updateObj){
            dbCollection.updateMany(updateFilter, customUpdateObj ? updateObj : {$set: updateObj}, (e, result) => {
              if(e){
                errorCallback(e);
              } else {
                successCallback(result);
              }
            });
          } else {
            var updateException = new Error();
            updateException.name = 'Arguments error';
            updateException.message = 'Empty `updateObj`';
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
          collectionException(errorCallback);
        } else {
          var dbCollection = db.collection(collection);

          var removeFilter = typeof filter === 'object' && filter !== null ? filter : {};

          dbCollection.deleteMany(removeFilter, {}, (e, result) => {
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

  /**
   * @param {String} collection
   * @param {Object} [pipeline]
   * @param {Object} [options]
   */
  module.aggregate = (collection, pipeline, options) => {
    return new Promise((successCallback, errorCallback) => {

      function aggregate(){
        if(!collection){
          collectionException(errorCallback);
        } if(!pipeline){
          var pipelineException = new Error();
          pipelineException.name = 'Arguments error';
          pipelineException.message = 'Empty `pipeline`';
          errorCallback(pipelineException);
        } else {

          var agrPipeline = typeof pipeline === 'object' && pipeline !== null ? pipeline : [],
              agrOptions = typeof options === 'object' && options !== null ? options : {};

          var dbCollection = db.collection(collection);

          dbCollection.aggregate(agrPipeline, agrOptions).toArray((e, docs) => {
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
            .then(aggregate)
            .catch(errorCallback);
        } else aggregate(); 
      } catch (e){
        errorCallback(e); 
      }
    });
  };

  return module;

}

function collectionException(callback){
  var collectionException = new Error();
      collectionException.name = 'Arguments error';
      collectionException.message = 'Empty `collection`';
  callback(collectionException);
}