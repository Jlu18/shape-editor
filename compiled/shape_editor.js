var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};
$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var f=a[d];if(!(f in c))return;c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,d){var f=a.split(".");a=1===f.length;d=f[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var g=0;g<f.length-1;g++){var h=f[g];if(!(h in d))return;d=d[h]}f=f[f.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[f]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,f,{configurable:!0,writable:!0,value:b}):b!==c&&(void 0===$jscomp.propertyToPolyfillSymbol[f]&&($jscomp.propertyToPolyfillSymbol[f]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(f):
$jscomp.POLYFILL_PREFIX+f),$jscomp.defineProperty(d,$jscomp.propertyToPolyfillSymbol[f],{configurable:!0,writable:!0,value:b})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(f,g){this.$jscomp$symbol$id_=f;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:g})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var c=0,d=function(f){if(this instanceof d)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(f||"")+"_"+c++,f)};return d},"es6","es3");
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=$jscomp.global[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&$jscomp.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var c=0,d=!1,f={next:function(){if(!d&&c<a.length){var g=c++;return{value:b(g,a[g]),done:!1}}d=!0;return{done:!0,value:void 0}}};f[Symbol.iterator]=function(){return f};return f};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(b){return b})}},"es6","es3");
function projection(a,b,c){return translate([2/a,0,0,0,0,-2/b,0,0,0,0,2/(void 0===c?400:c),0,-1,1,0,1],[a/2,b/2,0])}function identity(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function translate(a,b){return multiply(a,[1,0,0,0,0,1,0,0,0,0,1,0,b[0],b[1],b[2],1])}
function multiply(a,b){var c=a[0],d=a[1],f=a[2],g=a[3],h=a[4],k=a[5],l=a[6],m=a[7],n=a[8],p=a[9],q=a[10],r=a[11],t=a[12],u=a[13],v=a[14];a=a[15];var w=b[0],x=b[1],y=b[2],z=b[3],A=b[4],B=b[5],C=b[6],D=b[7],E=b[8],F=b[9],G=b[10],H=b[11],I=b[12],J=b[13],K=b[14];b=b[15];return[w*c+x*h+y*n+z*t,w*d+x*k+y*p+z*u,w*f+x*l+y*q+z*v,w*g+x*m+y*r+z*a,A*c+B*h+C*n+D*t,A*d+B*k+C*p+D*u,A*f+B*l+C*q+D*v,A*g+B*m+C*r+D*a,E*c+F*h+G*n+H*t,E*d+F*k+G*p+H*u,E*f+F*l+G*q+H*v,E*g+F*m+G*r+H*a,I*c+J*h+K*n+b*t,I*d+J*k+K*p+b*u,I*f+
J*l+K*q+b*v,I*g+J*m+K*r+b*a]}function multiplyM(a,b,c,d){for(var f=[],g=0;g<b;g++)for(var h=0;h<d;h++)f.push(a[g*b]*c[h]+a[g*b+1]*c[h+d]+a[g*b+2]*c[h+2*d]+a[g*b+3]*c[h+3*d]);return f};var fShader="\nprecision mediump float;\nvarying vec4 vColor;\nvoid main(){\n    gl_FragColor = vColor;\n}";var vShader="\nattribute vec4 aPosition;\nuniform vec4 uColor;\nuniform mat4 uProjMatrix;\nuniform mat4 uMatrix;\nvarying vec4 vColor;\nvoid main(){\n    gl_Position = uProjMatrix * uMatrix * aPosition;\n    vColor = uColor;\n}";var Shader=function(a,b,c){a=this.createShader(gl.VERTEX_SHADER,a);b=this.createShader(gl.FRAGMENT_SHADER,b);if(!a||!b)return null;var d=gl.createProgram();gl.attachShader(d,a);gl.attachShader(d,b);c.forEach(function(f,g){gl.bindAttribLocation(d,g,f)});gl.linkProgram(d);this.program=d};
Shader.prototype.createShader=function(a,b){var c=gl.createShader(a);gl.shaderSource(c,b);gl.compileShader(c);return gl.getShaderParameter(c,gl.COMPILE_STATUS)?c:(b=gl.getShaderInfoLog(c),console.error("Shader createShader() Error: Failed to compile "+a+". "+b),gl.deleteShader(c),null)};Shader.prototype.bindAttrib=function(a,b,c,d){gl.bindBuffer(gl.ARRAY_BUFFER,a);gl.enableVertexAttribArray(b);gl.vertexAttribPointer(b,c,d,!1,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,null)};var MeshManager=function(){this.list={};this.count=0};MeshManager.prototype.add=function(a){a instanceof Mesh?(a.uid=a.type+String(this.count),++this.count,this.list[a.uid]=a):console.error("MeshManager add() Error: "+Object.prototype.toString(e)+"is not Mesh")};MeshManager.prototype.delete=function(a){if(!this.list[a])return console.error("MeshManager remove() Error: "+a+" doesn't exist in list"),null;gl.deleteBuffer(this.list[a].vid);delete this.list[a]};
MeshManager.prototype.get=function(a){return this.list[a]?this.list[a]:(console.warn("MeshManager get() Warn: "+a+"Not found"),null)};MeshManager.prototype.getMeshNames=function(){return Object.keys(this.list)};MeshManager.prototype.reset=function(){for(var a in this.list)this.delete(a)};var uniformType=Object.freeze({INT:0,FLOAT:1,VEC2:2,VEC3:3,VEC4:4,MAT3:5,MAT4:6}),Renderer=function(){this.uniform={};gl.useProgram(m_shader.program);this.projection=projection(width,height)};
Renderer.prototype.draw=function(){var a=this;gl.viewport(0,0,width,height);gl.clearColor(.2,.2,.2,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);m_mesh.getMeshNames().forEach(function(b){b=m_mesh.get(b);m_shader.bindAttrib(b.vid,0,3,gl.FLOAT);a.bindUniform("MAT4","uMatrix",b.matrix);a.bindUniform("VEC4","uColor",b.color);gl.drawArrays(gl.TRIANGLES,0,b.len);b.m=!1})};
Renderer.prototype.findUniform=function(a){var b=this;a.forEach(function(c){b.uniform[c]=gl.getUniformLocation(m_shader.program,c)})};
Renderer.prototype.bindUniform=function(a,b,c){var d=this.uniform[b];if(d)switch(uniformType[a]){case uniformType.INT:case uniformType.FLOAT:case uniformType.VEC2:case uniformType.VEC3:break;case uniformType.VEC4:gl.uniform4fv(d,new Float32Array(c));break;case uniformType.MAT3:break;case uniformType.MAT4:gl.uniformMatrix4fv(d,!1,c);break;default:console.error("bindUniform() Error: Unkown type: "+a)}else console.error("bindUniform() Error: unkown uniform name "+b)};var Mesh=function(a,b,c){Array.isArray(b)?(this.type=a,this.vid=gl.createBuffer(),gl.bindBuffer(gl.ARRAY_BUFFER,this.vid),gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(b),gl.STATIC_DRAW),gl.bindBuffer(gl.ARRAY_BUFFER,null),this.pts=b,this.len=c,this.color=[1,0,0,1],this.matrix=identity()):console.error("Mesh Error: Supplied vertex or index buffer is not array.")};
function triangle(a,b,c){a=void 0===a?[-12,13.48,0]:a;b=void 0===b?[12,13.48,0]:b;c=void 0===c?[0,-13.48,0]:c;return new Mesh("triangle",[].concat($jscomp.arrayFromIterable(a),$jscomp.arrayFromIterable(b),$jscomp.arrayFromIterable(c)),3)};function create_shape(a){switch(a){case "line":break;case "triangle":m_mesh.add(triangle());break;case "rectangle":break;case "circle":break;case "curve":break;case "polyline":break;case "polygon":break;default:console.warn("create_shape() Warn: Unknown shape name "+a);return}console.log(m_mesh.getMeshNames())};var gl,width,height,m_mesh,m_shader,m_renderer;function start(){console.log("start");setInterval(function(){m_renderer.draw()},25)};$(document).ready(function(){var a=document.getElementById("canvas");console.log("Canvas size: "+a.clientWidth+" "+a.clientHeight);width=a.clientWidth;height=a.clientHeight;(gl=a.getContext("webgl"))?($("#shapes").draggable({handle:"h3",containment:"#container"}),$("#tools").draggable({handle:"h3",containment:"#container"}),$("li.line").click(function(){create_shape("line")}),$("li.triangle").click(function(){create_shape("triangle")}),$("li.rectangle").click(function(){create_shape("rectangle")}),
$("li.circle").click(function(){create_shape("circle")}),$("li.curve").click(function(){create_shape("curve")}),$("li.polyline").click(function(){create_shape("polyline")}),$("li.polygon").click(function(){create_shape("polygon")}),m_mesh=new MeshManager,m_shader=new Shader(vShader,fShader,["aPosition"]),m_renderer=new Renderer(m_shader,m_mesh),m_renderer.findUniform(["uColor","uProjMatrix","uMatrix"]),m_renderer.bindUniform("MAT4","uProjMatrix",m_renderer.projection),start()):alert("Failed to get webgl context")});
