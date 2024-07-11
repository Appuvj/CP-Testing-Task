const {add,sub} = require('../src/app')
//const expect = require('chai').expect

//-------------------------------------------------------------------------------------------------------------

// BDD - 'decribe' and 'it'

describe('Suite 1', ()=>{
    it ('add(2,3) should return 5',()=>{
        expect(add(2,3)).to.be.equal(5)
    })
})

describe('Suite 2', ()=>{
    it ('sub(2,3) should return -1',()=>{
        expect(sub(2,3)).to.be.equal(-1)
    })
})

let expect;
(async ()=> {
    const chai = await import('chai');
    expect = chai.expect;
})();


