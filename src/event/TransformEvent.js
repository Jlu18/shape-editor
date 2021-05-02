function move_m(x,y){
    m_renderer.p_matrix = translation([x,y,0]);
}

function scale_m(x,y){
    const s = 20;
    m_renderer.s_matrix = scale(identity(),[x/s,y/s,1]);
}

function rotate_m(x,y){
    let mag = Math.sqrt((x*x + y*y));
    if(x < 0) mag *= -1;
    m_renderer.r_matrix = rotateZ(identity(),mag/4);
}

function color(e){
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.target.value);
    const color = result ? [
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255,
        1]
    : [1,1,1,1];

    if(m_select.isEmpty()){
        m_renderer.b_color.setAll(...color);
    }else{
        m_select.list.forEach(n=>{
            const m = m_mesh.get(n);
            m.setAttribute("color",new Vector4(...color));
        });
    }
}