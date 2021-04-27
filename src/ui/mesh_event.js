function select_mesh(e){
    let el = $(e);
    reset_selections(el.parent().get(0));
    if(selected.name === e.className){
        update_selected("none");
    }else{
        update_selected(e.className);
        el.find("a").addClass("selected");
    }
}

function reset_selections(el) {
    $(el).children().each((_i,e)=>{
        if ($(e).find("a").hasClass('selected')) {
            $(e).find("a").removeClass('selected');
        }
    });
}

function update_selected(name){
    //console.log(name);
    if(selected.id){
        m_mesh.delete(selected.id);
        selected.id = null;
    }
    selected.name = name;
    if(name !== "none"){
        selected.id = create_mesh(name,{color:[1,0,0,0.1]});
        if(selected.id){
            selected.mesh = m_mesh.get(selected.id);
        }
    }
}

function create_mesh(name,attribs){
    console.log(m_mesh.getMeshNames());
    switch(name){
        case "line":
            return null;
        case "triangle":
            return m_mesh.add(new Triangle(attribs));
        case "rectangle":
            return m_mesh.add(new Rectangle(attribs));
        case "circle":
            return m_mesh.add(new Circle(attribs));
        case "curve":
            return null;
        case "polyline":
            return null;
        case "polygon":
            return m_mesh.add(new Polygon(attribs));
        default:
            console.warn("create_shape() Warn: Unknown shape name " + name);
            return null;
    }
}