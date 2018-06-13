var camera, scene, renderer;
var material, geometry, wire_mesh;

init();
animate();

function init(){
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(50, 50, 50, 20, 20, 20);

    material = new THREE.MeshNormalMaterial({ wireframe : true});

    wire_mesh = new THREE.Mesh(geometry, material);

    scene.add(wire_mesh);

    camera.position.z = 120;
    document.body.appendChild(renderer.domElement);
}

function animate(){
    wire_mesh.rotation.x = Math.PI/4;
    wire_mesh.rotation.y = Math.PI/4;
    wire_mesh.rotation.z += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

