'use strict';

/**
 * Module dependencies.
 */
var AV = require('leanengine');
var User = AV.User;

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function () {
  before(function (done) {
    user = new User();
    user.set({
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });
    user2 = new User();
    user2.set({
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    done();
  });

  describe('Method Save', function () {
    it('should begin with no users', function () {
      var query = new AV.Query(User);
      return query.find().should.finally.have.length(0);
    });

    it('should be able to save without problems', function () {
      return user.signUp().should.be.fulfilled();
    });

    it('should fail to save an existing user again', function () {
      return user2.signUp().should.be.rejected();
    });
  });

  after(function () {
    return User.destroyAll([user, user2].filter(function (user) {
      return user && !user.isNew();
    })).should.be.fulfilled();
  });
});
