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

// Instantiate new geometry which represents shapes
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// There is also the MeshBasicMaterial which doesnt need any lighting
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Instantiate the pointlight and set its position on the x,y and z axes
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const lightHelper = new THREE.PointLightHelper(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, lightHelper);
const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

// const spaceTexture = new THREE.TextureLoader().load("./images/space.jpg");
// scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
