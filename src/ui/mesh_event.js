function create_shape(name){
    switch(name){
        case "line":
            break;
        case "triangle":
            m_mesh.add(triangle());
            break;
        case "rectangle":
            break;
        case "circle":
            break;
        case "curve":
            break;
        case "polyline":
            break;
        case "polygon":
            break;
        default:
            console.warn("create_shape() Warn: Unknown shape name " + name);
            return;
    }
    console.log(m_mesh.getMeshNames());
}