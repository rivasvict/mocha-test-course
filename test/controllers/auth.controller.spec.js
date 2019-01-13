const assert = require('assert');
const authController = require('../../controllers/auth.controller');

describe('AuthController', () => {
  /*
    * BeforeEach is supposed to run on every test
    * that is below (levels) the level where beforeEach is
    * executed. Every describe and it, will run it.
    *
    * If a beforeEach is executed outside of any describe,
    * it will run before EVERY test even in other files.
    * This is because that everyting that is outside of describe,
    * will run withing the WOLE test context
    *
    * Remember to use named functions instead of anonymous. This
    * is because it will help us to see errors inside beforeEach,
    * otherwise, it will not say where is the error within beforeEaches
    *
    * BeforeEach even can have descriptions as a string beforew the callback
    * sent for the hook. This also helps to be able to identify the right
    * beforeEach when errors occur
    */
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
      assert.equal(false, authController.isAuthorized({
        neededRole: 'admin'
      }));
    });

    it('Should retrurn true if authorized', function() {
      /*
       * This will run from beforeEach which will run before eaach test
       */
      //authController.setRoles(['user']);
      
      assert.equal(true, authController.isAuthorized({
        neededRole: 'user'
      }));
    });

    /*
      * Pending tests: You can write tests in mocha without any actual test
      * This will show as pending when the test is run
      */
    it('Should allow get method if authorized');
    it('Should not allow get method if not authorized');

  });

  /*
   * Mocha has a limit for timeout by thefault of 2000 ms,
   * this can be changed by setting it directly to mocha context
   * this.timeout(7000).
   *
   * To access this, you should make sure that you can access the
   * mocha context by not using arrow functions
   */
  describe('isAuthorizedAsync', function() {
    /*
      * Use done to indicate that an asynchronous test has ended
      */
    this.timeout(2500);
    it('Should retrurn false if not authorized', function(done) {
      /*
       * This will run from beforeEach which will run before eaach test
       */
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
});

/*
 * only: This will run only the test that you use as describe.only() or
 * it.only() for when we have tests we want to focus on
 *
 * skip: this can be used to skup tests instead of commenting tests and
 * tests that are used with skip, will appear as pending in our tests.
 * Skip can be used same as only as describe.skip(() and it.sckip().
 * you can also call this.skip() within your code to force skip the current
 * test (useful when we have to skip tests due to environmental reasons.
 * It will basically not swallow tests
 */
