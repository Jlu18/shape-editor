function mousedclick(e){
    //Done drawing polyline
    if(selected.type === "polyline"){
        selected.id = create_mesh(selected.type);
        selected.mesh = m_mesh.get(selected.id);    
    }
}

function mouseup(e){
    //left click
    if(e.button === 0){
        //Create shape on the canvas
        if(selected.type !== "none" && selected.type !== "exist"){
            if(selected.isLine){
                selected.mesh.newPts(e.offsetX,e.offsetY);
                //done drawing line
                if(selected.mesh.done){
                    selected.id = create_mesh(selected.type);
                    selected.mesh = m_mesh.get(selected.id);
                }
            }else{
                let id = create_mesh(selected.type,{matrix:moveto(identity(),[e.offsetX,e.offsetY,0])});
            }
        }
        // }else{
        //     //check for the click
        //     // for(let n of m_mesh.getMeshNames()){
        //     //     let m = m_mesh.get(n);
        //     //     if(pointInPolygon(m.vpts,m.vlen,[e.offsetX,e.offsetY],m.matrix)){
        //     //         console.log(m.uid + " clicked!");
        //     //     }
        //     // }
        // }
    }else if(e.button === 2 && (selected.type !== "none" && selected.type !== "exist")){
        if(selected.id){
            m_mesh.delete(selected.id);
        }
    }
}

function mousemove(e){
    if(selected.isLine){
            selected.mesh.movePts(e.offsetX,e.offsetY);
    }
}

// /**
//  * Determine whether a point(pt) lies within the polygon(ppts)
//  * 
//  * @param {Number[]} ppts Array of vertices of polygon. Single array with each 3 elements represents xyz.
//  * @param {Number} n Number of vertices in ppts.
//  * @param {Number[]} pt Array of length 2 with each represents xy.
//  * 
//  * @returns {Boolean} true if point intersected with given polygon, false otherwise.
//  */
//  function pointInPolygon(ppts,n,pt,m){
//     if(n<3){
//         console.error("Error pointInPolygon: Supplied n is not enough.");
//         return false;
//     }

//     const x = pt[0];
//     const y = pt[1];

//     let intersect = false;

//     for(let i = 0, j = n-1; i < n; j = i++){
//         const xit = ppts[i*3], yit = ppts[i*3+1];
//         const xjt = ppts[j*3], yjt = ppts[j*3+1];

//         let ai = multiply(translation([xit,yit,0]),m);
//         let aj = multiply(translation([xjt,yjt,0]),m);

//         let xi = ai[12], yi = ai[13];
//         let xj = aj[12], yj = aj[13];

//         if(((yi >= y) !== (yj >= y)) 
//         && (x <= (xj - xi) * (y - yi) / (yj - yi) + xi)){
//             intersect = !intersect;
//         }
//     }
//     return intersect;
// }

// /**
//  * Convert the screen coordinate to canvas coordinate
//  * 
//  * @param {Number} x
//  * @param {Number} y
//  * 
//  * @return {Number[]} canvas coordinate
//  */
// function screenToEditor(x,y){
//     return [x-canvas.width/2,y-canvas.height/2];
// }

// /**
//  * Convert the canvas coordinate to screen coordinate 
//  * 
//  * @param {Number} x
//  * @param {Number} y
//  * 
//  * @return {Number[]} screen coordinate
//  */
// function editorToScreen(x,y){
//     return [x+canvas.width/2,y+canvas.height/2];
// }