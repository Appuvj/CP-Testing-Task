const {AreaOfCircle} = require('../src/app1')
const {suite,test} = require('mocha')

describe('Suite 1', ()=>{
    it ('AreaOfCircle(2) should return 12.566370614359172',()=>{
        expect(AreaOfCircle(2)).to.be.equal(12.566370614359172)
    })
})


context('Suite 2', ()=>{
    specify('AreaOfCircle(2) should return 12.566370614359172',()=>{
        expect(AreaOfCircle(2)).to.be.equal(12.566370614359172)
    })
})



suite('Suite 3', ()=>{
    test('AreaOfCircle(2) should return 12.566370614359172',()=>{
        expect(AreaOfCircle(2)).to.be.equal(12.566370614359172)
    })
})

let expect;
(async ()=> {
    const chai = await import('chai');
    expect = chai.expect;
})();