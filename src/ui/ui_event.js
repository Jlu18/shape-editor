/**
 * 
 * @param {stinrg|HTMLElement}e
 */
 function select_mesh(e){
    let el = $(e);
    reset_selections($("#shapes"));
    reset_selections($("#transforms"));
    reset_selections($("#meshes"));
    reset_transformation()

    if(selected.type === e.className){
        selected.type = "none";
        return;
    }
    el.find("a").addClass("selected");
    selected.type = e.className;
    selected.isLine = false;
    if(selected.type === "line" || selected.type === "polyline" ){
        selected.isLine = true;
        selected.id = create_mesh(selected.type);
        selected.mesh = m_mesh.get(selected.id);
    }
    if(selected.type==="curve"){
        $("#curve").removeClass("hide");   
        $("#curve").addClass("show");   
    }else{
        $("#curve").removeClass("show");   
        $("#curve").addClass("hide");   
    }
    
}

function add_mesh(id){
    $("#meshes").append(`<li class="${id}"><a href="#"> ${id} </a></li>`);
    $(`.${id}`).click(e=>{select_exist(e.currentTarget);});
}

function remove_mesh(){
    if(selected.type === "exist"){
        m_mesh.delete(selected.id);
        $(`.${selected.id}`).remove();
        selected.type = "none";
    }
}

function select_tool(tool){
    let el = $(tool);
    reset_selections($("#shapes"));
    reset_selections($("#transforms"));
    
    el.find("a").addClass("selected");

    if(selected.type !== "none" && selected.type !== "exist"){
        selected.type = "none";
    }

    //transformaiton scale
    reset_transformation();
    $(`#${tool.className}`).removeClass("hide");
    $(`#${tool.className}`).addClass("show");
}

function reset_transformation(){
    $("#transformationbox").children().each((_i,e)=>{
        if($(e).hasClass("show")){
            $(e).removeClass("show");
            $(e).addClass("hide");
        }
    })
}
function reset_selections(el) {
    $(el).children().each((_i,e)=>{
        if ($(e).find("a").hasClass('selected')) {
            $(e).find("a").removeClass('selected');
        }
    });
}

function open(){
    const fileList = this.files;
    reader = new FileReader();
    reader.onload = function(event) {
        let obj = JSON.parse(event.target.result);
        read_meshes(obj);
    };
  reader.readAsText(fileList[0]);
}

function read_meshes(obj){
    obj.mesh.forEach(m=>{
        create_mesh(m.type,m);
    })
}
/**
 *  Save the meshes in mesh managers into a json file 
 *      and download to local storage
 */
function save() {
    const re = {
        mesh:[]
    };
    m_mesh.getMeshNames().forEach(n=>{
        let m = m_mesh.get(n);
        re.mesh.push(MeshClassToObject(m));
    })
    let a = document.createElement("a");
    let file = new Blob([JSON.stringify(re)], {type: "text/json"});
    a.href = URL.createObjectURL(file);
    a.download = "shape_editor.json";
    a.click();
    a.remove();
}

/**
 * Convert Mesh classes into an Object
 * @param {Mesh} e 
 * @returns {object}
 */
function MeshClassToObject(e){
    const obj = {};

    Object.keys(e).forEach(k=>{
        obj[k] = e[k];
    });
    //Don't need unique ids
    delete obj["uid"];
    delete obj["vid"];
    delete obj["iid"];
    return obj; 

}

/**
 *  Export canvas to a JPEG image 
 */
function exportImg(){
    var link = document.createElement('a');
    link.download = 'shape-editor.jpg';
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
    link.remove();
}

function undo(){

}

function clear(){
    if(!m_mesh.isEmpty()){
        if(confirm("It seems you scene is not empty, would you want to create new scene?")){
            m_mesh.reset();
        }
    }
}