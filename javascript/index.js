"use strict";
window.onload = function(){
let nav = document.querySelector("#navArea");
let btn = document.querySelector(".toggle-btn");

btn.onclick = () => {
    nav.classList.toggle("open");
};
}