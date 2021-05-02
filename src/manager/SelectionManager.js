class SelectionManager{
    constructor(){ 
        this.list = [];
    }
    add(id){
        this.list.push(id);
    }
    remove(id){
        this.list = this.list.filter(item => item !== id);
    }
    removeAll(){
        this.list = [];
    }
    isEmpty(){
        return this.list.length === 0;
    }
    exist(id){
        return this.list.indexOf(id) !== -1;
    }
}