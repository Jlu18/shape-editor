var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};
$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};
$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))return;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var g=e[f];if(!(g in d))return;d=d[g]}e=e[e.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[e]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==c&&(void 0===$jscomp.propertyToPolyfillSymbol[e]&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):
$jscomp.POLYFILL_PREFIX+e),$jscomp.defineProperty(d,$jscomp.propertyToPolyfillSymbol[e],{configurable:!0,writable:!0,value:b})))};
$jscomp.getConstructImplementation=function(){function a(){function c(){}new c;Reflect.construct(c,[],function(){});return new c instanceof c}if($jscomp.TRUST_ES6_POLYFILLS&&"undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){void 0===e&&(e=c);e=$jscomp.objectCreate(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||
e}};$jscomp.construct={valueOf:$jscomp.getConstructImplementation}.valueOf();$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};$jscomp.setPrototypeOf=$jscomp.TRUST_ES6_POLYFILLS&&"function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,b){a.prototype=$jscomp.objectCreate(b.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var c=$jscomp.setPrototypeOf;c(a,b)}else for(c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.superClass_=b.prototype};$jscomp.polyfill("Reflect",function(a){return a?a:{}},"es6","es3");$jscomp.polyfill("Reflect.construct",function(a){return $jscomp.construct},"es6","es3");
$jscomp.polyfill("Reflect.setPrototypeOf",function(a){if(a)return a;if($jscomp.setPrototypeOf){var b=$jscomp.setPrototypeOf;return function(c,d){try{return b(c,d),!0}catch(e){return!1}}}return null},"es6","es5");$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(e,f){this.$jscomp$symbol$id_=e;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:f})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var c=0,d=function(e){if(this instanceof d)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(e||"")+"_"+c++,e)};return d},"es6","es3");
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=$jscomp.global[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&$jscomp.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};e[Symbol.iterator]=function(){return e};return e};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(b){return b})}},"es6","es3");
$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(b,c){return $jscomp.findInternal(this,b,c).v}},"es6","es3");function projection(a,b,c){return[2/a,0,0,0,0,-2/b,0,0,0,0,2/(void 0===c?400:c),0,-1,1,0,1]}function identity(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}
function translate(a,b){return multiply(a,[1,0,0,0,0,1,0,0,0,0,1,0,b[0],b[1],b[2],1])}function moveto(a,b){a[12]=0;a[13]=0;a[14]=0;return translate(a,b)}
function multiply(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],k=a[6],l=a[7],m=a[8],n=a[9],p=a[10],q=a[11],r=a[12],t=a[13],u=a[14];a=a[15];var v=b[0],w=b[1],x=b[2],y=b[3],z=b[4],A=b[5],B=b[6],C=b[7],D=b[8],E=b[9],F=b[10],G=b[11],H=b[12],I=b[13],J=b[14];b=b[15];return[v*c+w*g+x*m+y*r,v*d+w*h+x*n+y*t,v*e+w*k+x*p+y*u,v*f+w*l+x*q+y*a,z*c+A*g+B*m+C*r,z*d+A*h+B*n+C*t,z*e+A*k+B*p+C*u,z*f+A*l+B*q+C*a,D*c+E*g+F*m+G*r,D*d+E*h+F*n+G*t,D*e+E*k+F*p+G*u,D*f+E*l+F*q+G*a,H*c+I*g+J*m+b*r,H*d+I*h+J*n+b*t,H*e+
I*k+J*p+b*u,H*f+I*l+J*q+b*a]}function multiplyM(a,b,c,d){for(var e=[],f=0;f<b;f++)for(var g=0;g<d;g++)e.push(a[f*b]*c[g]+a[f*b+1]*c[g+d]+a[f*b+2]*c[g+2*d]+a[f*b+3]*c[g+3*d]);return e};var fShader="\nprecision mediump float;\nvarying vec4 vColor;\nvoid main(){\n    gl_FragColor = vColor;\n}";var vShader="\nattribute vec4 aPosition;\nuniform vec4 uColor;\nuniform mat4 uProjMatrix;\nuniform mat4 uMatrix;\nvarying vec4 vColor;\nvoid main(){\n    gl_Position = uProjMatrix * uMatrix * aPosition;\n    vColor = uColor;\n}";var Shader=function(a,b,c){a=this.createShader(gl.VERTEX_SHADER,a);b=this.createShader(gl.FRAGMENT_SHADER,b);if(!a||!b)return null;var d=gl.createProgram();gl.attachShader(d,a);gl.attachShader(d,b);c.forEach(function(e,f){gl.bindAttribLocation(d,f,e)});gl.linkProgram(d);this.program=d};
Shader.prototype.createShader=function(a,b){var c=gl.createShader(a);gl.shaderSource(c,b);gl.compileShader(c);return gl.getShaderParameter(c,gl.COMPILE_STATUS)?c:(b=gl.getShaderInfoLog(c),console.error("Shader createShader() Error: Failed to compile "+a+". "+b),gl.deleteShader(c),null)};Shader.prototype.bindAttrib=function(a,b,c,d){gl.bindBuffer(gl.ARRAY_BUFFER,a);gl.enableVertexAttribArray(b);gl.vertexAttribPointer(b,c,d,!1,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,null)};var MeshManager=function(){this.list={};this.count=0};MeshManager.prototype.add=function(a){if(!(a instanceof Mesh))return console.error("MeshManager add() Error: "+typeof a+"is not Mesh"),null;a.uid=a.type+String(this.count);++this.count;this.list[a.uid]=a;return a.uid};MeshManager.prototype.delete=function(a){if(!this.list[a])return console.error("MeshManager delete() Error: "+a+" doesn't exist in list"),null;gl.deleteBuffer(this.list[a].vid);delete this.list[a]};
MeshManager.prototype.get=function(a){return this.list[a]?this.list[a]:(console.warn("MeshManager get() Warn: "+a+"Not found"),null)};MeshManager.prototype.getMeshNames=function(){return Object.keys(this.list)};MeshManager.prototype.reset=function(){for(var a in this.list)this.delete(a)};var uniformType=Object.freeze({INT:0,FLOAT:1,VEC2:2,VEC3:3,VEC4:4,MAT3:5,MAT4:6}),Renderer=function(){this.uniform={};gl.useProgram(m_shader.program);this.projection=projection(width,height);gl.disable(gl.DEPTH_TEST)};
Renderer.prototype.draw=function(){var a=this;gl.viewport(0,0,width,height);gl.clearColor(.2,.2,.2,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);m_mesh.getMeshNames().forEach(function(b){b=m_mesh.get(b);m_shader.bindAttrib(b.vid,0,3,gl.FLOAT);a.bindUniform("MAT4","uMatrix",b.matrix);a.bindUniform("VEC4","uColor",b.color);gl.drawArrays(gl.TRIANGLES,0,b.len);b.m=!1})};
Renderer.prototype.findUniform=function(a){var b=this;a.forEach(function(c){b.uniform[c]=gl.getUniformLocation(m_shader.program,c)})};
Renderer.prototype.bindUniform=function(a,b,c){var d=this.uniform[b];if(d)switch(uniformType[a]){case uniformType.INT:case uniformType.FLOAT:case uniformType.VEC2:case uniformType.VEC3:break;case uniformType.VEC4:gl.uniform4fv(d,new Float32Array(c));break;case uniformType.MAT3:break;case uniformType.MAT4:gl.uniformMatrix4fv(d,!1,c);break;default:console.error("bindUniform() Error: Unknown type: "+a)}else console.error("bindUniform() Error: Unknown uniform name "+b)};var Mesh=function(){this.type="Mesh"};Mesh.prototype.init=function(){this.pts&&(this.vid||(this.vid=gl.createBuffer()),gl.bindBuffer(gl.ARRAY_BUFFER,this.vid),gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.pts),gl.STATIC_DRAW),gl.bindBuffer(gl.ARRAY_BUFFER,null))};Mesh.prototype.setValue=function(a){if(a)for(var b in a)this[b]=a[b]};
var Triangle=function(a){Mesh.call(this);this.type="triangle";this.pts=[-12,13.48,0,12,13.48,0,0,-13.48,0];this.len=3;this.color=[1,0,0,1];this.matrix=identity();this.setValue(a);this.init()};$jscomp.inherits(Triangle,Mesh);function select_mesh(a){var b=$(a);reset_selections(b.parent().get(0));selected.name===a.className?update_selected("none"):(update_selected(a.className),b.find("a").addClass("selected"))}function reset_selections(a){$(a).children().each(function(b,c){$(c).find("a").hasClass("selected")&&$(c).find("a").removeClass("selected")})}
function update_selected(a){selected.id&&(m_mesh.delete(selected.id),selected.id=null);selected.name=a;"none"!==a&&(selected.id=create_mesh(a,{color:[1,0,0,.1]}),selected.id&&(selected.mesh=m_mesh.get(selected.id)))}
function create_mesh(a,b){switch(a){case "line":return null;case "triangle":return m_mesh.add(new Triangle(b));case "rectangle":return null;case "circle":return null;case "curve":return null;case "polyline":return null;case "polygon":return null;default:return console.warn("create_shape() Warn: Unknown shape name "+a),null}};var flag=0,pmp=[];function mousedown(a){}function mouseup(a){"none"!==selected.name&&create_mesh(selected.name,{matrix:[].concat($jscomp.arrayFromIterable(selected.mesh.matrix))})}function mousemove(a){selected.mesh&&(selected.mesh.matrix=moveto(selected.mesh.matrix,[a.offsetX,a.offsetY,0]))}
function pointInPolygon(a,b,c){if(3>b)return console.error("Error pointInPolygon: Supplied n is not enough."),!1;var d=c[0];c=c[1];for(var e=0,f=b-1;e<b;f=e++){var g=a[3*e],h=a[3*e+1],k=a[3*f];f=a[3*f+1];if(h>c!=f>c&&d<(k-g)*(c-h)/(f-h)+g)return!0}return!1}function screenToEditor(a,b){return[a-canvas.width/2,b-canvas.height/2]}function editorToScreen(a,b){return[a+canvas.width/2,b+canvas.height/2]};var gl,width,height,m_mesh,m_shader,m_renderer,selected={name:"none",id:null,mesh:null};function start(){console.log("start");setInterval(function(){m_renderer.draw()},25)};$(document).ready(function(){var a=document.getElementById("canvas");console.log("Canvas size: "+a.clientWidth+" "+a.clientHeight);width=a.clientWidth;height=a.clientHeight;(gl=a.getContext("webgl"))?(m_mesh=new MeshManager,m_shader=new Shader(vShader,fShader,["aPosition"]),m_renderer=new Renderer(m_shader,m_mesh),m_renderer.findUniform(["uColor","uProjMatrix","uMatrix"]),m_renderer.bindUniform("MAT4","uProjMatrix",m_renderer.projection),$("#shapes").draggable({handle:"h3",containment:"#container"}),
$("#tools").draggable({handle:"h3",containment:"#container"}),$("li.line").click(function(b){select_mesh(b.currentTarget)}),$("li.triangle").click(function(b){select_mesh(b.currentTarget)}),$("li.rectangle").click(function(b){select_mesh(b.currentTarget)}),$("li.circle").click(function(b){select_mesh(b.currentTarget)}),$("li.curve").click(function(b){select_mesh(b.currentTarget)}),$("li.polyline").click(function(b){select_mesh(b.currentTarget)}),$("li.polygon").click(function(b){select_mesh(b.currentTarget)}),
$("li.triangle").find("a").click(),a.addEventListener("mousemove",mousemove),a.addEventListener("mousedown",mousedown),a.addEventListener("mouseup",mouseup),start()):alert("Failed to get webgl context")});
