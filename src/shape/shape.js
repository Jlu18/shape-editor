/*
file where it holds all the datas of shape that created in the editor
*/
class Shape{
    constructor(vpts,n,ipts,isLine=false){
        if(!Array.isArray(vpts) || !Array.isArray(ipts)){
            console.error("Shape Error: Supplied vertex or index buffer is not array.");
            return;
        }
        //create buffer ids
        this.processBuffer(vpts,ipts);
        this.vpts = vpts;
        this.len = n;
        this.ipts = ipts;
    }

    /**
     * Polygon function pass datas of pts and index to the rendering pipeline
     * 
     * @param {Number[]} pts      array for VBO
     * @param {Number[]} indicies array for IBO
     */
    processBuffer(pts,indicies){
        this.vid = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.vid);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pts),gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER,null);

        this.iid = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.iid);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indicies),gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
    }
}

function triangle(pt1=[-12,13.48,0],pt2=[12,13.48,0],pt3=[0,-13.48,0], indices = [0,1,2]){
    //polygon with 3 pts
    return new Shape([...pt1,...pt2,...pt3],3,indices);
}