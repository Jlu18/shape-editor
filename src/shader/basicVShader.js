const vShader = `
attribute vec4 aPosition;
attribute vec4 aColor;
uniform mat4 uProjMatrix;
uniform mat4 uMatrix;
varying vec4 vColor;
void main(){
    gl_Position = uProjMatrix * uMatrix * aPosition;
    vColor = aColor;
}`;