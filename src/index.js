/*
    Global Variables
*/
let gl;
let canvas;
let width;
let height;
/*
    Manager
*/
let m_mesh;
let m_shader;
let m_renderer;
let selected = {
    type:"none",
    id:null,
    mesh:null,
    isNew:false,
};

function start(){
    console.log("start");
    //render every 25ms
    //use this instead of requestAnimationFrame because I don't need 60fps
    setInterval(()=>{
        m_renderer.draw();
    },25);
}
