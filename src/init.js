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
    

    // Initialize Managers
    m_mesh = new MeshManager();
    m_shader = new Shader(vShader,fShader,["aPosition","aColor","uProjectMatrix","uMatrix"]);

    start(); 
});