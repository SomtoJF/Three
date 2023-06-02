import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as POSTPROCESSING from "postprocessing";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// instantiate Scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.setZ(50);

// Instantiate new earth geometry which represents shapes
const geometry = new THREE.SphereGeometry(9, 50, 50);
const earthTexture = new THREE.TextureLoader().load("../images/earth.jpg");
const earthSurface = new THREE.TextureLoader().load(
  "https://2.bp.blogspot.com/-oeguWUXEM8o/UkbyhLmUg-I/AAAAAAAAK-E/kSm3sH_f9fk/s640/elev_bump_4k.jpg"
);
const earthSpecularMap = new THREE.TextureLoader().load(
  "../images/earthSpecularMap.png"
);
// There is also the MeshBasicMaterial which doesnt need any lighting
const material = new THREE.MeshPhongMaterial({
  map: earthTexture,
  bumpMap: earthSurface,
  specularMap: earthSpecularMap,
  specular: new THREE.Color("grey"),
});
const earth = new THREE.Mesh(geometry, material);
earth.receiveShadow = true;
earth.castShadow = true;
scene.add(earth);

// Create spere geometry to hold the clouds
const cloudsTexture = new THREE.TextureLoader().load("../images/clouds.png");
const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(9.1, 60, 60),
  new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
);
scene.add(clouds);

// Instantiate the pointlight and set its position on the x,y and z axes
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(300, 5, 0);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
const gridHelper = new THREE.GridHelper(200, 50);

// Create the sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(50, 60, 60),
  new THREE.MeshBasicMaterial({
    color: 0xfdb813,
    visible: true,
    lightMapIntensity: 1.3,
  })
);
sun.position.set(300, 5, 0);
const godRaysEffect = new POSTPROCESSING.GodRaysEffect(camera, sun, {
  resolutionScale: 0.5,
  density: 0.6,
  decay: 0.95,
  weight: 0.9,
  samples: 100,
});

const renderPass = new POSTPROCESSING.RenderPass(scene, camera);
const effectPass = new POSTPROCESSING.EffectPass(camera, godRaysEffect);
effectPass.renderToScreen = true;
const composer = new POSTPROCESSING.EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(effectPass);

scene.add(
  directionalLight,
  directionalLight.target,
  // lightHelper,
  sun,
  ambientLight
);
const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const starGeometry = new THREE.SphereGeometry(0.2, 24, 24);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStars);

// Instantiate new sphere material for the moon
const moongeometry = new THREE.SphereGeometry(2, 32, 32);

const moonTexture = new THREE.TextureLoader().load("../images/moon.jpg");
const moonSurfaceTexture = new THREE.TextureLoader().load(
  "../images/normal.jpg"
);

const moonmaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
  normalMap: moonSurfaceTexture,
});
const moon = new THREE.Mesh(moongeometry, moonmaterial);
moon.position.set(-10, 2, 10);
moon.castShadow = true;
scene.add(moon);

// Import satellite from blender
const loader = new GLTFLoader();
loader.load(
  "../models/39-satellite/satalite.glb",
  function (gltf) {
    console.log(gltf);
    const satellite = gltf.scene;
    satellite.position.set(-5, 5, 10);
    satellite.rotation.y = 15;
    satellite.scale.x = 0.1;
    satellite.scale.y = 0.1;
    satellite.scale.z = 0.1;
    scene.add(satellite);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let t = 0;
function animate() {
  t += 0.005;
  composer.render(0.1);
  requestAnimationFrame(animate);
  earth.rotation.y += 0.005;

  clouds.rotation.x += 0.0005;
  clouds.rotation.y += 0.006;

  moon.rotation.y += 0.008;

  let r = 15; // radius
  let v = 2; // velocity

  moon.position.x = r * Math.cos(v * t);
  moon.position.z = r * Math.sin(v * t);

  camera.position.x -= 0.05;
  camera.rotation.x += 0.05;

  controls.update();
  renderer.render(scene, camera);
}

animate();
