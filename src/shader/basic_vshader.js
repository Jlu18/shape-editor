const vShader = `
attribute vec4 aPosition;
uniform vec4 uColor;
uniform mat4 uMatrix;
varying vec4 vColor;
void main(){
    gl_Position = uMatrix * aPosition;
    vColor = uColor;
}`;

const vDotShader = `
attribute vec4 aPosition;
uniform vec4 udColor;
uniform mat4 uMatrix;
varying vec4 vColor;
void main(){
    gl_Position = uMatrix * aPosition;
    gl_PointSize = 5.0;
    vColor = udColor;
}`;