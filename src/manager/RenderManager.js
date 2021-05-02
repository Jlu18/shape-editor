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
        this.p_matrix = identity();
        this.r_matrix = identity();
        this.s_matrix = identity();

        this.b_color = new Vector4(0.2,0.2,0.2,1);

        //gl.disable(gl.DEPTH_TEST);
    }
    draw(){
        gl.viewport(0,0,width,height);
        gl.clearColor(...this.b_color.toArray());
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        m_mesh.getAllNames().forEach(name=>{
            let mode = gl.TRIANGLES;
            const mesh = m_mesh.get(name);

            if(mesh.isLine) mode = gl.LINE_STRIP;

            m_shader.bindAttrib(mesh.position.id,0,3,gl.FLOAT);//position
            m_shader.bindUniform("VEC4","uColor",mesh.attributes["color"].toArray()); //color

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.index.id);

            const p_m = mesh.getAttribute("p_matrix");
            const r_m = mesh.getAttribute("r_matrix");
            const s_m = mesh.getAttribute("s_matrix");
            
            if(m_select.exist(name)){
                /**
                 * Selected Shapes
                 */
                let um = multiply(multiply(multiply(this.projection,
                                multiply(this.p_matrix,p_m)),
                                    multiply(this.r_matrix,r_m)),
                                        multiply(this.s_matrix,s_m)); //multply preview
                m_shader.bindUniform("MAT4","uMatrix",um); 

                gl.drawElements(mode, mesh.index.points.length,gl.UNSIGNED_SHORT,0);

                /**
                 * Outline
                 */
                if(mesh instanceof Polygon){
                    m_shader.bindUniform("VEC4","uColor",[0,0,0,1]); //border color
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.outlineIndex.id);
                    gl.drawElements(gl.LINE_LOOP, mesh.outlineIndex.points.length,gl.UNSIGNED_SHORT,0);
                }else if(mesh.isLine){
                    if(mesh.type==="curve") gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.ctrlPts.id);
                    gl.useProgram(m_dot_shader.program);
                    m_dot_shader.bindAttrib(mesh.position.id,0,3,gl.FLOAT);//position
                    m_dot_shader.bindUniform("MAT4","uMatrix",um); 
                    m_dot_shader.bindUniform("VEC4","udColor",[0,0,0,1]); //border color
                    gl.drawElements(gl.POINTS, mesh.ctrlPts.points.length,gl.UNSIGNED_SHORT,0);
                    gl.useProgram(m_shader.program);
                }else{
                    m_shader.bindUniform("VEC4","uColor",[0,0,0,1]); //border color
                    gl.drawElements(gl.LINE_LOOP, mesh.index.points.length,gl.UNSIGNED_SHORT,0);
                }
            }else{
                /**
                 *  Shape
                 */
                let um = multiply(multiply(multiply(this.projection,p_m),r_m),s_m);
                m_shader.bindUniform("MAT4","uMatrix",um);
                gl.drawElements(mode, mesh.index.points.length,gl.UNSIGNED_SHORT,0);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        });
        // if(modified){
        //     m_undo.push(m_mesh);
        // }
    }
    resetMatrix(){
        this.p_matrix = identity();
        this.r_matrix = identity();
        this.s_matrix = identity();
    }
    
}