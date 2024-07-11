// task 1

console.log('task 1')

//task 2

// setTimeout(()=>{
//     console.log('task 2')
// },"1000");

// task 3

console.log('task 3');

//task 4

console.log('task 4');

function resolveAfter1Second(){
    return new Promise (resolve =>{
        setTimeout(()=>{
            resolve('resolved');
            // console.log('resolve')
        },1000);
    })
}

resolveAfter1Second().then(value =>{
    console.log(value);
    setTimeout(()=>{
        Promise.resolve('resolved after 2 seconds');
    },500);
}).then(value =>{
    console.log(value)
})