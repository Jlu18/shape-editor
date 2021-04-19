const vertexshader = `
attribute vec4 aPosition;
uniform mat4 uMatrix;

void main(){
    gl_Position = uMatrix * aPosition;
}`;

const fragmentshader = `
precision mediump float;

void main(){
    gl_FragColor = vec4(1.0,0,0,1.0);
}`;

/*
    Shader Functions
*/
function createShaderProgram(gl){
    let vert = createShader(gl,vertexshader,gl.VERTEX_SHADER);
    let frag = createShader(gl,fragmentshader,gl.FRAGMENT_SHADER);

    let program = gl.createProgram();
    gl.attachShader(program,vert);
    gl.attachShader(program,frag);
    gl.linkProgram(program);

    return program;
}

function createShader(gl,src, type){
    let id = gl.createShader(type);
    gl.shaderSource(id, src);
    gl.compileShader(id);

    return id;
}

