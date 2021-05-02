java -jar closure-compiler/compiler.jar^
 --js src/math/Matrix.js^
 --js src/math/Vector.js^
 --js src/mesh/Mesh.js^
 --js src/mesh/Primitive.js^
 --js src/shader/basic_fshader.js^
 --js src/shader/basic_vshader.js^
 --js src/shader/Shader.js^
 --js src/manager/MeshManager.js^
 --js src/manager/RenderManager.js^
 --js src/manager/SelectionManager.js^
 --js src/manager/UndoManager.js^
 --js src/manager/UIManager.js^
 --js src/event/TransformEvent.js^
 --js src/event/UIEvent.js^
 --js src/event/MouseEvent.js^
 --js src/index.js^
 --js src/init.js^
 --js_output_file compiled/shape_editor.js^