import * as THREE from "three";
import jupitertexture from "../../images/jupiter.jpg";

const createJupiter = () => {
  const texture = new THREE.TextureLoader().load(jupitertexture);
  const geometry = new THREE.SphereGeometry(25, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const jupiter = new THREE.Mesh(geometry, material);
  return jupiter;
};

export default createJupiter;
