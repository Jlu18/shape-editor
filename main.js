let  gl;
let canvas;

function init(){
    canvas = document.getElementById("canvas");


    gl = canvas.getContext("webgl");
    if(!gl){
        alert("Failed to get webgl context");
        return;
    }

    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}


window.onload = init;

