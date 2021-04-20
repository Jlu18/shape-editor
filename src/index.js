/*
    Global Variables
*/
let canvas;
let gl;

let ids;
let pos;
let matpos;
let mat;
let shape;

function init(){
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    console.log("Canvas size: " + canvas.clientWidth + " " + canvas.clientHeight);
    gl = canvas.getContext("webgl");
    if(!gl){
        alert("Failed to get webgl context");
        return;
    }

    initEvent(canvas);

    let program = createShaderProgram();
    gl.useProgram(program);

    pos = gl.getAttribLocation(program,"aPosition");
    matpos = gl.getUniformLocation(program,"uMatrix");
    mat = projection(canvas.clientWidth,canvas.clientHeight);
    gl.uniformMatrix4fv(matpos,false,mat);
    
    shape = triangle();
    
    gl.viewport(0,0,canvas.clientWidth,canvas.clientHeight);
    gl.enable(gl.DEPTH_TEST);

    render();
}

function render(){
    gl.clearColor(0.2,0.2,0.2,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    gl.bindBuffer(gl.ARRAY_BUFFER,shape.vid);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,shape.iid);

    gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(pos);
    
    gl.drawElements(gl.TRIANGLES,3,gl.UNSIGNED_SHORT,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
}

window.onload = init;

