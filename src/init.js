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
    m_undo = new UndoManager();
    m_undo.push(m_mesh);

    //Make the toolboxes draggable
    $("#shapebox").draggable({handle: 'h3', containment: '#container'});
    $("#toolbox").draggable({handle: 'h3', containment: '#container'});
    $("#meshbox").draggable({handle: 'h3', containment: '#container'});
    $("#transformationbox").draggable({handle: 'h3', containment: '#container'});
    $("#colorbox").draggable({handle: 'h3', containment: '#container'});

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
    document.getElementById("fileinput").addEventListener("change", open);
    $("li.new"      ).click((e)=>{clear()});
    $("li.save"     ).click((e)=>{save()});
    $("li.export"   ).click((e)=>{exportImg()});
    $("li.undo"     ).click((e)=>{undo()});
    $("li.copy"     ).click((e)=>{copy()});
    $("li.paste"    ).click((e)=>{paste()});
    $("li.delete"   ).click((e)=>{remove_mesh()});
    $("li.move"     ).click((e)=>{select_tool(e.currentTarget)});
    $("li.scale"    ).click((e)=>{select_tool(e.currentTarget)});
    $("li.rotate"   ).click((e)=>{select_tool(e.currentTarget)});

    //Transformation event
    document.getElementById("move-x").addEventListener("input", moveX);
    document.getElementById("move-y").addEventListener("input", moveY);
    document.getElementById("ctrl-1x").addEventListener("input", ctrlPt1X);
    document.getElementById("ctrl-1y").addEventListener("input", ctrlPt1Y);
    document.getElementById("ctrl-2x").addEventListener("input", ctrlPt2X);
    document.getElementById("ctrl-2y").addEventListener("input", ctrlPt2Y);
    document.getElementById("scale-x").addEventListener("input", scaleX);
    document.getElementById("scale-y").addEventListener("input", scaleY);
    document.getElementById("rotateinput").addEventListener("input", rotate);

    const lx= ["move-x","ctrl-1x","ctrl-2x"];
    const ly= ["move-y","ctrl-1y","ctrl-2y"];
    for(let i= 0; i < 3; i++){
        let xM = document.getElementById(lx[i]);
        let yM = document.getElementById(ly[i]);
        xM.min = 0;
        xM.max = width;
        yM.min = 0;
        yM.max = height;
    }
    
    document.getElementById("color-picker").addEventListener("change", color);
    //mouse event
    canvas.addEventListener("mousemove",mousemove);
    canvas.addEventListener("mouseup",mouseup);
    // canvas.addEventListener("mousedown",mousedown);
    // canvas.addEventListener("mouseenter",mouseenter);
    // canvas.addEventListener("mouseleave",mouseleave);
    canvas.addEventListener("dblclick",mousedclick);
    canvas.addEventListener("contextmenu",(e)=>{e.preventDefault();e.stopPropagation();});
    
    //end of intialization
    start(); 
});