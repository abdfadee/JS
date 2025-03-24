/* Car Model */
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


/* Models */
const modelLoader = new GLTFLoader();
const car = await modelLoader.loadAsync('Assets/models/car2/scene.gltf');
const carMesh = car.scene;
carMesh.position.set(0,0,0)
carMesh.traverse(function (child) {
  if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.side = THREE.BackSide;
  }
})

scene.add( carMesh );



/* Animation */
console.log(car);
const mixer = new THREE.AnimationMixer(carMesh);

const clip = car.animations[0];
const action = mixer.clipAction(clip);
action.setLoop(THREE.LoopOnce);
action.play();
carMesh.toggle = true;
carMesh.tick = (d) => {
  mixer.update(d);

  // Get the current progress as a fraction (0 to 1)
  let progress = action.time / action.getClip().duration;

  // Stop the animation at 50% progress
  if ((progress >= 0.5 && action.timeScale > 0)) {
      action.paused = true;
      console.log("Animation stopped at 50%");
  }
}

window.addEventListener("keydown",(event) => {
  if (event.key === "s") { // Press "S" to stop at 50%
    if (action.paused) {
      action.paused = false; // Resume playback
    
    }
    action.timeScale = (carMesh.toggle) ? -1 : 1;
    if (action.time === 0 && !carMesh.toggle) {
      action.reset();
    }
    carMesh.toggle = !carMesh.toggle;

    
  }
});


/* Textures */
const textureLoader = new THREE.TextureLoader();



/* Objects */
const floorGeometry = new THREE.PlaneGeometry(10,10,360,360);

const floorAlbedo = textureLoader.load("Assets/PBR/road/Road007_1K-JPG_Color.jpg");
const floorNormal = textureLoader.load("Assets/PBR/road/Road007_1K-JPG_NormalGL.jpg");
const floorDisplacement = textureLoader.load("Assets/PBR/road/Road007_1K-JPG_Displacement.jpg");
const floorRoughness = textureLoader.load("Assets/PBR/road/Road007_1K-JPG_Roughness.jpg");
const floorAo = textureLoader.load("Assets/PBR/road/PavingStones115B_1K-JPG_AmbientOcclusion.jpg");
floorAlbedo.colorSpace = THREE.SRGBColorSpace;

const textures = [floorAlbedo,floorNormal,floorDisplacement,floorRoughness,floorAo];
textures.forEach((e) => {
  //e.wrapS = THREE.RepeatWrapping;
  //e.wrapT = THREE.RepeatWrapping; 
  //e.repeat.set(5, 5);
});

const floorMaterial = new THREE.MeshStandardMaterial({
map: floorAlbedo,
normalMap: floorNormal,
displacementMap: floorDisplacement,
displacementScale: 0.05,
roughnessMap: floorRoughness,
aoMap: floorAo
});

const floor = new THREE.Mesh(floorGeometry,floorMaterial);
floor.rotateX(MathUtils.degToRad(-90.0));
floor.receiveShadow = true;
scene.add(floor);




/* Lighting */
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(10, 10, 10);
light.castShadow = true;
light.shadow.camera.far = 20;
light.shadow.bias = -0.005;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.target.position.set(0,0,0);
scene.add(light,light.target);



/* Fog */
//scene.fog = new THREE.Fog(0xFFFFFF, 10, 20);
//scene.fog = new THREE.FogExp2(0xFFFFFF, 0.05);



function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}