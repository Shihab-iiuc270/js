// const allbox = document.getElementsByClassName("box"
// );

// for(let i = 0; i<allbox.length;i++){
//     const element = allbox[i];
//     element.style.background ="green";
//     if(element.innerText=="box-5"){
//         element.style.background = "red"
//     }


// }
// var a = document.querySelector("h1")
// a.addEventListener("click",function(){
//     a.innerHTML ="hello"
//     a.style.color = "yellow"
//     a.style.backgroundColor ='black'
// })
 var bulb = document.querySelector("#bulb")
 var btn = document.querySelector("button")

 var flag = 0;

 btn.addEventListener("click",function(){
    if(!flag){
        bulb.style.backgroundColor ="yellow"
        console.log("click on")
        flag = 1;
    }
    else{
        bulb.style.backgroundColor ="white"
        console.log("click of")
        flag = 0;

    }
 })