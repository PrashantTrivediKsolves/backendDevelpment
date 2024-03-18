//console.log("sever file is runing");

// function add(a,b){
//     return a+b;
// }

// var add=function(a,b){
//     return a+b;
// }

// var add=(a,b)=>{
//     return a+b;
// }

// var add=(a,b)=>a+b;

// var result=add(2,5);

// console.log(result);
// (
//     function(a,b)
//     {
//         console.log("hellooooooo");
//         console.log("prashant trivedi");
//     }
// )();


// function callback()
// {
//     console.log("prashant is calling a callback function");
// }

// const add=function(a,b,callback)
// {
//     var res=a+b;
//     console.log("result is calculated: "+res);// main function work comleted
//     callback();
// }
// // add(3,4,callback);

// add(2,3,function()
// {
//     console.log("add completed");
// });

// add(2,3,()=>
// {
//     console.log("now it is arrow function");
// })

// const { log } = require("console");
// var fs=require("fs");
// var os=require("os");

// var user=os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt',"hi "+user.username+"\n",()=>
// {
//     console.log("file is created");
// })

const notes=require("./notes.js");
console.log("Server file is ready");
var _=require('lodash');

const age=notes.age;
console.log(notes);
console.log(age);
console.log(notes.addNumber(2,3));

var data=["person","person",1,2,1,2,"name","age",'2'];

var filter=_.uniq(data);
console.log(filter);

// console.log(_.isString('prashant'));

console.log(_.isString(true));