const uniformType = Object.freeze({
    INT:0,
    FLOAT:1,
    VEC2:2,
    VEC3:3,
    VEC4:4,
    MAT3:5,
    MAT4:6
})

class Renderer{
    constructor(){
        this.uniform = {};

        gl.useProgram(m_shader.program);

        this.projection = projection(width,height);

        //gl.disable(gl.DEPTH_TEST);
    }
    draw(){
        gl.viewport(0,0,width,height);
        gl.clearColor(0.2,0.2,0.2,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        m_mesh.getMeshNames().forEach(n=>{
            let type = gl.TRIANGLES;
            const m = m_mesh.get(n);
            if(m.isLine)type=gl.LINES;
            m_shader.bindAttrib(m.vid,0,3,gl.FLOAT);//position
            const tm = multiply(multiply(m.matrix,m.smatrix),m.rmatrix);
            this.bindUniform("MAT4","uMatrix",tm)
            this.bindUniform("VEC4","uColor",m.color); //color
            
            if(m.type === "curve"){
                gl.drawArrays(gl.LINE_STRIP,0,m.vlen);
            }else{
                if(m.ipts.length >= 2){
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.iid);
                    gl.drawElements(type,m.ipts.length,gl.UNSIGNED_SHORT,0);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                }
            }
        });
    }
    findUniform(locs){
        locs.forEach(l=>{
            this.uniform[l] = gl.getUniformLocation(m_shader.program,l);
        });
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