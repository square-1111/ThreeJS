var camera, renderer, scene;
var geoCube, cube, matCube, quartCube, axisCube;
var geoSphere, Sphere, matSphere, quartSphere, axisSphere;
var light, controls;

init();

animate(0);

function init(){
    //Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x131B1E);

    //Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, i, 1000);
    scene.add(camera);
    camera.position.set(0, 0, 150);

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});          //If WebGl is supported by Browser
    renderer.setSize(window.innerWidth, window.innerHeight);
    //document.appendChild(renderer.domElement);

    //WINDOW RESIZE AUTOMATICALLY

    //Control Orbit
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    //Light
    light = new THREE.PointLight(0xffffff);
    light.position.set(300,300,-300);
    light.castShadow = true;

    scene.add(light);


    //Sphere
    geoSphere = new THREE.SphereGeometry(20,15,15);
    matSphere = new THREE.MeshNormalMaterial({flatShading:true,color : 0x467E76});   //lambert material for realistic lighting
    sphere = new THREE.Mesh(geoSphere, matSphere);
    sphere.position.set(50, 0, 0);

    //axisSphere = new THREE.Vector3(50,20,0).normalize();
    //quartSphere = new THREE.Quaternion();

    scene.add(sphere);



    //Cube
    var col;
    geoCube = new THREE.CubeGeometry(30,30,30);

    matCube = new THREE.MeshNormalMaterial( {color : 0xffffff, vertexColors : THREE.FaceColors} );
    geoCube.colorsNeedUpdate = true;
    cube = new THREE.Mesh(geoCube ,matCube);
    cube.position.set(-50,0,0);

    for(var i=0;i<geoCube.faces.length;i++){
        col =i%4 == 1 || i%4 == 0 ? 0x5D8191 : 0x033b54;
        cube.geometry.faces[i].color.setHex(col);
    }

    //axisCube = new THREE.Vector3(-50,0,0).normalize();
    //quartCube = new THREE.Quaternion();    //cube.rotation = new THREE.Euler().setFromQuaternion( quaternion )

    scene.add(cube);


    document.body.appendChild(renderer.domElement);

}

function animate(i){
    //Sphere

    //revolution
    //quartSphere.setFromAxisAngle(axisSphere, 0.05);
    //sphere.position.applyQuaternion(quartSphere);

    //rotation
    //sphere.rotation.x += 0.1;
    sphere.rotation.y += 0.01;
    //sphere.rotation.z +=0.1


    //Cube:

    //Revolution
    //quartCube.setFromAxisAngle(axisCube, 0.05);
    //cube.position.applyQuaternion(quartCube);

    //rotation
    //cube.rotation.x += 0.1;
    cube.rotation.y += 0.01;
    //cube.rotation.z +=0.1

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
