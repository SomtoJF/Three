import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
camera.position.setZ(30);

// Instantiate new torus geometry which represents shapes
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// There is also the MeshBasicMaterial which doesnt need any lighting
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Instantiate the pointlight and set its position on the x,y and z axes
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const lightHelper = new THREE.PointLightHelper(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(pointLight, ambientLight, lightHelper);
const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load("./images/space.jpg");
scene.background = spaceTexture;

// Instantiate new sphere material for the moon
const moongeometry = new THREE.SphereGeometry(3, 32, 32);

const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg");
const moonSurfaceTexture = new THREE.TextureLoader().load(
  "./images/normal.jpg"
);

const moonmaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
  normalMap: moonSurfaceTexture,
});
const moon = new THREE.Mesh(moongeometry, moonmaterial);
moon.position.set(-20, 10, 20);
scene.add(moon);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.y += 0.008;

  controls.update();
  renderer.render(scene, camera);
}

animate();
