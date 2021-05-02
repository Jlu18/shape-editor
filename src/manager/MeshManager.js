/*
    Script where it manages all the meshes in the editor
*/
class MeshManager{
    constructor(){
        this.list = new Object();
        this.count = 0;
        this.selected = [];
    }
    add(el){
        if(!(el instanceof Mesh)){
            console.error("MeshManager add() Error: " + typeof el + " is not Mesh");
            return null;
        }
        el.uid = el.type + String(this.count);
        ++this.count;
        this.list[el.uid] = el;
        return el.uid;
    }
    delete(id){
        if(!this.list[id]) {
            console.error("MeshManager delete() Error: " + id + " doesn't exist in list");
            return null;
        }
        this.list[id].delete();
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
    getAllNames(){
        return Object.keys(this.list);
    }
    getAllMeshes(){
        return Object.values(this.list);
    }
    reset(){
        for(let n in this.list){
            this.delete(n);
        }
    }
    isEmpty(){
        return (Object.keys(this.list).length === 0);
    }
    create(type){
        switch(type){
            case "triangle":
                return this.add(new Triangle(
                    new Vector3(-10,0,0),new Vector3(0,-15,0),new Vector3(10,0,0)
                ));
            case "rectangle":
                return this.add(new Rectangle(15,15));
            case "polygon":
                return this.add(new Polygon(new Vector3(0,0,0),12,5));
            case "circle":
                return this.add(new Circle(new Vector3(0,0,0),12));
            case "line":
                return this.add(new Line());
            case "curve":
                return this.add(new Curve());
            case "polyline":
                return this.add(new Polyline());
            default:
                console.error("Meshmanger Create Error: Unknown shape type " + type);
                return null;
        }
    }

}