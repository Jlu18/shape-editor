/*
file where it holds all the datas of shape that created in the editor
*/
class Mesh{
    constructor(pts,n){
        if(!Array.isArray(pts)){
            console.error("Mesh Error: Supplied vertex or index buffer is not array.");
            return;
        }
        //create buffer ids
        this.id = gl.createBuffer();              //VBO ID
        gl.bindBuffer(gl.ARRAY_BUFFER,this.vid);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pts),gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER,null);

        this.len = n;                   //length of verticies
        this.pts = pts;                 //verticies
        this.m = identity();            //transformation matrix
    }
}

function triangle(pt1=[-12,13.48,0],pt2=[12,13.48,0],pt3=[0,-13.48,0]){
    //polygon with 3 pts
    return new Mesh([...pt1,...pt2,...pt3],3,indices);
}