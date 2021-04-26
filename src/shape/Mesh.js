/*
file where it holds all the datas of shape that created in the editor
*/
class Mesh{
    constructor(type,pts,n){
        if(!Array.isArray(pts)){
            console.error("Mesh Error: Supplied vertex or index buffer is not array.");
            return;
        }
        this.type = type;
        //create position buffer id
        this.vid = gl.createBuffer();              //VBO ID
        gl.bindBuffer(gl.ARRAY_BUFFER,this.vid);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pts),gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER,null);

        this.pts = pts;                 //verticies
        this.len = n;                   //length of verticies
        this.color = [1,0,0,1];

        this.matrix = identity();            //transformation matrix
    }
}

function triangle(pt1=[-12,13.48,0],pt2=[12,13.48,0],pt3=[0,-13.48,0]){
    //polygon with 3 pts
    return new Mesh("triangle",[...pt1,...pt2,...pt3],3);
}