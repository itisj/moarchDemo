import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
const canvasContainer = document.querySelector('#canvasContainer')
const camera = new THREE.PerspectiveCamera( 75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('canvas')
});


renderer.setSize( canvasContainer.offsetWidth, canvasContainer.offsetHeight );
renderer.setPixelRatio(window.devicePixelRatio);
// document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 50, 50 );
const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/earthuv2.jpg')
});
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 2;


//orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 0, 20, 10 );
controls.update();


//coordinates
//villa savoye 48.9244° N, 2.0283° E
//fagus factory 51.9835° N, 9.8122° E
//fallingwater 39.9063° N, 79.4678° W
//Guggenheim Museum  40.7830° N, 73.9590° W
//Notre-Dame du Haut 47.7045° N, 6.6207° E
// const latitude = 48.9244 * Math.PI/180;
// const longitude = 2.0283 * Math.PI/180;

// const x = Math.cos(latitude) * Math.sin(longitude);
// const y = Math.sin(latitude);
// const z = Math.cos(latitude) * Math.cos(longitude);

// pin.position.x = x;
// pin.position.y = y;
// pin.position.z = z;
// pin.lookAt(0, 0, 0);

function createPoint(lat, lng) {
  const pin = new THREE.Mesh( 
    new THREE.BoxGeometry( 0.02, 0.02, 0.08 ), 
    new THREE.MeshBasicMaterial({color: 0xff0000}) 
    );

  // 23.6345° N, 102.5528° W = mexico
  const latitude = (lat / 180) * Math.PI
  const longitude = (lng / 180) * Math.PI
  const radius = 1

  const x = radius * Math.cos(latitude) * Math.sin(longitude)
  const y = radius * Math.sin(latitude)
  const z = radius * Math.cos(latitude) * Math.cos(longitude)

  pin.position.x = x
  pin.position.y = y
  pin.position.z = z
  pin.lookAt(0, 0, 0);

  scene.add( pin );

}

createPoint(48.9244, 2.0283);
createPoint(51.9835, 9.8122);
createPoint(39.9063, -79.4678);
createPoint(40.7830, -73.9590);
createPoint(47.7045, 6.6207);

sphere.rotation.y = -Math.PI/2;



//animation
const animate = function () {
  requestAnimationFrame( animate );
  // sphere.rotation.x += 0.001;
	// sphere.rotation.y += 0.001;
  renderer.render( scene, camera );
};

animate();