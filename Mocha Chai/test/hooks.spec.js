// const expect = require('chai').expect

let expect;
(async ()=>{
    const chai = await import('chai');
    expect = chai.expect;
})();

describe('HooksSuit 1',()=>{
    before(()=>{
        console.log('before')
    });

    after(()=>{
        console.log('after')
    });

    beforeEach(()=>{
        console.log('beforeEach')
    });

    afterEach(()=>{
        console.log('afterEach')
    });
})