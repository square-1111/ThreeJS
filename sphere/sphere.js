var scene, camera, renderer;
var geometry, sphere, material;

init();
animate();

function init(){
    //camera attributes-----
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000);
    camera.position.z =15;

    //scene-----
    scene = new THREE.Scene();

    //render----
    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    //geometry----
    //attributes can be radius, widthSegment, heightSegment, phiStart, phiLength,  thetaStart, thetaLength
    //here attributes are radius, widthSegment and heightsegment
    geometry = new THREE.SphereGeometry(5,16,10);

    //there are various materials. Mostly we use :
    //1) basic (unlit)
    //2) lambert
    //3) phong
    //here we are using normal material with two attributes, i.e color and wireframe
    material = new THREE.MeshNormalMaterial({color : 0xfff0, wireframe : true});

    sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    document.body.appendChild(renderer.domElement);
}

function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.z = 20*Math.sin((Date.now()%60000)/60000 * Math.PI * 2);
    sphere.rotation.y = 20*Math.cos((Date.now()%60000)/60000 * Math.PI * 2);
    renderer.render(scene,camera);
}
