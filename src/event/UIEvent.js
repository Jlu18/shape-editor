/*

File Tools

*/

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
        let id = m_mesh.create(m.type);
        let mesh = m_mesh.get(id)
        mesh.copy(m);
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
    m_mesh.getAllMeshes().forEach(m=>{
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

console.log(JSON.stringify(new Vector3(1,2,3)));

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
    m_undo.pop();
    let n = m_undo.pop();
    console.log(n);
    if(n){
        m_mesh.reset()
        n.mesh.forEach(m=>{
            let id = m_mesh.create(m.type);
            m_mesh.get(id).copy(m);
        });
    }
}

let copiedlist = [];
function copy(){
    copiedlist = new Array(...m_select.list);
}

function paste(){
    m_select.removeAll();
    copiedlist.forEach(n=>{
        const m = m_mesh.get(n).clone();
        m.applyMatrix("p_matrix",translation([5,5,0]));
        m.bindBuffer();
        m.bindIndexBuffer();
        let nn = m_mesh.add(m);
        m_select.add(nn);
    })
}

function clear(){
    if(!m_mesh.isEmpty()){
        if(confirm("It seems you scene is not empty, would you want to create new scene?")){
            m_mesh.reset();
        }
    }
}