$(document).ready(function(){
    // window.onbeforeunload = function() {
    //     return "Do you really want to leave our brilliant application?";
    //     //if we return nothing here (just calling return;) then there will be no pop-up question at all
    //     //return;
    //  };
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas = document.getElementById("canvas");
    console.log("Canvas size: " + canvas.clientWidth + " " + canvas.clientHeight);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    gl = canvas.getContext("webgl",{preserveDrawingBuffer: true});

    if(!gl){
        alert("Failed to get webgl context");
        return;
    }

    // Initialize Managers
    m_mesh = new MeshManager();
    m_shader = new Shader(vShader,fShader,["aPosition"]);
    m_renderer = new Renderer(m_shader,m_mesh);
    m_renderer.findUniform(["uColor","uProjMatrix","uMatrix"]);
    m_renderer.bindUniform("MAT4","uProjMatrix",m_renderer.projection);

    //Make the toolboxes draggable
    $("#shapebox").draggable({handle: 'h3', containment: '#container'});
    $("#toolbox").draggable({handle: 'h3', containment: '#container'});
    $("#meshbox").draggable({handle: 'h3', containment: '#container'});
    $("#transformationbox").draggable({handle: 'h3', containment: '#container'});

    //Shape editor
    $("li.line"     ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.triangle" ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.rectangle").click((e)=>{select_mesh(e.currentTarget);});
    $("li.circle"   ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.curve"    ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.polyline" ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.polygon"  ).click((e)=>{select_mesh(e.currentTarget);});
    //$("li.triangle").find("a").click();
    
    //Tool Editor
    document.getElementById("fileinput").addEventListener("change", open, false);
    $("li.new"      ).click((e)=>{clear()});
    $("li.save"     ).click((e)=>{save()});
    $("li.export"   ).click((e)=>{exportImg()});
    $("li.undo"     ).click((e)=>{});
    $("li.delete"   ).click((e)=>{remove_mesh()});
    $("li.move"     ).click((e)=>{select_tool(e.currentTarget)});
    $("li.scale"    ).click((e)=>{select_tool(e.currentTarget)});
    $("li.rotate"   ).click((e)=>{select_tool(e.currentTarget)});

    canvas.addEventListener("mousemove",mousemove);
    canvas.addEventListener("mousedown",mousedown);
    canvas.addEventListener("mouseup",mouseup);
    canvas.addEventListener("mouseenter",mouseenter);
    canvas.addEventListener("mouseleave",mouseleave);
    canvas.addEventListener("dblclick",mousedclick);
    canvas.addEventListener("contextmenu",(e)=>{e.preventDefault();e.stopPropagation();});
    start(); 
});