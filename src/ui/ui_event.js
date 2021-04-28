function select_mesh(e){
    let el = $(e);
    reset_selections(el.parent().get(0));
    if(selected.type === e.className){
        update_selected("none");
    }else{
        update_selected(e.className);
        el.find("a").addClass("selected");
    }
}

function reset_selections(el) {
    $(el).children().each((_i,e)=>{
        if ($(e).find("a").hasClass('selected')) {
            $(e).find("a").removeClass('selected');
        }
    });
}
