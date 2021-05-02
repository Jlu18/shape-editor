class Shader{
    /**
     * 
     * @param {string} vSrc 
     * @param {string} fSrc 
     * @param {string[]}  attribs  
     * @param {string[]}  uni 
     */
    constructor(vSrc, fSrc, attribs,uni){
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

        this.uniform = {};
        uni.forEach((a)=>{
            this.uniform[a] = gl.getUniformLocation(program,a);
        });
        
        /* TODO - Check for link status */
        this.program = program;
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
    bindUniform(type,name,value){
        const loc = this.uniform[name];
        if(!loc){
            console.error("bindUniform() Error: Unknown uniform name " + name);
            return;
        } 
        switch(uniformType[type]){
            case uniformType["INT"]:
            case uniformType["FLOAT"]:
            case uniformType["VEC2"]:
            case uniformType["VEC3"]:
                break;
            case uniformType["VEC4"]:
                gl.uniform4fv(loc,new Float32Array(value));
                break;
            case uniformType["MAT3"]:
                break;
            case uniformType["MAT4"]:
                gl.uniformMatrix4fv(loc,false,value)
                break;
            default:
                console.error("bindUniform() Error: Unknown type: " + type);
                return;
        }
    }
}