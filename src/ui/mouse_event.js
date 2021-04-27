let flag = 0;
let pmp = []; //previous mouse position;

function mousedown(e){
    
}

function mouseup(e){
    if(selected.name !== "none"){
        create_mesh(selected.name,{matrix:[...selected.mesh.matrix]});
    }
        
}

function mousemove(e){
    if(selected.mesh){
        selected.mesh.matrix = moveto(selected.mesh.matrix,[e.offsetX,e.offsetY,0]);
    }
}

/**
 * Determine whether a point(pt) lies within the polygon(ppts)
 * 
 * @param {Number[]} ppts Array of vertices of polygon. Single array with each 3 elements represents xyz.
 * @param {Number} n Number of vertices in ppts.
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