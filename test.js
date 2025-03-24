import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as MathUtils from 'three/src/math/MathUtils';


import { mat4, vec3 } from 'gl-matrix';
import {AABB} from './lib/physics/colliders/AABB.js';
import { BoundingSphere } from './lib/physics/colliders/BoundingSphere.js';
import { PhysicsObject } from './lib/physics/core/PhysicsObject.js';
import { PhysicsEngine } from './lib/physics/core/PhysicsEngine.js';



const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/* Configuration */
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;




/* Camera */
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.set(0,7,5);
//camera.up.set(0,0,1);
camera.lookAt(0,3,0);



/* Controls */
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();



let s = new THREE.Mesh(new THREE.SphereGeometry(1),new THREE.MeshBasicMaterial());
scene.add(s);


/* Physics */
let engine = new PhysicsEngine();
engine.addObject(new PhysicsObject(s,new THREE.Vector3(0.2,0,0)));


const clock = new THREE.Clock();

/* Render Loop */
function animate( time ) {
  const delta = clock.getDelta();
  
  engine.simulate(delta);

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );