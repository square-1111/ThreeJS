//scene will create an instance of threeJS's Scene
var scene = new THREE.Scene();

/*camera is an instance of Perspective Camera
  Arguments:
  Field of View
  Aspect ratio
  near and far
 */

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);

//renderer is instance of renderer function. renderer funtion renders the scene.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

//document.body returns body element of current document
document.body.appendChild( renderer.domElement);

//=====now we implement a object=====

//Geometry-------
//BoxGeometry contains all points(vertices) and fill(faces) of cube. {incomplete information}
var geometry = new THREE.BoxGeometry(5,5,5);


//Material------
//MeshBasicMaterial is basic material. Material take various properties which will be applied to it.
var material = new THREE.MeshBasicMaterial( {color : Math.random() * 0x0ffffff , linewidth: 4 } );

//Fusing material and geometry
//Mesh is an object that takes geometry and apply Material to it
var cube = new THREE.Mesh(geometry, material);

scene.add( cube );

//since camera is placed at origin and our scene.add( cube ) would also add cube to origin
//thus we will shift camera

var ran =parseInt( Math.random()*991001);
console.log(ran);
camera.position.z = ran %10 +32;
console.log(camera.position.z, ran);
//till now we cannot see anything as we have not yet rendered anything

//this function will render.

var animate = function(i){
    //this will create a loop that causes the renderer to draw the object.
    cube.material.color.setHex( Math.random()* 0x0ffffff );
    cube.position.x = 20*Math.sin((Date.now()%60000)/60000 * Math.PI * 2);
    cube.position.y = 20*Math.cos((Date.now()%60000)/60000 * Math.PI * 2);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate(0);
