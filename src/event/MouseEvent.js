function mousedclick(_e){
    //Done drawing polyline
    if(line.creating && line.el.getAttribute("lineCnt") >= 2){
        line.creating = false;
        line.el = null;
    }
}

let pressFlag = false;
const origin = new Vector3();

function mousedown(e){
    if(!pressFlag && m_ui.isTransformSelected && !m_select.isEmpty()){
        origin.x = e.offsetX;
        origin.y = e.offsetY;
        pressFlag = true;
    }
}

const line = {
    creating: false,
    el:null
}

function mouseup(e){
    //left click
    if(e.button === 0){
        if(line.creating){
            let cnt = line.el.getAttribute("lineCnt");
            let max = line.el.getAttribute("maxCnt"); 
            if(cnt+1 >= max){
                cnt++;
                line.creating = false;
                line.el = null;
            }else{
                cnt = line.el.newLine(new Vector3(e.offsetX,e.offsetY,0));
            }
        }else if(m_ui.isShapeSelected){
            let el = m_mesh.get(m_mesh.create(m_ui.selected));
            if(el.isLine){
                el.movePts(0,new Vector3(e.offsetX,e.offsetY,0));
                line.creating = true;
                line.el = el;
            }else{
                el.setAttribute("p_matrix",translation([e.offsetX,e.offsetY,0]));
            }
        }else if(m_ui.isTransformSelected){
            pressFlag = false;
            m_select.list.forEach(n=>{
                const m = m_mesh.get(n);
                m.applyMatrix("p_matrix",m_renderer.p_matrix);
                m.applyMatrix("r_matrix",m_renderer.r_matrix);
                m.applyMatrix("s_matrix",m_renderer.s_matrix);
            });
            m_renderer.resetMatrix();
        }else{
            let isSelected = false;
            m_mesh.getAllMeshes().forEach(m=>{
                if((m.isLine && pointOnLine(m,[e.offsetX,e.offsetY])) || pointOnPolygon(m,[e.offsetX,e.offsetY])){
                    //console.log(m.uid + " clicked!");
                    if(m_select.exist(m.uid)){
                        m_select.remove(m.uid);
                    }else{
                        m_select.add(m.uid);
                    }
                    isSelected = true;
                }
            });
            if(!isSelected){
                m_select.removeAll();
            }
        }
    }
    // else if(e.button === 2){
    // }
}

function mousemove(e){
    if(line.creating){
        line.el.movePts(line.el.getAttribute("lineCnt"),new Vector3(e.offsetX,e.offsetY,0));
    }else if(pressFlag){
        const dx = e.offsetX - origin.x;
        const dy = e.offsetY - origin.y;
        switch(m_ui.selected){
            case "move":
                move_m(dx,dy);
                break;
            case "scale":
                scale_m(dx,dy);
                break;
            case "rotate": 
                rotate_m(dx,dy);
                break;
            default:
                console.error("Mousemove Error: Invalid selected from UIManager: " + m_ui.selected);
                pressFlag = false;
                return;
        }
    }
}

/**
 * Determine whether a point(pt) lies within the polygon(ppts)
 * 
 * @param {Mesh} mesh
 * @param {Number[]} pt Array of length 2 with each represents xy.
 * 
 * @returns {Boolean} true if point intersected with given polygon, false otherwise.
 */
 function pointOnPolygon(mesh,pt){
    let n_mesh = mesh.clone();
    const m = multiply(multiply(n_mesh.getAttribute("p_matrix"),n_mesh.getAttribute("r_matrix")),n_mesh.getAttribute("s_matrix"));
    n_mesh.updatePosition(m);
    
    const ppts = n_mesh.position.points;
    const n = n_mesh.position.length;

    const x = pt[0];
    const y = pt[1];

    let intersect = false;

    for(let i = 0, j = n-1; i < n; j = i++){
        const xi = ppts[i*3], yi = ppts[i*3+1];
        const xj = ppts[j*3], yj = ppts[j*3+1];

        if(((yi >= y) !== (yj >= y)) 
        && (x <= (xj - xi) * (y - yi) / (yj - yi) + xi)){
            intersect = !intersect;
        }
    }
    return intersect;
}
/**
 * Algorithm to determine whether the click position is near to the line
 * 自分で思いついたから結構遅い（へへ）
 * 
 * @param {Line} line 
 * @param {Number[]} pt 
 * @returns {boolean}
 */

function pointOnLine(line,pt){
    let n_mesh = line.clone();
    const m = multiply(multiply(n_mesh.getAttribute("p_matrix"),n_mesh.getAttribute("r_matrix")),n_mesh.getAttribute("s_matrix"));
    n_mesh.updatePosition(m);
    
    const ppts = n_mesh.position.points;
    const n = n_mesh.position.length;

    //mouse position
    const mx = pt[0];
    const my = pt[1];

    //what's the maximum distance between mouse point and line to be count as clicked
    const tolerentDistance = 5;
    const precision = 50;

    for(let i = 0; i < n-1; ++i){
        const x1 = ppts[i*3],     y1 = ppts[i*3 + 1];
        const x2 = ppts[(i+1)*3], y2 = ppts[(i+1)*3 + 1];

        const dx = (x2 - x1)/precision;
        const dy = (y2 - y1)/precision;

        let x = x1;
        let y = y1;
        for(let t = 0; t < precision; t++){
            x = x + dx;
            y = y + dy;
            const ddx = (mx - x), ddy = (my - y);
            //console.log(Math.sqrt(ddx*ddx+ddy*ddy));
            if(Math.sqrt(ddx*ddx+ddy*ddy) < tolerentDistance){
                return true;
            }
        }
    }
    return false;
}