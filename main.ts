import * as THREE from "three";
import * as CANNON from "cannon-es";

import {renderer,scene,camera} from "./lib/render/init";
import {world} from "./lib/physics/init";






const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshBasicMaterial()
);
scene.add(cube);


function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );