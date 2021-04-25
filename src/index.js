/*
    Global Variables
*/
let gl;
let width;
let height;

/*
    Manager
*/
let m_mesh;
let m_shader;

function render(){
    gl.clearColor(0.2,0.2,0.2,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(pos);
    gl.uniformMatrix4fv(matpos,false,shape.m);

    gl.drawElements(gl.TRIANGLES,3,gl.UNSIGNED_SHORT,0);

    requestAnimationFrame(render);
}

function start(){
    console.log("start");
    gl.viewport(0,0,width,height);
    gl.clearColor(0.2,0.2,0.2,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
