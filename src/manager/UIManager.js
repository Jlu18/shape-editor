class UIManager {
    constructor(){
        this.selected = "none";
        this.shapelist = ["triangle","rectangle","polygon","circle","line","polyline","curve"];
        this.transformlist = ["move","scale","rotate"];
    }
    clear(){
        $("#shapes").children().each((_i,e)=>{
            if ($(e).find("a").hasClass('selected')) {
                $(e).find("a").removeClass('selected');
            }
        });
        $("#transforms").children().each((_i,e)=>{
            if ($(e).find("a").hasClass('selected')) {
                $(e).find("a").removeClass('selected');
            }
        });
    }
    select(name){
        if(name === this.selected || name === "none"){
            this.clear();
            this.selected = "none";
            this.isShapeSelected = false;
            this.isTransformSelected = false;
            return;
        }

        let el = null;
        if(this.shapelist.indexOf(name) !== -1){
            el = $("#shapes").children(`.${name}`);
            this.isShapeSelected = true;
            this.isTransformSelected = false;
        }else if(this.transformlist.indexOf(name) !== -1){
            el = $("#transforms").children(`.${name}`);
            this.isShapeSelected = false;
            this.isTransformSelected = true;
        }else{
            console.error("UIManager select() Error: " + name + " Not Found.");
        }
        this.clear();
        if(el) el.find("a").addClass("selected");
        this.selected = name;
    }
}