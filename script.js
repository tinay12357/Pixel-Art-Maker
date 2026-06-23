40
//Intended to make an object for each drawing made. 
//This way we should be able to save images.
//I don't think I'll figure out how to load it.
let canvasArea = document.getElementById("canvas-area");
let newCanvasBtn = document.getElementById("new-canvas-btn");
let drawOpt = document.getElementById("draw-opt");
let palette = document.querySelector(".palette");
let drawingMenu = document.querySelector(".new-drawing-menu");
let colorsPalette = document.getElementById("color-selection");
let penColor = document.createElement("button");
penColor.innerHTML = `Change color`;
drawOpt.appendChild(penColor);
let addColor = document.createElement("button");
addColor.innerHTML = `Add to palette`;
palette.appendChild(addColor);
let showButton = document.createElement("button");
showButton.innerHTML = "Show/Hide Grid"
drawOpt.appendChild(showButton);
let erase = document.getElementById("erase-btn");
class Drawing {
    pixelsSize = 40;
    height;
    width;
    title;
    canvas;
    fillColor = "rgb(0,0,0)";
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    getPosition(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left -20;
        let y = event.clientY - rect.top-20;
        return [x, y];
    }


    createCanvas(name) {
        if (this.width >25){
            this.pixelsSize = 20;
        }
        else if (this.width >15){
            this.pixelsSize = 30;
        }
        this.title = name;
        
        name = document.createElement("canvas");
        name.height = this.height * this.pixelsSize;
        name.width = this.width * this.pixelsSize;
        name.style.position = "absolute";
        name.classList.add("transparent");
        console.log(name);
        canvasArea.appendChild(name);
        this.canvas = name;
        name.addEventListener('click', (e) => {
            let coord = this.getPosition(name, e);
            this.colorPixel(coord);

        });
        
        penColor.addEventListener("click", ()=>{
            let color = document.getElementById("color-input").value;
            let r = parseInt(color.slice(1,3),16);
            let g = parseInt(color.slice(3,5),16);
            let b = parseInt(color.slice(5,7),16);
            this.fillColor = `rgb(${r}, ${g}, ${b})`;
        });

        addColor.addEventListener("click", () => {
            let pen = document.createElement("button");
            pen.classList.add = "pen";
            colorsPalette.appendChild(pen);
            pen.style.backgroundColor = this.fillColor;
            pen.addEventListener("click", () =>{
                this.fillColor = pen.style.backgroundColor;
            });
        });

        erase.addEventListener("click", () => {
            this.fillColor = "transparent";
        });

        let save = document.createElement("button");
        save.classList.add = "save-btn";
        save.innerHTML = `Save ${this.title}`;
        drawingMenu.appendChild(save);
        save.addEventListener('click', ()=> {
            var url = name.toDataURL();
            var a = document.createElement('a');
            a.download = this.title + '.png';
            a.href = url;
            a.textContent = 'Download PNG';
            drawingMenu.appendChild(a);
        })
        
    }

    startDraw() {
        
        
        let grid = document.createElement("canvas");
        showButton.addEventListener("click", () =>{
            grid.classList.toggle("hide");
            this.canvas.classList.toggle("transparent");
        })
        grid.height = this.height * this.pixelsSize;
        grid.width = this.width * this.pixelsSize;
        grid.classList.add("under-grid");
        canvasArea.appendChild(grid);
        grid.style.position = "absolute";
        const ctx = grid.getContext("2d");
        let wCount = 0;
        while (wCount <= this.width) {
            ctx.beginPath();
            ctx.moveTo(wCount * this.pixelsSize, 0);
            ctx.lineTo(wCount * this.pixelsSize, this.height * this.pixelsSize);
            wCount++;
            ctx.stroke();
        }
        let wCount2 = 0;
        let lCount2 = 0;
        while (lCount2 <= this.height) {
            ctx.beginPath();
            ctx.moveTo(0, lCount2 * this.pixelsSize);
            ctx.lineTo(this.width * this.pixelsSize, lCount2 * this.pixelsSize,);
            wCount2++;
            lCount2++;
            ctx.stroke();
        }

        let closeBtn = document.createElement("button");
        closeBtn.innerHTML = `Close/Open ${this.title}`;
        this.closing = closeBtn;
        drawingMenu.appendChild(closeBtn);
        closeBtn.addEventListener("click", ()=>{
            grid.classList.toggle("hide");
            this.canvas.classList.toggle("hide");
        });

    }
    close(){
        if (this.canvas.classList.contains("hide")){
            console.log(this.canvas);
        }else{
            this.closing.click();
        }
        
    }
    
    setHeight(newHeight) {
        this.height = newHeight;
    }
    setWidth(newWidth) {
        this.height = newWidth;
    }

    colorPixel(coordinates) {
        const ctx = this.canvas.getContext("2d");
        let x = (coordinates[0]) - (coordinates[0]%this.pixelsSize);
        let y = coordinates[1] - (coordinates[1]%this.pixelsSize);
        //console.log(coordinates, x, y);
        if (this.fillColor != "transparent"){
            ctx.fillStyle =this.fillColor;
            ctx.fillRect(x, y, this.pixelsSize, this.pixelsSize);
        }else{
            ctx.clearRect(x, y, this.pixelsSize, this.pixelsSize);
        }
        
        ctx.stroke();
    }

    
}
let picturesArray = [];

picture1 = new Drawing(10, 10)
picture1.createCanvas("picture1");
console.log(picture1);
console.log(canvasArea.childElementCount)
picture1.startDraw();
picturesArray.push(picture1);
let allPics = document.getElementById("pictures");
newCanvasBtn.addEventListener("click", () => {
    let newGridWidth = document.getElementById("grid-width").value;
    let newGridHeight = document.getElementById("grid-height").value;
    let newTitle = document.getElementById("picture-title").value;
    console.log(newGridWidth);
    if ((newGridWidth != 0) && (newGridHeight != 0) && (newTitle != "")){
        drawing = new Drawing(newGridWidth,newGridHeight);
        drawing.createCanvas(newTitle);
        drawing.startDraw();
        for (let i = 0; i < colorsPalette.childElementCount; i++){
            console.log(colorsPalette)
            colorsPalette.removeChild(colorsPalette[i]);
        }
        picturesArray.forEach(element => {
            console.log(element);
            element.close();
        });
        picturesArray.push(drawing);
        
    }else{
        alert("Please enter required information");
    }
    
});

