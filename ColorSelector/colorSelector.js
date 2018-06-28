var geometry, material, sphere, parameters;
var camera, scene, renderer;
var gui, controls, stats, container;
var light1, light2, light3;

var keyboard =  new THREEx.KeyboardState();
var clock =  new THREE.Clock();

init();
animate();

function init(){
    //Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xD3E8FF);

    //Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(100,100,100);
    camera.lookAt(scene.position);
    scene.add(camera);

    //Renderer
    if( Detector.webgl)
        renderer = new THREE.WebGLRenderer( { antialias:true } );
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    //Events
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({charCode : "a".charCodeAt(0) });

    //Controls
    controls = new THREE.OrbitControls(camera, renderer.domElements);

    //Stats
    stats = new Stats();
    stats.showPanel(1);         //0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );

    //Light
    light1 = new THREE.PointLight(0xffffff,2.0);
    light1.position.set(-100,0,0);
    scene.add(light1);

    light2 = new THREE.PointLight(0xffffff, 2.0);
    light2.position.set(100,0,0);
    scene.add(light2);

    light3 = new THREE.AmbientLight(0xffffff, 2.0);
    light3.position.set(light1.position);
    scene.add(light3);

    //Fog
    scene.fog = new THREE.Fog(0x5ca186);

    //Sphere
    geometry = new THREE.SphereGeometry(50, 50, 50);
    material = new THREE.MeshPhongMaterial({color : 0x3b472b, flatShading : true});
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    //axes
    scene.add(new THREE.AxesHelper(5));

    //Manually contrlling color and light
    gui = new dat.GUI();

    parameters =
    {
        x: 0,y: 0,z: 0,
        color: "#3b472b", //will replace '#' with '0x'
        color1: "#000000",
        color2: "#ffffff",
        shininess: 40,
        material: "Phong",
        flatShading: true,
        reset : function(){resetSphere();}
    };

    var folder = gui.addFolder('Position');
    var sphereX = folder.add(parameters, 'x').min(-100).max(100).step(1).listen();
    var sphereY = folder.add(parameters, 'y').min(-50).max(50).step(1).listen();
    var sphereZ = folder.add(parameters, 'z').min(-100).max(100).step(1).listen();
    folder.open();

    //changing position of sphere manually
    sphereX.onChange(function(value){
        sphere.position.x = value;
    })

    sphereY.onChange(function(value){
        sphere.position.y = value;
    })

    sphereZ.onChange(function(value){
        sphere.position.y = value;
    })

    //assigining parameters
    var sphereColor = gui.addColor( parameters, 'color').name('Color(Material)').listen();
    sphereColor.onChange(function(value){
        sphere.material.color.setHex(value.replace("#","0x"));
    })

    var light1Color = gui.addColor( parameters, 'color1').name('Color(Light1)').listen();
    light1Color.onChange(function(value){
        light1.color.setHex(value.replace("#","0x"));
    })

    var light2Color = gui.addColor( parameters, 'color2').name('Color(Light2)').listen();
    light2Color.onChange(function(value){
        light2.color.setHex(value.replace("#","0x"));
    })

    var sphereShininess = gui.add( parameters, 'shininess').name('Shininess').max(50).min(1).step(1).listen();
    sphereShininess.onChange(function(value){
        sphere.shininess = value;
    })

    var sphereMaterial = gui.add( parameters, 'material', [ "Basic", "Lambert", "Phong", "Wireframe" ] ).name('Material').listen();
    sphereMaterial.onChange(function(value){
        updateSphere();
    })

    gui.add(parameters, 'reset').name('Reset');

    gui.open();
    updateSphere();
}

function updateSphere(){
    var value = parameters.material;
    var newMat;
    switch(value){
        case "Basic" : {
            newMat = new THREE.MeshBasicMaterial({color:0x3b472b});
            break;
        }
        case "Lambert" : {
            newMat = new THREE.MeshLambertMaterial({color:0x3b472b});
            break;
        }
        case "Phong" : {
            newMat = new THREE.MeshPhongMaterial({color:0x3b472b});
            break;
        }
        case "Wireframe" : {
            newMat = new THREE.MeshBasicMaterial({color:0x3b472b, wireframe:true});
            break;
        }
    }
    sphere.material = newMat;
    if(sphere.material.shininess){
        sphere.material.shininess = parameters.shininess;
    }
    if(sphere.material.color){
        sphere.material.color.setHex(parameters.color.replace("#","0x"));
    }
    sphere.material.flatShading = true;
}

function resetSphere(){
    parameters.x = 0;
    parameters.y = 0;
    parameters.z = 0;
    parameters.color = "#3b472b";
    parameters.color1 = "#000000";
    parameters.color2  = "#ffffff";
    parameters.shininess = 40;
    parameters.material = "Phong";
    parameters.flatShading = true;
    updateSphere();
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    stats.update();
}
