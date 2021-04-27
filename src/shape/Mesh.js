/*
file where it holds all the datas of shape that created in the editor
*/
class Mesh{
    constructor(){ 
        this.type= "Mesh";
    }
    init(){
        if(this.pts){
            //create position buffer id
            if(!this.vid){
                this.vid = gl.createBuffer();              //VBO ID
            }
            gl.bindBuffer(gl.ARRAY_BUFFER,this.vid);
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.pts),gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER,null);
        }
    }
    setValue(attribs){
        if(!attribs){
            return;
        }
        for(let key in attribs){
            // if(this[key]===undefined){
            //     console.warn("Mesh Warn: " + key + " is not param of Mesh");
            // }
            this[key] = attribs[key];
        }
    }
}

class Triangle extends Mesh {
    constructor(attribs){
        super();
        this.type = "triangle";
        this.pts  = [
            -12, 13.48, 0,
             12, 13.48, 0,
              0,-13.48, 0
        ];
        this.len = 3;
        this.color = [1,0,0,1];
        this.matrix = identity();
        this.setValue(attribs);
        this.init();
    }
}