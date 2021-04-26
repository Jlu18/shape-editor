class Shader{
    /**
     * 
     * @param {string} vSrc 
     * @param {string} fSrc 
     * @param {array}  attribs 
     */
    constructor(vSrc, fSrc, attribs){
        const vID = this.createShader(gl.VERTEX_SHADER,vSrc);
        const fID = this.createShader(gl.FRAGMENT_SHADER,fSrc); 

        if(!vID || !fID){ 
            return null;
        }
    
        const program = gl.createProgram();
        gl.attachShader(program,vID);
        gl.attachShader(program,fID);

        attribs.forEach((a,i)=>{
            gl.bindAttribLocation(program,i,a);
        })

        gl.linkProgram(program);
        this.program = program;
        /* TODO - Check for link status */

    }
    createShader(type,src){
        let id = gl.createShader(type);
        gl.shaderSource(id, src);
        gl.compileShader(id);

        const status = gl.getShaderParameter(id,gl.COMPILE_STATUS);
        if(!status){
            const err = gl.getShaderInfoLog(id);
            console.error("Shader createShader() Error: Failed to compile " + type + ". " + err);
            gl.deleteShader(id);
            return null;
        } 
        return id;
    }
    bindAttrib(id,attrib,size,type){
        gl.bindBuffer(gl.ARRAY_BUFFER,id);
        gl.enableVertexAttribArray(attrib)
        gl.vertexAttribPointer(attrib,size,type,false,0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER,null);
    }
}