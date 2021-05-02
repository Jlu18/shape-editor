class Triangle extends Mesh {
    constructor(p1,p2,p3){
        super();
        this.type = "triangle";
        this.position.points = [
            ...p1.toArray(),
            ...p2.toArray(),
            ...p3.toArray(),
        ];
        this.position.length = 3;
        this.index.points = [0,1,2];
        this.updatePosition(translation([0,-p2.y/2,0,1]));
        this.bindBuffer();
        this.bindIndexBuffer();
    }
    clone(){
        return new Triangle(
            new Vector3(-10,0,0),new Vector3(0,-15,0),new Vector3(10,0,0)
        ).copy(this);
    }
}

class Rectangle extends Mesh {
    constructor(width=50,height=50){
        super();
        this.type = "rectangle";

        this.position.points = createpts(width,height);
        this.position.length = 4;
        this.index.points = [
            0,1,2,
            2,3,0
        ];
        this.attributes["width"] = width;
        this.attributes["height"] = height;
        function createpts(w,h){
            return [
                0, 0, 0,
                w, 0, 0,
                w, h, 0,
                0, h, 0
            ];
        }
        //center the rectangle
        this.updatePosition(translation([-width/2,-height/2,0,1]));
        this.bindBuffer();
        this.bindIndexBuffer();
    }
    clone(){
        return new Rectangle(15,15).copy(this);
    }
}

class Polygon extends Mesh{
    constructor(center,radius,edgeCnt){
        super();
        this.type = "polygon";
        this.attributes["center"] = center;
        this.attributes["radius"] = radius;
        this.attributes["edgeCnt"]= edgeCnt;
        
        const points = this.radius_based_polygon(center.toArray(),radius,edgeCnt);
        this.position.points = points.position;
        this.position.length = points.position.length/3;
        this.index.points    = points.index; 
        this.outlineIndex = {
            points: points.outline,
        }
        this.bindBuffer();
        this.bindIndexBuffer();
        this.bindOutIndex();
    }
    bindOutIndex(){
        const index = this.outlineIndex;
        if(index.points){
            if(!index.id){
                index.id = gl.createBuffer();
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index.id);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(index.points),gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
        }
    }
    changeEdgeCnt(edgeCnt){
        this.attributes["edgeCnt"] = edgeCnt;
        const center = this.attributes["center"];
        const radius = this.attributes["radius"];

        const points = this.radius_based_polygon(center,radius,edgCnt);
        this.position.points = points.position;
        this.position.length = points.position.length/3;
        this.index.points    = points.index; 

        this.m = true;
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
        const outlineindices = [];
        for(let i = 1; i < edgesCnt; i++){
            indices.push(i+1,i,0);
            outlineindices.push(i,i+1);
        }
        indices.push(1,edgesCnt,0);
        outlineindices.push(edgesCnt,1);
        return {position:vpts, index:indices,outline:outlineindices};
    }
    clone(){
        return new Polygon(new Vector3(0,0,0),12,5).copy(this);
    }
    delete(){
        super.delete();
        gl.deleteBuffer(this.outlineIndex.id);
        this.outlineIndex = {};
    }
}

class Circle extends Polygon{
    constructor(center,radius=10){
        super(center,radius,32);
        this.type = "circle";
    }
    clone(){
        return new Circle(new Vector3(0,0,0),12).copy(this);
    }
}

class Line extends Mesh{
    constructor(){
        super();
        this.type = "line";
        this.isLine = true; 
        this.attributes["lineCnt"] = 1;
        this.attributes["maxCnt"] = 2;
        this.position.points = [
            0,0,0,
            0,0,0
        ];
        this.position.length = 2;
        this.index.points = [0,1];
        this.ctrlPts = this.index;
        this.bindBuffer();
        this.bindIndexBuffer();
    }
    movePts(i,vec3){
        const pts = this.position.points;
        pts[i*3    ] = vec3.x;      
        pts[i*3 + 1] = vec3.y;
        pts[i*3 + 2] = vec3.z;
        this.bindBuffer();
    }   
    clone(){
        return new Line().copy(this);
    }
    copy(source){
        super.copy(source);
        this.bindBuffer();
        this.bindIndexBuffer();
        return this;
    }
}

class Polyline extends Line{ 
    constructor(){
        super();
        this.type = "polyline";
        this.attributes["maxCnt"] = Infinity;
    }
    newLine(vec3){
        //add the new position
        this.position.points.push(...vec3.toArray());
        this.position.length++;
        //increment the index
        let count = this.attributes["lineCnt"];
        this.index.points.push(count,count+1);
        this.setAttribute("lineCnt",count+1);
        this.bindBuffer();
        this.bindIndexBuffer();
        return this.attributes["lineCnt"];
    }
    clone(){
        return new Polyline().copy(this);
    }
    copy(source){
        super.copy(source);
        this.bindBuffer();
        this.bindIndexBuffer();
        return this;
    }
}

class Curve extends Polyline{
    constructor(){
        super();
        this.type = "curve";
        this.attributes["segment"] = 10;
        this.init = true;
        this.ctrlPts = {
            points:[],
            cPoints: [],
        };
    }
    bindCtrlPtsBuffer(){
        const index = this.ctrlPts;
        if(index.points){
            if(!index.id){
                index.id = gl.createBuffer();
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index.id);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(index.points),gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
        }
    }
    clone(){
        return new Curve().copy(this);
    }
    copy(source){
        super.copy(source);
        if(source.ctrlPts){
            this.ctrlPts.points = new Array(...source.ctrlPts.points);
            source.ctrlPts.cPoints.forEach(p=>{
                this.ctrlPts.cPoints.push(new Vector3(p.x,p.y,p.z));
            });
            this.createCurve();
            this.bindBuffer();
            this.bindIndexBuffer();
            this.bindCtrlPtsBuffer();
        }
        return this;
    }
    newLine(vec3){
        if(this.ctrlPts.cPoints.length > 2){
            this.createCurve();
            this.attributes["lineCnt"]++;
            this.bindBuffer();
            this.bindIndexBuffer();
            this.bindCtrlPtsBuffer();
        }else{
            super.newLine(vec3);
        }
    }
    movePts(i,vec3){
        this.ctrlPts.cPoints[i] = vec3.clone();
        if(this.ctrlPts.cPoints.length > 2){
            this.createCurve();
            this.bindBuffer();
            this.bindIndexBuffer();
            this.bindCtrlPtsBuffer();
        }else{
            super.movePts(i,vec3);
        }
    }
    createCurve(){
        function magnitude(p1,p2){
            return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
        }
        const ps = this.ctrlPts.cPoints.slice();
        
        for (let i = ps.length - 1; i > 0; i--) {
            if (magnitude(ps[i], ps[i - 1]) < 1) {
                ps.splice(i, 1);
            }
        }

        const numPoints = ps.length;
        if (numPoints < 2) {
            return;
        }
        const first = new Vector3(
            2 * ps[0].x - ps[1].x, 
            2 * ps[0].y - ps[1].y
        );
        const last = new Vector3(
            2 * ps[numPoints - 1].x - ps[numPoints - 2].x, 
            2 * ps[numPoints - 1].y - ps[numPoints - 2].y
        );
        ps.splice(0, 0, first);
        ps.push(last);
        const points = this.position.points = [];
        const index = this.index.points = [];
        const outPts = this.ctrlPts.points = [0];
        const amount = this.getAttribute("segment");
        for(let i = 1; i < ps.length - 2; i++){
            const p0 = ps[i-1];
            const p1 = ps[i];
            const p2 = ps[i+1];
            const p3 = ps[i+2];

            points.push(ps[i].x,ps[i].y,0);
            for(let j = 1; j < amount; j++){
                let t = j/amount;
                let t2 = t*t;
                let t3 = t2*t;
                let x =  0.5 * ((2*p1.x) + (-p0.x + p2.x) * t + (2*p0.x - 5*p1.x + 4*p2.x-p3.x)*t2 + (-p0.x + 3*p1.x - 3*p2.x + p3.x) * t3);
                let y =  0.5 * ((2*p1.y) + (-p0.y + p2.y) * t + (2*p0.y - 5*p1.y + 4*p2.y-p3.y)*t2 + (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3);
                points.push(x,y,0); 
                index.push((i-1)*amount+j-1,(i-1)*amount+j);
            }
            index.push(amount*i -1, amount*i);
            outPts.push(i*amount-1);
        }
        index.pop();
        this.position.length = points.length/3;         
    }
}

// for(let i = 1; i < 10; ++i){
//     const list = [];
//     for(let j = 1; j < 10; ++j){
//         //const v = (i-1)*10*3 + (j)*3;
//         //list.push(v,v+1,v+2);
//         const v = (i-1)*10+j;
//         list.push(v-1,v);
//     }
//     list.push(10*i -1, 10*i);
//     console.log(list);
// }

    // createCurve(){
    //     //Catmull-rom splines
    //     //http://www.mvps.org/directx/articles/catmull/#demo
    //     //https://qroph.github.io/2018/07/30/smooth-paths-using-catmull-rom-splines.html#:~:text=Catmull%2DRom%20splines%20are%20piecewise,to%20chain%20these%20segments%20together.
    //     /**q(t) = 0.5 *((2 * P1) +
    //                 (-P0 + P2) * t +
    //                 (2*P0 - 5*P1 + 4*P2 - P3) * t2 +
    //                 (-P0 + 3*P1- 3*P2 + P3) * t3)
    //     */
    //     function magnitude(p1,p2){
    //         return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
    //     }
    //     const ps = this.ctrlPts.cPoints.slice();
        
    //     for (let i = ps.length - 1; i > 0; i--) {
    //         if (magnitude(ps[i], ps[i - 1]) < 1) {
    //             ps.splice(i, 1);
    //         }
    //     }

    //     const numPoints = ps.length;
    //     if (numPoints < 2) {
    //         return;
    //     }

    //     const first = new Vector3(
    //         2 * ps[0].x - ps[1].x, 
    //         2 * ps[0].y - ps[1].y
    //     );
    //     const last = new Vector3(
    //         2 * ps[numPoints - 1].x - ps[numPoints - 2].x, 
    //         2 * ps[numPoints - 1].y - ps[numPoints - 2].y
    //     );
    //     ps.splice(0, 0, first);
    //     ps.push(last);

        
    //     const points = this.position.points = [];
    //     const index = this.index.points = [];
    //     const outPts = this.ctrlPts.points = [0];
    //     for(let i = 1; i < ps.length - 2; i++){
    //         const p0 = ps[i-1];
    //         const p1 = ps[i];
    //         const p2 = ps[i+1];
    //         const p3 = ps[i+2];

    //         const alpha = 0.5;
    //         const tension = 0;

    //         const t0 = 0;
    //         const t1 = t0 + Math.pow(magnitude(p0,p1),alpha);
    //         const t2 = t1 + Math.pow(magnitude(p1,p2),alpha);
    //         const t3 = t2 + Math.pow(magnitude(p2,p3),alpha);

    //         const m1 = new Vector3(),m2 = new Vector3();
    //         m1.x = (1 - tension) * (t2 - t1) * ((p0.x - p1.x) / (t0 - t1) - (p0.x - p2.x) / (t0 - t2) + (p1.x - p2.x) / (t1 - t2));
    //         m1.y = (1 - tension) * (t2 - t1) * ((p0.y - p1.y) / (t0 - t1) - (p0.y - p2.y) / (t0 - t2) + (p1.y - p2.y) / (t1 - t2));
    //         m2.x = (1 - tension) * (t2 - t1) * ((p1.x - p2.x) / (t1 - t2) - (p1.x - p3.x) / (t1 - t3) + (p2.x - p3.x) / (t2 - t3));
    //         m2.y = (1 - tension) * (t2 - t1) * ((p1.y - p2.y) / (t1 - t2) - (p1.y - p3.y) / (t1 - t3) + (p2.y - p3.y) / (t2 - t3));

    //         let a = new Vector3(), b = new Vector3(), c, d;

    //         a.x =  2.0*p1.x - 2*p2.x + m1.x + m2.x;
    //         a.y =  2.0*p1.y - 2*p2.y + m1.y + m2.y;
    //         b.x = -3.0*p1.x + 3*p2.x - 2*m1.x - m2.x;
    //         b.y = -3.0*p1.y + 3*p2.y - 2*m1.y - m2.y;
    //         c = m1.clone();
    //         d = p1.clone();
            
    //         let seg = this.getAttribute("segment");
    //         points.push(ps[1].x,ps[1].y,0);
    //         const amount = Math.max(seg, Math.ceil(magnitude(p0, p1) / seg));
    //         for(let j = 1; j <= amount; j++){
    //             const t = j/amount;
    //             const t2 = t*t;
    //             const t3 = t2*t;
    //             const v = (i-1)*amount*3 + j*3;
    //             points[ v ] = a.x * t3 + b.x * t2 * c.x*t + d.x; 
    //             points[v+1] = a.y * t3 + b.y * t2 * c.y*t + d.y; 
    //             points[v+2] = 0;
    //             index.push((i-1)*amount+j,(i-1)*amount+j+1);
    //         }
    //         outPts.push(i*amount);
    //     }
    //     this.index.points.pop();
    // }