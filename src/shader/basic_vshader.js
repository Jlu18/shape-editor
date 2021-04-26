const vShader = `
attribute vec4 aPosition;
uniform vec4 uColor;
uniform mat4 uProjMatrix;
uniform mat4 uMatrix;
varying vec4 vColor;
void main(){
    gl_Position = uProjMatrix * uMatrix * aPosition;
    vColor = uColor;
}`;