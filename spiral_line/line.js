var renderer, camera, scene;
var material, geometry, line_mesh;

init();
animate();

function init(){
    scene = new THREE.Scene();

    renderer =  new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera =  new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 1000);

    camera.position.set(0,0,70);
    camera.lookAt(new THREE.Vector3(0,0,0));

    material = new THREE.LineBasicMaterial({linewidth : 0.5,vertexColors: THREE.VertexColors} );

    geometry =  new THREE.Geometry();

    //line_mesh = new THREE.Line(geometry, material);

    var xcor=0, ycor=0,flag=0,i=1;
    while(i!=42){
        switch(flag){
            case 0 : {ycor = i; flag =1;break;}
            case 1 : {xcor = -1*i; flag=2;break;}
            case 2 : {ycor = -1*(i+1);flag=3;break;}
            case 3 : {xcor = i+1 ;flag=0; break;}
        }
        console.log("("+xcor+","+ycor+")");
        ++i;
        geometry.vertices.push(new THREE.Vector3(xcor,ycor,0) );
        //let rand = Math.random();
        //console.log("Random "+rand);
        //material.color.setHex(rand*0xffffff);
    }

    for ( var i = 0; i < geometry.vertices.length; i+=2) {
        let rand = Math.random();
        geometry.colors[i] = new THREE.Color( rand * 0xffffff);
        geometry.colors[i+1] = geometry.colors[i];
    }

    console.log("Number of vertex = " + geometry.vertices.length);
    line_mesh = new THREE.Line(geometry, material);

    scene.add(line_mesh);

    renderer.render(scene, camera);

    document.body.appendChild(renderer.domElement);
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
