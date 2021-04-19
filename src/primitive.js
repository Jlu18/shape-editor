/**
 * Polygon function pass datas of pts and index to the rendering pipeline
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {Number[]} pts      array for VBO
 * @param {Number[]} indicies array for IBO
 * 
 * @returns {WebGLBuffer[]} return the ids of vbo and ibo of created poylgon
 */
function polygon(gl,pts,indicies){
    
    let vid = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vid);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pts),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    
    let iid = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iid);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indicies),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

    return [vid, iid];
}
