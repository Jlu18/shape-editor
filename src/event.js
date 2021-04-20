/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
function initEvent(canvas){
    canvas.addEventListener("mousedown", mousedown);
    canvas.addEventListener("mouseup"  , mouseup);
    canvas.addEventListener("mousemove", mousemove);

    document.addEventListener("keydown",(e)=>{
        //undo
        if(e.ctrlKey && e.code === "KeyZ"){
            console.log("undo");
        }
    })
}


function mousedown(e){
    if(pointInPolygon(shape.vpts,shape.len,screenToEditor(e.x,e.y))){
        console.log("mouse inside the triangle");
    }else{
        console.log("mouse not inside the triangle");
    }
}

function mouseup(e){
    //console.log(e.x);
}

function mousemove(e){
}

/**
 * Determine whether a point(pt) lies within the polygon(ppts)
 * 
 * @param {Number[]} ppts Array of verticies of polygon. Single array with each 3 elements represents xyz.
 * @param {Number} n Number of verticies in ppts.
 * @param {Number[]} pt Array of length 2 with each represents xy.
 * @returns {Boolean} true if point intersected with given polygon, false otherwise.
 */
function pointInPolygon(ppts,n,pt){
    if(n<3){
        console.error("Error pointInPolygon: Supplied n is not enough.");
        return false;
    }

    const x = pt[0];
    const y = pt[1];

    for(let i = 0, j = n-1; i < n; j = i++){
        const xi = ppts[i*3], yi = ppts[i*3+1];
        const xj = ppts[j*3], yj = ppts[j*3+1];

        const intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if(intersect) return true;
    }

    return false;
}


/**
 * Convert the screen coordinate to canvas coordinate
 */
function screenToEditor(x,y){
    return [x-canvas.width/2,y-canvas.height/2];
}

/**
 * 
 */
function editorToScreen(x,y){

}