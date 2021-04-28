$(document).ready(function(){
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    const canvas = document.getElementById("canvas");
    console.log("Canvas size: " + canvas.clientWidth + " " + canvas.clientHeight);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    gl = canvas.getContext("webgl");

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
    $("#shapes").draggable({handle: 'h3', containment: '#container'});
    $("#tools").draggable({handle: 'h3', containment: '#container'});

    //Shape editor
    $("li.line"     ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.triangle" ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.rectangle").click((e)=>{select_mesh(e.currentTarget);});
    $("li.circle"   ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.curve"    ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.polyline" ).click((e)=>{select_mesh(e.currentTarget);});
    $("li.polygon"  ).click((e)=>{select_mesh(e.currentTarget);});
    //$("li.triangle").find("a").click();

    canvas.addEventListener("mousemove",mousemove);
    canvas.addEventListener("mousedown",mousedown);
    canvas.addEventListener("mouseup",mouseup);
    canvas.addEventListener("dblclick",mousedclick);
    canvas.addEventListener("contextmenu",(e)=>{e.preventDefault();e.stopPropagation();});
    start(); 
});