/**
 * Change the type of mesh user can instantiate on canvas
 * @param {string} type 
 */
function change_mesh_created(type){
    selected.type = type;
    if(!selected.created && selected.id){
        m_mesh.delete(selected.id);
        delete selected.id;
    }
    if(type !== "none"){
        if(type==="curve"){
            $("#curve").removeClass("hide");   
            $("#curve").addClass("show");   
        }else{
            $("#curve").removeClass("show");   
            $("#curve").addClass("hide");   
        }
        selected.id = create_mesh(type);
        if(selected.id){
            selected.mesh = m_mesh.get(selected.id);
            selected.created = false;
        }
    }
}

function create_mesh(type,attribs){
    //console.log("new mesh: " + type);
    switch(type){
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
            console.warn("create_shape() Warn: Unknown shape type " + type);
            return null;
    }
}