class UndoManager {
    constructor(){
        this.snapshot = [];
    }
    push(){
        const re = {
            mesh:[]
        };
        m_mesh.getAllMeshes().forEach(m=>{
            re.mesh.push(MeshClassToObject(m));
        })
        this.snapshot.push(JSON.stringify(re));
    }
    pop(){
        if(this.snapshot.length <= 1) {
            return JSON.parse(this.snapshot[0]);
        }
        return JSON.parse(this.snapshot.pop());
    }
}