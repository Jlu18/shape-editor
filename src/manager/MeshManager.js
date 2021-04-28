/*
    Script where it manages all the meshes in the editor
*/
class MeshManager{
    constructor(){
        this.list = new Object();
        this.count = 0;
    }
    add(el){
        console.log(el);
        if(!(el instanceof Mesh)){
            console.error("MeshManager add() Error: " + typeof el + " is not Mesh");
            return null;
        }
        el.uid = el.type + String(this.count);
        ++this.count;
        this.list[el.uid] = el;
        $("#meshes").append(`<li class="${el.uid}"><a href="#"> ${el.uid} </a></li>`);
        $(`.${el.uid}`).click(e=>{select_exist(e.currentTarget);});
        return el.uid;
    }
    delete(id){
        if(!this.list[id]) {
            console.error("MeshManager delete() Error: " + id + " doesn't exist in list");
            return null;
        }
        $(`.${id}`).remove();
        
        gl.deleteBuffer(this.list[id].vid);
        delete this.list[id];
    }
    /**
     * 
     * @param {string} id 
     * @returns {Mesh}
     */
    get(id){
        if(!this.list[id]){ 
            console.warn("MeshManager get() Warn: " + id + "Not found");
            return null;
        }
        return this.list[id];
    }
    getMeshNames(){
        return Object.keys(this.list);
    }
    reset(){
        for(let n in this.list){
            this.delete(n);
        }
    }
    isEmpty(){
        return (Object.keys(this.list).length === 0);
    }
}