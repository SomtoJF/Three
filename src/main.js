import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as POSTPROCESSING from "postprocessing";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { GUI } from "dat.gui";
import createMercury from "./models/mercury";
import createVenus from "./models/venus";
import createMars from "./models/mars";
import createJupiter from "./models/jupiter";
import createUranus from "./models/uranus";
import createNeptune from "./models/neptune";
import earthSpecular from "../images/earthSpecularMap.png";
import earthTextureMap from "../images/earth.jpg";
import saturnModel from "../models/saturn.glb?url";
import satelliteModel from "../models/39-satellite/satalite.glb?url";
import cloudstextureMap from "../images/clouds.png";
import suntextureMap from "../images/sun.jpg";
import moonTextureMap from "../images/moon.jpg";
import moonSurfaceMap from "../images/normal.jpg";

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

// PLANETS
const heavenlyBodies = [
  { name: "Mercury", x: 100, y: 5, z: 0 },
  { name: "Venus", x: 50, y: 5, z: 0 },
  { name: "Earth", x: 0, y: 0, z: 0 },
  { name: "Mars", x: -50, y: 5, z: 0 },
  { name: "Jupiter", x: -150, y: 5, z: 0 },
  { name: "Saturn", x: -250, y: 0, z: 0 },
  { name: "Uranus", x: -350, y: 0, z: 0 },
  { name: "Neptune", x: -400, y: 0, z: 0 },
];

// Instantiate new earth geometry which represents shapes
const geometry = new THREE.SphereGeometry(9, 50, 50);
const earthTexture = new THREE.TextureLoader().load(earthTextureMap);
const earthSurface = new THREE.TextureLoader().load(
  "https://2.bp.blogspot.com/-oeguWUXEM8o/UkbyhLmUg-I/AAAAAAAAK-E/kSm3sH_f9fk/s640/elev_bump_4k.jpg"
);
const earthSpecularMap = new THREE.TextureLoader().load(earthSpecular);
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

const mercury = createMercury();
mercury.position.set(100, 5, 0);

const venus = createVenus();
venus.position.set(50, 5, 0);

const mars = createMars();
mars.position.set(-50, 5, 0);

const jupiter = createJupiter();
jupiter.position.set(-150, 5, 0);

let saturn = null;
const saturnLoader = new GLTFLoader();
saturnLoader.load(
  saturnModel,
  function (gltf) {
    saturn = gltf.scene;
    saturn.position.set(-250, 0, 0);
    saturn.scale.y = 0.04;
    saturn.scale.z = 0.04;
    saturn.scale.x = 0.04;
    scene.add(saturn);

    const saturnFolder = planetSizeFolder.addFolder("Saturn");
    saturnFolder.add(saturn.scale, "x", 0, 0.1, 0.01);
    saturnFolder.add(saturn.scale, "y", 0, 0.1, 0.01);
    saturnFolder.add(saturn.scale, "z", 0, 0.1, 0.01);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const uranus = createUranus();
uranus.position.set(-350, 0, 0);

const neptune = createNeptune();
neptune.position.set(-400, 0, 0);
scene.add(earth, mercury, venus, mars, jupiter, uranus, neptune);

// Create spere geometry to hold the clouds
const cloudsTexture = new THREE.TextureLoader().load(cloudstextureMap);
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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
const gridHelper = new THREE.GridHelper(200, 50);

// Create the sun
const sunTexture = new THREE.TextureLoader().load(suntextureMap);
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(50, 60, 60),
  new THREE.MeshBasicMaterial({
    color: 0xfdb813,
    visible: true,
    lightMapIntensity: 1.3,
    map: sunTexture,
  })
);
sun.position.set(300, 5, 0);
scene.add(sun);

const godRaysEffect = new POSTPROCESSING.GodRaysEffect(camera, sun, {
  resolutionScale: 0.5,
  density: 0.6,
  decay: 0.95,
  weight: 0.9,
  samples: 100,
});

window.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key === "ArrowRight") {
    for (let i = heavenlyBodies.length - 1; i >= 0; i--) {
      const thisBody = heavenlyBodies[i];
      if (thisBody.x > controls.target.x) {
        gsap.to(camera.position, {
          x: heavenlyBodies[i].x,
          y: 5,
          duration: 3,
        });
        controls.target.set(thisBody.x, thisBody.y, thisBody.z);
        break;
      }
    }
  }

  if (e.key === "ArrowLeft") {
    for (let i = 0; i < heavenlyBodies.length; i++) {
      const thisBody = heavenlyBodies[i];
      if (thisBody.x < controls.target.x) {
        gsap.to(camera.position, {
          x: heavenlyBodies[i].x + 10,
          y: 5,
          duration: 3,
        });
        controls.target.set(thisBody.x, thisBody.y, thisBody.z);
        break;
      }
    }
  }
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
  // gridHelper,
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

const moonTexture = new THREE.TextureLoader().load(moonTextureMap);
const moonSurfaceTexture = new THREE.TextureLoader().load(moonSurfaceMap);

const moonmaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
  normalMap: moonSurfaceTexture,
});
const moon = new THREE.Mesh(moongeometry, moonmaterial);
const moonObj = new THREE.Object3D();
moonObj.position.set(0, 0, 0);
moonObj.add(moon);
moon.position.x = -15;
moon.position.y = 2;
moon.castShadow = true;
scene.add(moonObj);

// Import satellite from blender
let satellite = null;
const loader = new GLTFLoader();
loader.load(
  satelliteModel,
  function (gltf) {
    satellite = gltf.scene;
    satellite.position.set(-5, 5, 10);
    satellite.rotation.y = 180;
    satellite.scale.y = 0.1;
    satellite.scale.z = 0.1;
    satellite.scale.x = 0.1;

    scene.add(satellite);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Controls
const gui = new GUI();
gui.add(controls.target, "x", -450, 300, 50).name("Navigate");
gui.add(camera.position, "z", 0, 100, 0.1).name("Camera Z-Index");
const planetSizeFolder = gui.addFolder("Scale a Planet");
const mercuryFolder = planetSizeFolder.addFolder("Mercury");
mercuryFolder.add(mercury.scale, "x", 0, 3, 0.1);
mercuryFolder.add(mercury.scale, "y", 0, 3, 0.1);
mercuryFolder.add(mercury.scale, "z", 0, 3, 0.1);

const venusFolder = planetSizeFolder.addFolder("Venus");
venusFolder.add(venus.scale, "x", 0, 3, 0.1);
venusFolder.add(venus.scale, "y", 0, 3, 0.1);
venusFolder.add(venus.scale, "z", 0, 3, 0.1);

const earthFolder = planetSizeFolder.addFolder("Earth");
earthFolder.add(earth.scale, "x", 0, 3, 0.1);
earthFolder.add(earth.scale, "y", 0, 3, 0.1);
earthFolder.add(earth.scale, "z", 0, 3, 0.1);

const marsFolder = planetSizeFolder.addFolder("Mars");
marsFolder.add(mars.scale, "x", 0, 3, 0.1);
marsFolder.add(mars.scale, "y", 0, 3, 0.1);
marsFolder.add(mars.scale, "z", 0, 3, 0.1);

const jupiterFolder = planetSizeFolder.addFolder("Jupiter");
jupiterFolder.add(jupiter.scale, "x", 0, 3, 0.1);
jupiterFolder.add(jupiter.scale, "y", 0, 3, 0.1);
jupiterFolder.add(jupiter.scale, "z", 0, 3, 0.1);

const uranusFolder = planetSizeFolder.addFolder("Uranus");
uranusFolder.add(uranus.scale, "x", 0, 3, 0.1);
uranusFolder.add(uranus.scale, "y", 0, 3, 0.1);
uranusFolder.add(uranus.scale, "z", 0, 3, 0.1);

const neptuneFolder = planetSizeFolder.addFolder("Neptune");
neptuneFolder.add(neptune.scale, "x", 0, 3, 0.1);
neptuneFolder.add(neptune.scale, "y", 0, 3, 0.1);
neptuneFolder.add(neptune.scale, "z", 0, 3, 0.1);

const wireframeFolder = gui.addFolder("wireframe");
wireframeFolder.add(mercury.material, "wireframe").name("Mercury");
wireframeFolder.add(venus.material, "wireframe").name("Venus");
wireframeFolder.add(earth.material, "wireframe").name("Earth");
wireframeFolder.add(moon.material, "wireframe").name("Moon");
wireframeFolder.add(mars.material, "wireframe").name("Mars");
wireframeFolder.add(jupiter.material, "wireframe").name("Jupiter");
wireframeFolder.add(uranus.material, "wireframe").name("Uranus");
wireframeFolder.add(neptune.material, "wireframe").name("Neptune");

let t = 0;
function animate() {
  t += 0.005;
  composer.render(0.1);
  requestAnimationFrame(animate);
  earth.rotation.y += 0.005;
  mercury.rotation.y += 0.005;
  venus.rotation.y += 0.005;
  mars.rotation.y += 0.005;
  jupiter.rotation.y += 0.001;
  uranus.rotation.y += 0.001;
  neptune.rotation.y += 0.001;

  clouds.rotation.x += 0.0005;
  clouds.rotation.y += 0.006;

  moon.rotation.y += 0.008;
  moonObj.rotation.y += 0.008;

  satellite.position.x = 10 * Math.cos(1 * t);
  satellite.position.z = 10 * Math.sin(1 * t);
  satellite.position.y = 10 * Math.cos(1 * t);
  satellite.rotation.y += 0.0005;

  if (controls.target.x === 0 && controls.target.y === 0) {
    camera.position.x -= 0.01;
    camera.rotation.x += 0.01;
  }
  controls.update();
  renderer.render(scene, camera);
}

animate();
