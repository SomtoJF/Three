import * as THREE from "three";

const createJupiter = () => {
  const texture = new THREE.TextureLoader().load("../../images/jupiter.jpg");
  const geometry = new THREE.SphereGeometry(25, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const jupiter = new THREE.Mesh(geometry, material);
  return jupiter;
};

export default createJupiter;
