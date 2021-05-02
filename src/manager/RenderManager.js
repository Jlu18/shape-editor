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
        //viewport and canvas setup
        gl.viewport(0,0,width,height);
        gl.clearColor(...this.b_color.toArray());
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //modified bit
        let modified = false;
        
        //for all the name of mesh exists on canvas
        m_mesh.getAllNames().forEach(name=>{
            //get the mesh
            const mesh = m_mesh.get(name);

            //if modified bit is on, turn on the modified flag, so it will current snapshot to undomanager
            if(mesh.m){
                modified = true;
                mesh.m = false;
            }
            
            //default mode is triangle
            let mode = gl.TRIANGLES;
            //If mesh is line, change it to line strip;
            if(mesh.isLine) mode = gl.LINE_STRIP;

            //bind the layout of the attributes
            m_shader.bindAttrib(mesh.position.id,0,3,gl.FLOAT);//position


            //bind the element and array buffer id
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.index.id);
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.position.id);


            //get all the transformation matrix
            const p_m = mesh.getAttribute("p_matrix");
            const r_m = mesh.getAttribute("r_matrix");
            const s_m = mesh.getAttribute("s_matrix");

            //pass in color uniform of the shape
            m_shader.bindUniform("VEC4","uColor",mesh.attributes["color"].toArray()); //color
            

            //if shape is selecteed on canvas
            if(m_select.exist(name)){
                ///apply extra matrix transformation from the edit tool;
                let um = multiply(multiply(multiply(this.projection,
                                multiply(this.p_matrix,p_m)),
                                    multiply(this.r_matrix,r_m)),
                                        multiply(this.s_matrix,s_m)); //multply preview
                m_shader.bindUniform("MAT4","uMatrix",um); 
                //draw shape accordingly
                gl.drawElements(mode, mesh.index.points.length,gl.UNSIGNED_SHORT,0);

                //draw outline around the selected shape
                if(mesh instanceof Polygon){
                    m_shader.bindUniform("VEC4","uColor",[0,0,0,1]); //border color
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.outlineIndex.id);
                    gl.drawElements(gl.LINE_LOOP, mesh.outlineIndex.points.length,gl.UNSIGNED_SHORT,0);
                }else if(mesh.isLine){
                    gl.useProgram(m_dot_shader.program);
                    m_dot_shader.bindAttrib(mesh.position.id,0,3,gl.FLOAT);//position
                    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.position.id);
                    let length = mesh.index.points.length;
                    if(mesh.type==="curve"){
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.ctrlPts.id);
                        length = mesh.ctrlPts.points.length;
                    } 
                    m_dot_shader.bindUniform("MAT4","uMatrix",um); 
                    m_dot_shader.bindUniform("VEC4","udColor",[0,0,0,1]); //border color

                    gl.drawElements(gl.POINTS,length, gl.UNSIGNED_SHORT,0);
                    gl.useProgram(m_shader.program);
                }else{
                    m_shader.bindUniform("VEC4","uColor",[0,0,0,1]); //border color
                    gl.drawElements(gl.LINE_LOOP, mesh.index.points.length,gl.UNSIGNED_SHORT,0);
                }
            }else{
                //draw regular shape
                let um = multiply(multiply(multiply(this.projection,p_m),r_m),s_m);
                m_shader.bindUniform("MAT4","uMatrix",um);
                gl.drawElements(mode, mesh.index.points.length,gl.UNSIGNED_SHORT,0);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        });
        //end of drawing 

        if(modified){
            m_undo.push(m_mesh);
        }
    }
    resetMatrix(){
        this.p_matrix = identity();
        this.r_matrix = identity();
        this.s_matrix = identity();
    }
    
}