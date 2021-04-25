java -jar closure-compiler/compiler.jar^
 --js src/shader/basicFShader.js^
 --js src/shader/basicVShader.js^
 --js src/manager/ShaderManager.js^
 --js src/manager/MeshManager.js^
 --js src/math/Matrix.js^
 --js src/index.js^
 --js src/init.js^
 --js_output_file compiled/shape_editor.js^