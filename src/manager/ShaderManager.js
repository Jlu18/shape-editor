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

        for(let i in attribs){
            gl.bindAttribLocation(program, i, attribs[i]);
        }

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
}