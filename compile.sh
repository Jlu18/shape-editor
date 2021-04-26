java -jar closure-compiler/compiler.jar \
 --js src/math/matrix.js \
 --js src/shader/basic_fshader.js \
 --js src/shader/basic_vshader.js \
 --js src/manager/ShaderManager.js \
 --js src/manager/MeshManager.js \
 --js src/manager/RenderManager.js \
 --js src/shape/Mesh.js \
 --js src/ui/mesh_event.js \
 --js src/index.js \
 --js src/init.js \
 --js_output_file compiled/shape_editor.js \

echo "Done"