const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const authController = require('../../controllers/auth.controller');
chai.use(chaiAsPromised);

/*
 * Sinon is a library that will allow you to monitor functions
 * execution, you would be able to spy a function to know things
 * such as how many times a function has been called, if it has
 * been called, etc.
 *
 * you can equalize a function that needs to be called to
 * sinon.spy(), that way you will be able to spy on a function's
 * execution. `const aFunctionToTest = sinon.spy()`, then if you
 * console.log(aFunctionToTest), you will be able to see metadata
 * related to function's
 *
 * This is very useful for when you have to test external functions
 * execution from third party libraries
  */

describe('Spy and stubs tests through sinon', function() {
  describe('getIndex', function() {
    let user = {};
    beforeEach('Set user', function () {
      user = {
        roles: ['user'],
        isAuthorized: function(neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };

      authController.setUser(user);
    });
    it('Should render the index if authorized', function() {
      const isAuth = sinon.stub(user, 'isAuthorized').returns(true);
      // For try catch, we can also change the returns by throws
      // and it hsould force the error flow of the function
      // const isAuth = sinon.stub(user, 'isAuthorized').throws();
      // Then the whole test should assume that isAuth has returned
      // an error, therefore the rendered themplate should be error
      // instead of index
      //
      // res.render.firstCall.args[0].should.equal('error');
      // Because we have defined that the function should throw and error
      // when entering into the catch statement of the isAuth function

      /*
        * Stub is a spy that can help you replace the result of a function,
        * for the previous case, we made the function isAuthorized to be true
        *
        * This helps us to get rid of attention to any possinle function we do
        * not want to focus on.
        *
        * The result of this is a function that returns whatever I send into the
        * returns property with all spy api calls available for getting the data
        * from the call..
        */
      const req = { user };
      const res = {
        render: sinon.spy()
      };

      /*
        * Mocks are a combination of spies and stubs with predetermined expectations
        *
        * Because we can mock the res object we would not need to spy on render
        * method anymore, it can be replaced with an empty function
        *
        * 1. The use of mocks needs a declaration:
        * const mock = sinon.mock(res);
        *
        * 2. The creation of an expectation
        * mock.expects('render').once().withExactArgs('index');
        *
        * 3. Verify after we call the whole function we are testing (getIdex),
        * The first two steps should be done after the object to mock (res) and
        * prior to the testing function (getIndex)
        *
        * mock.verify();
        *
        * This mock will help us cleaning the syntax of spy test for res
        * object
        *
        * comparison:
        *
        * without mock:
        * res.render.firstCall.args[0].should.equal('index');
        *
        * with mock
        * mock.expects('render').once().withExactArgs('index');
        * mock.verify();
        */
      authController.getIndex(req, res);
      /*
        * Both calledOnce and firstCall are properties provided
        * by sinon spy
        *
        * Both calledOnce and firstCall properties from sinon spy
        * will provide you with data you can verify from a
        * function's execution.
        */
      res.render.calledOnce.should.be.true;
      // The next two lines can be replaced with a mock like doing
      // mock.verify();
      // This will verify the expectation of a mock defined earlier (prior
      // to the first call of the function getIndex)
      isAuth.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('index');
      // If one of these assertions fails, the whole line is likely to fail
    });
  });

  describe('authController', function() {
    describe('isAuthorized', function() {
      let user = {};
      beforeEach('Set user', function () {
        user = {
          roles: ['user'],
          isAuthorized: function(neededRole) {
            return this.roles.indexOf(neededRole) >= 0;
          }
        };

        /*
         * You could have cases where you need to spy on
         * functions that already exist, sinon can help
         * with that as well, it can be done like in the
         * form sinon.spy(object, 'object.[function name]');
         */

        sinon.spy(user, 'isAuthorized');
        authController.setUser(user);
      });

      it('Should return false if not authorized', function() {
        const isAuth = authController.isAuthorized('admin');
        expect(isAuth).to.be.false;
        // This in the next line is possible because we seyt the spy
        // to look at user.isAuthorized by doing
        // sinon.spy(user, 'isAuthorized');
        user.isAuthorized.calledOnce.should.be.true;
      });
    });
  });
});


