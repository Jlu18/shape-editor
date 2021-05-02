/*
file where it holds all the datas of shape that created in the editor
*/
class Mesh{
    constructor(){ 
        this.type= "Mesh";
        this.attributes = {
            color: new Vector4(1,0,0,1),
            p_matrix: identity(),
            r_matrix: identity(),
            s_matrix: identity()
        };
        this.position = {};
        this.index = {};
        this.m = true;
    }
    setAttribute(name,value){
        this.attributes[name] = value;
        this.m = true;
    }
    getAttribute(name){
        return this.attributes[name];
    }
    applyMatrix(name,mat){
        this.attributes[name] = multiply(this.attributes[name],mat);
        this.m = true;
    }
    //use this for center the mesh **NOT** transformation
    updatePosition(matrix){
        const position = this.position;
        const pts = position.points;
        for(let i = 0; i < position.length; i++){
            let x = pts[i*3], y = pts[i*3 + 1], z = pts[i*3 + 2];
            const re = MultiplyMatrix4(matrix,[x,y,z,1]);
            pts[i*3    ] = re[0];
            pts[i*3 + 1] = re[1];
            pts[i*3 + 2] = re[2];
        }
        this.m = true;
    }
    clone(){
        return new Mesh().copy(this);
    }
    copy(source){
        this.type = source.type;
        if(source.index){
            this.index.points = new Array(...source.index.points);
        }

        if(source.position){
            this.position.points = new Array(...source.position.points);
            this.position.length = source.position.length;
        }
        
        const attributes = source.attributes;
        for(const n in attributes){
            const attribute = attributes[n];
            if(attribute){
                if(attribute.clone){
                    this.attributes[n] = attribute.clone();
                }else if(Array.isArray(attribute)){
                    this.attributes[n] = new Array(...attribute);
                }else if(attribute.vector){
                    this.attributes[n] = new Vector4(attribute.x,attribute.y,attribute.z,attribute.w?attribute.w:1);
                }else{ 
                    this.attributes[n] = attribute;
                }
            }
        }
        this.m = true;
        return this;
    }
    delete(){
        gl.deleteBuffer(this.position.id);
        gl.deleteBuffer(this.index.id);
        this.type = "Mesh";
        this.attributes = {};
        this.position = {};
        this.index = {};
        this.m = true;
    }
    bindBuffer(){
        const position = this.position;
        if(position.points){
            //create position buffer id
            if(!position.id){
                position.id = gl.createBuffer();           
            }
            gl.bindBuffer(gl.ARRAY_BUFFER,position.id);
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(position.points),gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER,null);
        }
    }
    bindIndexBuffer(){
        const index = this.index;
        if(index.points){
            if(!index.id){
                index.id = gl.createBuffer();
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index.id);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(index.points),gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
        }
    }
}