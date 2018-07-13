var renderer, camera, scene, controls;
var geometry, vertex, material = [], particles;
var parameters = [];


var width = window.innerWidth;
var height = window.innerHeight;

init();
animate();

function init(){
    //Scene
    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xffffff);

    //camera
    camera = new THREE.PerspectiveCamera(0.75, width/height, 0.1, 1000 );
    camera.position.set(0,0,500);
    scene.add(camera);

    //Renderer
    if(Detector.webgl){
        renderer = new THREE.WebGLRenderer({antialias:true});
    }
    else{
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);


    //stats
    stats = new Stats();
    stats.showPanel(1);
    document.body.appendChild(stats.dom);

    //light
    scene.add(new THREE.AmbientLight(0xc2f2ff));

    //adding points
    geometry = new THREE.Geometry();

    var numParticles = 200000;

    for(var i=0;i<numParticles;i++){
        vertex = new THREE.Vector3();
        vertex.x = THREE.Math.randFloatSpread( 200 );
        vertex.y = THREE.Math.randFloatSpread( 200 );
        vertex.z = THREE.Math.randFloatSpread( 2000 );
        geometry.vertices.push(vertex);
    }

    //color as HSL
    parameters = [
        [
            [1,1,0.5], 5
        ],
        [
            [0.95,1,0.5], 4
        ],
        [
            [0.90,1,0.5], 3
        ],
        [
            [0.85,1,0.5], 2
        ],
        [
            [0.80,1,0.5], 1
        ],
    ];

    for(var i=0;i<parameters.length;i++){
        var size = parameters[i][1];
        var color = parameters[i][0];
        material[i] = new THREE.PointsMaterial({size:size});
        material[i].color = new THREE.Color(color[0], color[1], color[2]);
        particles = new THREE.Points(geometry, material[i]);
        particles.rotation.x = Math.random()*50;
        particles.rotation.y = Math.random()*50;
        particles.rotation.z = Math.random()*50;
        console.log(typeof(particles.material), particles,material.length);
        scene.add(particles);
    }

    //events
    //orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElements);
    //Window Resizing
    window.addEventListener('resize', onWindowResize,false);
    //mouse movement
    document.addEventListener('mousemove',onMouseMove,false);
}


function onMouseMove(event){
    camera.position.x = (event.clientX - window.innerWidth/2)*0.1;
    camera.position.y = (event.clientY - window.innerHeight/2)*0.1;
    camera.lookAt(scene.position);
}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
}


function render(){
    var time = Date.now()*0.00007;

    for(var i =0;i<scene.children.length;i++){
        var object = scene.children[i];
        if(object instanceof THREE.Points){
            object.rotation.y = Date.now()*0.00007*i/10%window.innerHeight;
            object.rotation.x = (time*(i>10?-i:i)/20)%window.innerWidth;
        }
    }
    for(var i=0;i<material.length;i++){
        color = parameters[i][0];
        var hue = (200*(color[0]+time)%200)/200;
        material[i].color.setHSL(hue, color[1], color[2]);
    }
    renderer.render(scene,camera);

}

function animate(){
    requestAnimationFrame(animate);
    render();
    controls.update();
    stats.update();
}
