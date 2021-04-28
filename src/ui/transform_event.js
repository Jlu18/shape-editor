function moveX(e){
    if(selected.type === "exist") {
        let v = Number(e.target.value);
        selected.mesh.matrix = moveto(selected.mesh.matrix,[v,selected.mesh.matrix[13],0]);     
    }
}

function moveY(e){
    if(selected.type === "exist") {
        let v = Number(e.target.value);
        selected.mesh.matrix = moveto(selected.mesh.matrix,[selected.mesh.matrix[12],v,0]);     
    }
}

function rotate(e){
    if(selected.type === "exist") {
        let r = Number(e.target.value);
        selected.mesh.rmatrix = rotateZ(identity(),r);
    }
}

function scaleX(e){
    if(selected.type === "exist") {
        let v = Number(e.target.value);
        selected.mesh.smatrix = scale(identity(),[v,selected.mesh.smatrix[5],1]);
    }
}

function scaleY(e){
    if(selected.type === "exist") {
        let v = Number(e.target.value);
        selected.mesh.smatrix = scale(identity(),[selected.mesh.smatrix[0],v,1]);
    }
}

function ctrlPt1X(e){
    if(selected.type === "exist") {
        let v = e.target.value;
    }
}

function ctrlPt1Y(e){
    if(selected.type === "exist") {
        let v = e.target.value;
    }
}
    
function ctrlPt2X(e){
    if(selected.type === "exist") {
        let v = e.target.value;
    }
}

function ctrlPt2Y(e){
    if(selected.type === "exist") {
        let v = e.target.value;
    }
}

function color(e){
    if(selected.type === "exist") {
        console.log("chaning color")
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.target.value);
        selected.mesh.color = result ? [
                parseInt(result[1], 16)/255,
                parseInt(result[2], 16)/255,
                parseInt(result[3], 16)/255,
                1]
            : [1,1,1,1];
    }
}