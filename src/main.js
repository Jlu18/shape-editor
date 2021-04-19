let  gl;
let canvas;

const tempv = [
    0,0,0,
    100, 0, 0,
    100, 100,0
];

const tempi = [
    0,1,2
];

let ids;
let pos;
let matpos;
let mat;
function init(){
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl = canvas.getContext("webgl");
    if(!gl){
        alert("Failed to get webgl context");
        return;
    }

    let program = createShaderProgram(gl);
    gl.useProgram(program);

    pos = gl.getAttribLocation(program,"aPosition");
    matpos = gl.getUniformLocation(program,"uMatrix");
    mat = projection(canvas.clientWidth,canvas.clientHeight);
    gl.uniformMatrix4fv(matpos,false,mat);
    
    ids = polygon(gl,tempv,tempi);
    
    gl.viewport(0,0,canvas.clientWidth,canvas.clientHeight);
    gl.enable(gl.DEPTH_TEST);

    render();
}

function render(){
    gl.clearColor(0.2,0.2,0.2,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    gl.bindBuffer(gl.ARRAY_BUFFER,ids[0]);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ids[1]);

    gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(pos);
    
    gl.drawElements(gl.TRIANGLES,3,gl.UNSIGNED_SHORT,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
}

window.onload = init;

