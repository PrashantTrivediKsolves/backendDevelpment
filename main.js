
const prompt=require('prompt-sync')({ autocomplete: [] });
// Ensure autocomplete is initialized as an empty array
const age=prompt("Please enter your age:");

if(age<18)
{
    console.log("you will get 20% response");
}
else{
    console.log("you get a 30% senior discount");
}