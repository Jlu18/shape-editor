/*
    Script where it manages all the meshes in the editor
*/
class MeshManager{
    constructor(){
        this.list = new Object();
        this.count = 0;
    }
    add(el){
        if(!(el instanceof Mesh)){
            console.error("MeshManager add() Error: " + Object.prototype.toString(e) + "is not Mesh");
            return;
        }
        el.uid = el.type + String(this.count);
        ++this.count;
        this.list[el.uid] = el;
    }
    delete(id){
        if(!this.list[id]) {
            console.error("MeshManager remove() Error: " + id + " doesn't exist in list");
            return null;
        }
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
}