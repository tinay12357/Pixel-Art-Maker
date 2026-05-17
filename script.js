let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("grid-width");
let gridHeight = document.getElementById("grid-height");
let colotButton = document.getElementById("color-input");
let eraseButton = document.getElementById("erase-btn");
let paintButton = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

// 14:14
//Events object
let events = {
    mouse:{
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch:{
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

// Drawing/erasing condition is false at beginning
let draw = false;
let erase = false;

//Detect a touch device
const isTouchDevice = () => {
    try{
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    }catch(e){
        deviceType = "mouse";
        return false;
    }
};
isTouchDevice();
