function select_exist(e){
    if(selected.isLine){
        m_mesh.delete(selected.id);
        selected.type ="none";
        selected.id = null;
        selected.isLine = false;
    }
    selected.mesh = m_mesh.get(e.className);
    if(!selected.mesh)return;
    
    console.log(e.className);
    reset_selections("#shapes");
    reset_selections("#meshes");
    
    $("."+e.className).find("a").addClass("selected");
    
    selected.type = "exist";
    selected.id = e.className;
}

function create_mesh(type,attribs){
    //console.log("new mesh: " + type);
    switch(type){
        case "exist":
        case "none":
            return;
        case "line":
            return m_mesh.add(new Line(attribs));
        case "triangle":
            return m_mesh.add(new Triangle(attribs));
        case "rectangle":
            return m_mesh.add(new Rectangle(attribs));
        case "circle":
            return m_mesh.add(new Circle(attribs));
        case "curve":
            return m_mesh.add(new Curve(attribs));
        case "polyline":
            return m_mesh.add(new Polyline(attribs));
        case "polygon":
            return m_mesh.add(new Polygon(attribs));
        default:
            console.warn("create_meshs() Warn: Unknown shape type " + type);
            return null;
    }
}