import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 6, 6 );
orbit.update();


const ambientLight = new THREE.AmbientLight( 0x333333 );
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight( 0XFFFFFF, 0.8 );
scene.add( directionalLight );
directionalLight.position.set( 0, 50, 0 );

const helper = new THREE.AxesHelper( 22 );
scene.add(helper);


const mouse = new THREE.Vector2();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const raycaster = new THREE.Raycaster();



window.addEventListener( 'click', function (e) {
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	planeNormal.copy( camera.position ).normalize();
	plane.setFromNormalAndCoplanarPoint( planeNormal, scene.position );
	raycaster.setFromCamera( mouse, camera );
	raycaster.ray.intersectPlane( plane, intersectionPoint );
	const sphereGeo = new THREE.SphereGeometry( 0.125, 30, 30 );
	const sphereMat = new THREE.MeshStandardMaterial( {
		color : 0xFFEA00,
		metalness :0,
		roughness : 0
	} );
	const sphereMesh = new THREE.Mesh( sphereGeo, sphereMat );
	scene.add( sphereMesh );
	sphereMesh.position.copy( intersectionPoint );
} );

function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

animate();
// window resize 
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});