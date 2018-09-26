const chai = require('chai'),
      expect = require('chai').expect,
      mocha = require('mocha');

const dbAccess = require('../index')('mongodb://localhost:27017/db-tests');

describe('dataAccess/dbAccess Test', () => {

  it('Should have `startConnection` property', () => {
    expect(dbAccess).to.have.property('startConnection');
  });

  it('Should have `findInCollection` object', () => {
    expect(dbAccess).to.have.property('findInCollection')
  });

  it('Should have `insertInCollection` object', () => {
    expect(dbAccess).to.have.property('insertInCollection')
  });

  it('Should have `updateInCollection` object', () => {
    expect(dbAccess).to.have.property('updateInCollection')
  });
  
  it('Should have `removeInCollection` object', () => {
    expect(dbAccess).to.have.property('removeInCollection')
  });

});

describe('dataAccess/dbAccess -> startConnection() Test', () => {

  it('With url argument wrong should return an exception', () => {
    return dbAccess.startConnection('wrongurl')
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var connection = dbAccess.startConnection();

  it('Without argument should return a Promise', () => {
    expect(connection).to.have.property('then');
  });

  it('Without argument should return a db object', () => {
    return connection
      .then((db) => {
        expect(db).to.be.a('object');
      });
  });

  connection = dbAccess.startConnection('mongodb://localhost:27017/db-tests');

  it('With right argument should return a Promise', () => {
    expect(connection).to.have.property('then');
  });

  it('With right argument should return a db object', () => {
    return connection
      .then((db) => {
        expect(db).to.be.a('object');
      });
  });

});

describe('dataAccess/dbAccess -> findInCollection() Test', () => {

  it('Without first argument should return an exception', () => {
    return dbAccess.findInCollection()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.findInCollection('config');

  it('With first argument should return a Promise', () => {
    expect(collection).to.have.property('then');
  });

  it('With first argument should return an array', () => {
    return collection
      .then((results) => {
        expect(results).to.be.a('array');
      });
  });

  it('With wrong second argument should return an exception', () => {
    return dbAccess.findInCollection('tests', {"a":"1"})
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

});

describe('dataAccess/dbAccess -> insertInCollection() Test', () => {

  it('Without first argument should return an exception', () => {
    return dbAccess.insertInCollection()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.insertInCollection('tests', {a:1});

  it('With second argument as object should return a Promise', () => {
    expect(collection).to.have.property('then');
  });

  it('With second argument as object should return an object with insertedCount as 1', () => {
    return collection
      .then((results) => {
        expect(results).to.be.a('object');
        expect(results).to.have.property('insertedCount');
        expect(results).to.have.property('ops');
        expect(results).to.have.property('insertedIds');
        expect(results).to.have.property('result');

        expect(results.insertedCount).to.equal(1);
      });
  });

  var collection2 = dbAccess.insertInCollection('tests', [{b:2}, {c:3}]);

  it('With second argument as array should return a Promise', () => {
    expect(collection2).to.have.property('then');
  });

  it('With second argument as array should return an object with insertedCount as 2', () => {
    return collection2
      .then((results) => {
        expect(results).to.be.a('object');
        expect(results).to.have.property('insertedCount');
        expect(results).to.have.property('ops');
        expect(results).to.have.property('insertedIds');
        expect(results).to.have.property('result');

        expect(results.insertedCount).to.equal(2);
      });
  });

});

describe('dataAccess/dbAccess -> updateInCollection() Test', () => {

  it('Without first argument should return an exception', () => {
    return dbAccess.updateInCollection()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.updateInCollection('tests', {a:1}, {d:4});

  it('Should return a Promise', () => {
    expect(collection).to.have.property('then');
  });

  it('Should return an object', () => {
    return collection
      .then((results) => {
        expect(results).to.be.a('object');
        expect(results).to.have.property('result');
      });
  });

  var collection2 = dbAccess.updateInCollection('tests', {a:1}, {d:4}, true);

  it('With multi argument as true should return an object', () => {
    return collection2
      .then((results) => {
        expect(results).to.be.a('object');
        expect(results).to.have.property('result');
      });
  });

  it('Without updateObj parameter should return an excepton', () => {
    return dbAccess.updateInCollection('tests', {a:1})
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

});

describe('dataAccess/dbAccess -> removeInCollection() Test', () => {
  
  it('Without first argument should return an exception', () => {
    return dbAccess.removeInCollection()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.removeInCollection('tests', {b:2});
  
  it('Should return a Promise', () => {
    expect(collection).to.have.property('then');
  });

  it('Should return an object', () => {
    return collection
      .then((results) => {
        expect(results).to.be.a('object');
        expect(results).to.have.property('result');
      });
  });
  
});