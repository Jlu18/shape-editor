function update_selected(name){
    selected.name = name;
    if(name !== "none"){
        selected.id = create_mesh(name);
        if(selected.id){
            selected.mesh = m_mesh.get(selected.id);
        }
    }
}

function create_mesh(name,attribs){
    console.log("new mesh: " + name);
    switch(name){
        case "line":
            return m_mesh.add(new Line(attribs));
        case "triangle":
            return m_mesh.add(new Triangle(attribs));
        case "rectangle":
            return m_mesh.add(new Rectangle(attribs));
        case "circle":
            return m_mesh.add(new Circle(attribs));
        case "curve":
            return null;
        case "polyline":
            return m_mesh.add(new Polyline(attribs));
        case "polygon":
            return m_mesh.add(new Polygon(attribs));
        default:
            console.warn("create_shape() Warn: Unknown shape name " + name);
            return null;
    }
}