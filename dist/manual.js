// Three.js Code
      /*
        Resources:
        https://threejs.org/docs/
        https://www.youtube.com/watch?v=cghSq_dlgYU&t=233s
      */

// Imports CD section from HTML
const section = document.querySelector("section.cd")
// const loader = document.getElementById('front');


// Instantiate the scene
const scene = new THREE.Scene();


// Set camera FOV
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );


// This light globally illuminates all objects in the scene equally.
const ambient = new THREE.AmbientLight(0x222222)
scene.add(ambient)


// This light can cast shadows
const light = new THREE.DirectionalLight( 0xffffff);
light.position.set(0,0,6)
scene.add(light);


// Instantiate an image texture loader
const loader = new THREE.TextureLoader()

// Image map list for CD Case
const urls = [
  "sides.png","crease.png",
  "sides.png","sides.png",
  "front.png","back.png"
]

const materials = urls.map(url => {
  return new THREE.MeshLambertMaterial({
    map: loader.load(url)
  })
})


// Renders the CD Case geometry
const geometry = new THREE.BoxGeometry(3.5,5,0.5);

const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

// Set how far/close away from scene
camera.position.z = 6;

let currentTimeline = pageYOffset / 3000;
let aimTimeline = pageYOffset / 3000;


// Animation Loop
function animate() {
	requestAnimationFrame( animate );

  currentTimeline += (aimTimeline - currentTimeline) * 0.10

  const rx = currentTimeline * -0.5 + 0.5
  const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2
  
  cube.rotation.set(rx, ry,0 )



	renderer.render( scene, camera );
}
animate();

window.addEventListener ("scroll", function() {
  aimTimeline = pageYOffset / 3000;
})