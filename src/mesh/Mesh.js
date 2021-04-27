/*
file where it holds all the datas of shape that created in the editor
*/
class Mesh{
    constructor(){ 
        this.type= "Mesh";
        this.color = [1,0,0,1];
        this.matrix = identity();
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
        if(this.ipts){
            if(!this.iid){
                this.iid = gl.createBuffer();          //IBO ID
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.iid);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.ipts),gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
        }
    }
    setValues(attribs){
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
        this.ipts = [0,1,2];
        this.len = 3;
        this.setValues(attribs);
        this.init();
    }
}

class Rectangle extends Mesh {
    constructor(attribs){
        super();
        this.type = "rectangle";
        this.width = 10;
        this.height = 10;
        this.ipts = [
            0,1,2,
            2,3,0
        ];
        this.len = 6;
        this.setValues(attribs);
        this.pts = this.createpts(this.width,this.height);
        this.init();
    }
    createpts(w,h){
        return [
            0, 0, 0,
            w, 0, 0,
            w, h, 0,
            0, h, 0
        ];
    }
}

class Polygon extends Mesh{
    constructor(attribs){
        super();
        this.type = "polygon";
        this.center = [0,0,0];
        this.radius = 10;
        this.edgeCnt = 5;
        this.setValues(attribs);
        
        const val = this.radius_based_polygon(this.center,this.radius,this.edgeCnt);
        this.pts = val.pts;
        this.ipts = val.ipts; 
        this.len = this.ipts.length;

        this.init();
    }
    radius_based_polygon(center,radius,edgesCnt){
        //calculate the pts based on origin and radius
        const angle = 360/edgesCnt; //degrees per edge
        const pts = [];
        pts.push(...center);
        for(let i = 0; i < edgesCnt; i++){
            //convert degree to radian
            const rad = (i*angle)*Math.PI/180;
            //use trig to find the pts located on floor
            const x = radius*Math.cos(rad) + center[0];
            const y = radius*Math.sin(rad) + center[1];
            pts.push(x,y,center[2]);
        }
        //calculate the indices for index buffer
        const indices = [];
        for(let i = 1; i < edgesCnt; i++){
            indices.push(i+1,i,0);
        }
        indices.push(1,edgesCnt,0);
        return {pts:pts, ipts:indices};
    }
}

class Circle extends Polygon{
    constructor(attribs){
        super({...attribs,edgeCnt:32});
        this.type = "circle";
    }
}

