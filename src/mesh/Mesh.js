/*
file where it holds all the datas of shape that created in the editor
*/
class Mesh{
    constructor(){ 
        this.type= "Mesh";
        this.color = [1,0,0,1];
        this.matrix = identity();
        this.smatrix = identity();
        this.rmatrix = identity();
        this.vpts = null;
        this.ipts = null; 
    }
    init(){
        if(this.vpts){
            //create position buffer id
            if(!this.vid){
                this.vid = gl.createBuffer();              //VBO ID
            }
            this.bindData(gl.ARRAY_BUFFER,this.vid,new Float32Array(this.vpts));
        }
        if(this.ipts){
            if(!this.iid){
                this.iid = gl.createBuffer();          //IBO ID
            }
            this.bindData(gl.ELEMENT_ARRAY_BUFFER,this.iid,new Uint16Array(this.ipts));
        }
    }
    bindData(t,id,data){
        gl.bindBuffer(t,id);
        gl.bufferData(t,data,gl.STATIC_DRAW);
        gl.bindBuffer(t,null);
    }
    setValues(attribs){
        if(!attribs){
            return;
        }
        Object.keys(attribs).forEach(key=>{
            // if(this[key]===undefined){
            //     console.warn("Mesh Warn: " + key + " is not param of Mesh");
            // }
            this[key] = attribs[key];
        });
    }
}

class Triangle extends Mesh {
    constructor(attribs){
        super();
        this.type = "triangle";
        this.vpts  = [
            -12, 13.48, 0,
             12, 13.48, 0,
              0,-13.48, 0
        ];
        this.ipts = [0,1,2];
        this.vlen = this.vpts.length/3;
        this.setValues(attribs);
        this.init();
    }
}

class Rectangle extends Mesh {
    constructor(attribs){
        super();
        this.type = "rectangle";
        this.width =50;
        this.height = 50;
        this.ipts = [
            0,1,2,
            2,3,0
        ];
        this.vlen = 4;
        this.setValues(attribs);
        this.vpts = this.createpts(this.width,this.height);
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
        this.vpts = val.vpts;
        this.ipts = val.ipts; 
        this.vlen = this.vpts.length/3;

        this.init();
    }
    radius_based_polygon(center,radius,edgesCnt){
        //calculate the vpts based on origin and radius
        const angle = 360/edgesCnt; //degrees per edge
        const vpts = [];
        vpts.push(...center);
        for(let i = 0; i < edgesCnt; i++){
            //convert degree to radian
            const rad = (i*angle)*Math.PI/180;
            //use trig to find the vpts located on floor
            const x = radius*Math.cos(rad) + center[0];
            const y = radius*Math.sin(rad) + center[1];
            vpts.push(x,y,center[2]);
        }
        //calculate the indices for index buffer
        const indices = [];
        for(let i = 1; i < edgesCnt; i++){
            indices.push(i+1,i,0);
        }
        indices.push(1,edgesCnt,0);
        return {vpts:vpts, ipts:indices};
    }
}

class Circle extends Polygon{
    constructor(attribs){
        super({...attribs,edgeCnt:32});
        this.type = "circle";
    }
}

class Line extends Mesh{
    constructor(attribs){
        super();
        this.type = "line";
        this.isLine = true; 
        this.vpts = [
            0,0,0,
        ];
        this.ipts=[0];
        this.vlen = this.vpts.length/3;
        this.setValues(attribs);
        this.init();
    }
    movePts(x,y){
        const i = this.vlen - 1;
        this.vpts[i*3  ] = x;
        this.vpts[i*3+1] = y;
        this.bindData(gl.ARRAY_BUFFER,this.vid,new Float32Array(this.vpts));
    }
    newPts(x,y){
        if(this.vlen < 2){
            this.movePts(x,y);
            this.vpts.push(x,y,0);
            this.ipts.push(1);
            this.bindData(gl.ARRAY_BUFFER,this.vid,new Float32Array(this.vpts));
            this.bindData(gl.ELEMENT_ARRAY_BUFFER,this.iid,new Uint16Array(this.ipts));
            this.vlen++;
        }else{
            this.done = true;
        }
    }
}

class Polyline extends Line{ 
    constructor(attribs){
        super(attribs);
        this.type = "polyline";
        this.ipts = [];
        this.setValues(attribs);
    }
    newPts(x,y){
        this.movePts(x,y);
        this.vpts.push(x,y,0);
        this.bindData(gl.ARRAY_BUFFER,this.vid,new Float32Array(this.vpts));
        this.ipts.push(this.vlen-1,this.vlen);
        this.bindData(gl.ELEMENT_ARRAY_BUFFER,this.iid,new Uint16Array(this.ipts));
        this.vlen++;
    }
}

//TODO change it to mesh
class Curve extends Mesh{
    constructor(attribs){
        super();
        this.type = "curve";
        this.cpts = [
             0,  0, 0,
            20, 50,0,
            40,50,0,
            100, 100,0,
        ];
        this.seg = 100;
        //define vbo
        this.createCurve();
        this.init();
    }
    init(){
        if(this.vpts){
            //create position buffer id
            if(!this.vid){
                this.vid = gl.createBuffer();              //VBO ID
            }
            this.bindData(gl.ARRAY_BUFFER,this.vid,new Float32Array(this.vpts));
        }
    }
    createCurve(){
        const p0 = this.cpts.slice(0,3);
        const p1 = this.cpts.slice(3,6);
        const p2 = this.cpts.slice(6,9);
        const p3 = this.cpts.slice(9,12);
        
        let x = p0[0];
        let y = p0[1];

        let t = 0;
        const delta = 1/this.seg;

        const pts = [];
    
        pts.push(x,y,0);
    
        for(i = 1; i < this.seg; i++){
            t += delta;
            const t2 = t*t;
            const t3 = t2*t;
    
            const q1 = (1-t);
            const q2 = q1*q1;
            const q3 = q2*q1;
            x = q3*p0[0] + (3*t*q2)*p1[0] + (3*t2*q1)*p2[0] + t3*p3[0];
            y = q3*p0[1] + (3*t*q2)*p1[1] + (3*t2*q1)*p2[1] + t3*p3[1];
            pts.push(x,y,0);
        }
        this.vlen = pts.length/3;
        this.vpts = pts;
    }
}