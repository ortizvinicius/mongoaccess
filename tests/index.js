const { expect } = require('chai');

const dbAccess = require('../index')('mongodb://localhost:27017', 'db-tests');

describe('MongoAccess Test', () => {

  it('Should have `startConnection` property', () => {
    expect(dbAccess).to.have.property('startConnection');
  });

  it('Should have `find` object', () => {
    expect(dbAccess).to.have.property('find')
  });

  it('Should have `insert` object', () => {
    expect(dbAccess).to.have.property('insert')
  });

  it('Should have `update` object', () => {
    expect(dbAccess).to.have.property('update')
  });
  
  it('Should have `remove` object', () => {
    expect(dbAccess).to.have.property('remove')
  });

});

describe('MongoAccess -> startConnection() Test', () => {

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

describe('MongoAccess -> find() Test', () => {

  it('Without first argument should return an exception', () => {
    return dbAccess.find()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.find('config');

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
    return dbAccess.find('tests', {"a":"1"})
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

});

describe('MongoAccess -> insert() Test', () => {

  it('Without first argument should return an exception', () => {
    return dbAccess.insert()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.insert('tests', {a:1});

  it('With second argument as object should return a Promise', () => {
    expect(collection).to.have.property('then');
  });

  it('With second argument as object should return an object with insertedCount as 1', () => {
    return collection
      .then((results) => {
        expect(results).to.be.a('object');

        expect(results.insertedCount).to.equal(1);
      });
  });

  var collection2 = dbAccess.insert('tests', [{b:2}, {c:3}]);

  it('With second argument as array should return a Promise', () => {
    expect(collection2).to.have.property('then');
  });

  it('With second argument as array should return an object with insertedCount as 2', () => {
    return collection2
      .then((results) => {
        expect(results).to.be.a('object');

        expect(results.insertedCount).to.equal(2);
      });
  });

});

describe('MongoAccess -> update() Test', () => {

  it('Without first argument should return an exception', () => {
    return dbAccess.update()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.update('tests', {a:1}, {d:4});

  it('Should return a Promise', () => {
    expect(collection).to.have.property('then');
  });

  it('Should return an object', () => {
    return collection
      .then((results) => {
        expect(results).to.be.a('object');
      });
  });

  it('Without updateObj parameter should return an excepton', () => {
    return dbAccess.update('tests', {a:1})
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

});

describe('MongoAccess -> remove() Test', () => {
  
  it('Without first argument should return an exception', () => {
    return dbAccess.remove()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.remove('tests', {b:2});
  
  it('Should return a Promise', () => {
    expect(collection).to.have.property('then');
  });

  it('Should return an object', () => {
    return collection
      .then((results) => {
        expect(results).to.be.a('object');
      });
  });
  
});

describe('MongoAccess -> aggregate() Test', () => {
  
  it('Without first argument should return an exception', () => {
    return dbAccess.aggregate()
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  it('Without seconds argument should return an exception', () => {
    return dbAccess.aggregate('tests')
      .catch((e) => {
        expect(e).to.have.property('name');
        expect(e).to.have.property('message');
        expect(e).to.have.property('stack');
      });
  });

  var collection = dbAccess.aggregate('config', [{ $match: { c: 3 } }]);

  it('With both arguments should return a Promise', () => {
    expect(collection).to.have.property('then');
  });

  it('With both arguments should return an array', () => {
    return collection
      .then((results) => {
        expect(results).to.be.a('array');
      });
  });

});