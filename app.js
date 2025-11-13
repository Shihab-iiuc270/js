const allbox = document.getElementsByClassName("box"
);

for(let i = 0; i<allbox.length;i++){
    const element = allbox[i];
    element.style.background ="green";
    if(element.innerText=="box-5"){
        element.style.background = "red"
    }


}