const assert = require('assert');
const should = require('chai').should();

describe('Basic mocha test', () => {
  it('Should throw errors', () => {
    assert.equal(3, 3);
  });

  it('Should allow testing nulls', function() {
    const iAmNull = null;
    // null.should will not work as expected since null will not carry the shoyld property
    // iAmNull.should.not.exist;

    // We use should variable at the very top should
    should.not.exist(iAmNull);
  });
});

/**
 * When dealing with try catch within tests
 * you need to thow an error by means of throw
 * function throw() in tthe catch statement
 * for the sake of avoifing try statement forcing
 * tests to pass
 */
