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


let flag = 0;
let pmp = []; //previous mouse position;

function mousedown(e){
    let spos = screenToEditor(e.x,e.y);
    if(pointInPolygon(shape.rpts,shape.len,spos)){
        pmp = [e.x,e.y];
        flag = 1;
        console.log("mouse inside the triangle");
    }else{
        console.log("not inside");
    }
}

function mouseup(e){
    shape.updateRealPts();
    flag = 0;
}

function mousemove(e){
    if(flag === 1){
        const diff = [e.x-pmp[0], e.y-pmp[1], 0];
        console.log(diff[0] + " " + diff[1]);
        shape.m = translate(shape.m,diff);
        pmp = [e.x, e.y];
    }   
}

/**
 * Determine whether a point(pt) lies within the polygon(ppts)
 * 
 * @param {Number[]} ppts Array of verticies of polygon. Single array with each 3 elements represents xyz.
 * @param {Number} n Number of verticies in ppts.
 * @param {Number[]} pt Array of length 2 with each represents xy.
 * 
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
 * 
 * @param {Number} x
 * @param {Number} y
 * 
 * @return {Number[]} canvas coordinate
 */
function screenToEditor(x,y){
    return [x-canvas.width/2,y-canvas.height/2];
}

/**
 * Convert the canvas coordinate to screen coordinate 
 * 
 * @param {Number} x
 * @param {Number} y
 * 
 * @return {Number[]} screen coordinate
 */
function editorToScreen(x,y){
    return [x+canvas.width/2,y+canvas.height/2];
}