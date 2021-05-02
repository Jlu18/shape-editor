$(document).ready(function(){
    // window.onbeforeunload = function() {
    //     return "Do you really want to leave our brilliant application?";
    //     //if we return nothing here (just calling return;) then there will be no pop-up question at all
    //     //return;
    //  };
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas = document.getElementById("canvas");
    canvas.width = width = canvas.clientWidth;
    canvas.height = height = canvas.clientHeight;
    console.log("Canvas size: " + width + " " + height);
 
    gl = canvas.getContext("webgl",{preserveDrawingBuffer: true});

    if(!gl){
        alert("Failed to get webgl context");
        return;
    }

    

    // Initialize Managers
    m_mesh = new MeshManager();
    m_shader = new Shader(vShader,fShader,["aPosition"],["uColor","uMatrix"]);
    m_dot_shader = new Shader(vDotShader,fShader,["aPosition"],["udColor","uMatrix"]);
    m_renderer = new Renderer();
    m_select = new SelectionManager();
    m_ui = new UIManager();
    m_undo = new UndoManager();
    m_undo.push(m_mesh); //push empty canvas

    //Shape editor
    $("li.triangle" ).click((e)=>{m_ui.select("triangle")});
    $("li.rectangle").click((e)=>{m_ui.select("rectangle")});
    $("li.circle"   ).click((e)=>{m_ui.select("circle")});
    $("li.curve"    ).click((e)=>{m_ui.select("curve")});
    $("li.line"     ).click((e)=>{m_ui.select("line")});
    $("li.polyline" ).click((e)=>{m_ui.select("polyline")});
    $("li.polygon"  ).click((e)=>{m_ui.select("polygon")});
    //$("li.triangle").find("a").click();
    
    //Tool Editor
    document.getElementById("fileinput").addEventListener("change", open);
    $("li.new"      ).click((e)=>{clear()});
    $("li.save"     ).click((e)=>{saveJSON()});
    $("li.export"   ).click((e)=>{exportImg()});
    $("li.undo"     ).click((e)=>{undo()});
    $("li.copy"     ).click((e)=>{copy()});
    $("li.paste"    ).click((e)=>{paste()});
    $("li.delete"   ).click((e)=>{ m_select.list.forEach(n=>{m_mesh.delete(n);})});
    $("li.move"     ).click((e)=>{m_ui.select("move")});
    $("li.scale"    ).click((e)=>{m_ui.select("scale")});
    $("li.rotate"   ).click((e)=>{m_ui.select("rotate")});

    document.getElementById("color-picker").addEventListener("input", color);
    //mouse event
    canvas.addEventListener("mousemove",mousemove);
    canvas.addEventListener("mousedown",mousedown);
    canvas.addEventListener("mouseup",mouseup);
    canvas.addEventListener("dblclick",mousedclick);
    canvas.addEventListener("contextmenu",(e)=>{e.preventDefault();e.stopPropagation();});
    // canvas.addEventListener("mouseenter",mouseenter);
    // canvas.addEventListener("mouseleave",mouseleave);
    document.addEventListener("keypress",(e)=>{
        switch(e.key){            
            case "a":
                m_ui.select("none");
                if(m_select.isEmpty()){
                    m_mesh.getAllNames().forEach(n=>{m_select.add(n);});
                }else{
                    m_select.removeAll();
                }
                break;
        }
    });
    document.addEventListener("keydown",(e)=>{
        if(e.ctrlKey){
            switch(e.key){
                case "c":
                    copy();
                    break;
                case "v":
                    paste();
                    break;
            }
        }else{
            switch(e.key){
                case "Escape":
                    m_ui.select("none");
                    break;
                case "Delete":
                    m_select.list.forEach(n=>{m_mesh.delete(n);});
                    break;
            }
        }
    })

    // $(window).resize(()=>{
    //     let c = $('#canvas');
    //     canvas.width = width = canvas.clientWidth;
    //     canvas.height = height = canvas.clientHeight;
    //     m_renderer.projection = projection(width,height);
    // });

    //end of intialization
    start(); 
});