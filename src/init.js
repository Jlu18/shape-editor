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

    //Make the toolboxes draggable
    $("#shapes").draggable({handle: 'h3', containment: '#container'});
    $("#tools").draggable({handle: 'h3', containment: '#container'});

    //Shape editor
    $("li.line"     ).click(()=>{create_shape("line");});
    $("li.triangle" ).click(()=>{create_shape("triangle");});
    $("li.rectangle").click(()=>{create_shape("rectangle");});
    $("li.circle"   ).click(()=>{create_shape("circle");});
    $("li.curve"    ).click(()=>{create_shape("curve");});
    $("li.polyline" ).click(()=>{create_shape("polyline");});
    $("li.polygon"  ).click(()=>{create_shape("polygon");});
    

    // Initialize Managers
    m_mesh = new MeshManager();
    m_shader = new Shader(vShader,fShader,["aPosition"]);
    m_renderer = new Renderer(m_shader,m_mesh);
    m_renderer.findUniform(["uColor","uProjMatrix","uMatrix"]);
    m_renderer.bindUniform("MAT4","uProjMatrix",m_renderer.projection);

    start(); 
});