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

// Instantiate new earth geometry which represents shapes
const geometry = new THREE.SphereGeometry(9, 50, 50);
const earthTexture = new THREE.TextureLoader().load("./images/earth.jpg");
const earthSurface = new THREE.TextureLoader().load(
  "https://2.bp.blogspot.com/-oeguWUXEM8o/UkbyhLmUg-I/AAAAAAAAK-E/kSm3sH_f9fk/s640/elev_bump_4k.jpg"
);
const earthSpecularMap = new THREE.TextureLoader().load(
  "./images/earthSpecularMap.png"
);
// There is also the MeshBasicMaterial which doesnt need any lighting
const material = new THREE.MeshPhongMaterial({
  map: earthTexture,
  bumpMap: earthSurface,
  specularMap: earthSpecularMap,
  specular: new THREE.Color("grey"),
});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Create spere geometry to hold the clouds
const cloudsTexture = new THREE.TextureLoader().load("./images/clouds.png");
const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(9.1, 60, 60),
  new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
);
scene.add(clouds);

// Instantiate the pointlight and set its position on the x,y and z axes
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(100, 5, 0);

const lightHelper = new THREE.PointLightHelper(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const gridHelper = new THREE.GridHelper(200, 50);

// Create the sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20, 60, 60),
  new THREE.MeshBasicMaterial({ color: 0xfdb813 })
);
sun.position.set(100, 5, 0);

scene.add(pointLight, ambientLight, lightHelper, sun);
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

// const spaceTexture = new THREE.TextureLoader().load("./images/space.jpg");
// scene.background = spaceTexture;

// Instantiate new sphere material for the moon
const moongeometry = new THREE.SphereGeometry(2, 32, 32);

const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg");
const moonSurfaceTexture = new THREE.TextureLoader().load(
  "./images/normal.jpg"
);

const moonmaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
  normalMap: moonSurfaceTexture,
});
const moon = new THREE.Mesh(moongeometry, moonmaterial);
moon.position.set(-10, 5, 10);
scene.add(moon);

// galaxy starfield
// const galaxyStarfield = new THREE.Mesh(
//   new THREE.SphereGeometry(200, 64, 64),
//   new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load("./images/galaxy_starfield.png"),
//     side: THREE.BackSide,
//   })
// );
// scene.add(galaxyStarfield);

let t = 0;
function animate() {
  t += 0.005;
  requestAnimationFrame(animate);
  earth.rotation.y += 0.005;

  clouds.rotation.x += 0.0005;
  clouds.rotation.y += 0.006;

  moon.rotation.y += 0.008;

  moon.position.x = 15 * Math.cos(t) + 0;
  moon.position.z = 15 * Math.sin(t) + 0;

  controls.update();
  renderer.render(scene, camera);
}

animate();
