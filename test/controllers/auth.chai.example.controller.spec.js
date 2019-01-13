/*
  * This file is a continuation of what is in test/controllers/auth.controller.spec.js
  * This file's aim is to explain more chai assertion framework
  */

const assert = require('assert');
const authController = require('../../controllers/auth.controller');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
// Mount chai as promised for promises handling
// by mounting it as middleware mounting like
// system
chai.use(chaiAsPromised);

/*
 * As should will append a new property to object prototype for the sake of describing
 * the test in an more readable way, it must be initialized by execuring should fuction
 * returned from chai object as follows
 *
 * Because we are adding should to objects prototype, it will do it for the whole application
 */
const should = require('chai').should();

describe('AuthController', () => {
  beforeEach('Preparing roles...', function prepareRoles() {
    console.log('Running beforeEach');
    authController.setRoles(['user']);
    // This thow here is for the sake of demonstrating hooks error location with
    // function names for the hook on the call back and the description
    // throw({error});
  });
  describe('isAuthorized', () => {
    it('Should retrurn false if not authorized', function() {
      /*
       * This will run from beforeEach which will run before eaach test
       */
      //authController.setRoles(['user']);
      const auth = authController.isAuthorized({
        neededRole: 'admin'
      })
      // EXPECT: In the next two lines we same results for both assertions
      // As you can see, expect looks better than assert.equal
      assert.equal(false, auth);
      expect(auth).to.be.false
    });

    it('Should retrurn true if authorized', function() {
      /*
       * This will run from beforeEach which will run before eaach test
       */
      //authController.setRoles(['user']);
      
      const auth = authController.isAuthorized({
        neededRole: 'user'
      })
      // SHOULD: In the next two lines we same results for both assertions
      // As you can see, SHOULD looks better than assert.equal and expect
      // it just feels more natural to go something.should.be....
      assert.equal(true, auth);
      auth.should.be.true;
    });

    /*
      * Pending tests: You can write tests in mocha without any actual test
      * This will show as pending when the test is run
      */
    it('Should allow get method if authorized');
    it('Should not allow get method if not authorized');

  });

  describe('isAuthorizedAsync', function() {
    this.timeout(2500);
    it('Should retrurn false if not authorized', function(done) {
      /*
       * This will run from beforeEach which will run before eaach test
       */
      //authController.setRoles(['user']);
      //authController.setRoles(['user']);
      authController.isAuthorizedAsync({
        neededRole: 'admin',
        callback: isAuth => {
          assert.equal(false, isAuth);
          done();
        }
      });
    });
  });

  describe('isAuthorizedPromise', function() {
    this.timeout(2500);
    it('Should retrurn false if not authorized', function(done) {
      // should.eventually.be works for promises and is is possible to handle it
      // by using the 'promise-as-promised' library
      authController.isAuthorizedPromise('admin').should.eventually.be.false;
      done();
    });
  });
});

/*
  * Objects testing
  */
describe('Onjects testing with should and chai', function() {
  const objectOneToCompare = {
    name: 'yipi',
    userProps: {
      username: 'vicvic',
      password: 'vac vac'
    },
    age: 12
  };

  const objectTwoToCompare = {
    name: 'yipi',
    userProps: {
      username: 'vicvic',
      password: 'vac vac'
    },
    age: 12
  };

  it('Should have property username underneath userPorps', function() {
    objectOneToCompare.userProps.should.have.property('username');
  });

  it('objectOneToCompare should be equal to objectTwoToCompare', function() {
    // Deep is to actually compare two different objects to be equal, if it is not used,
    // the test is going to expect them to be the same object to be equal
    objectOneToCompare.should.deep.equal(objectTwoToCompare)
  })

});
