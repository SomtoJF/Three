import * as THREE from "three";

const createNeptune = () => {
  const texture = new THREE.TextureLoader().load("../../images/neptune.jpg");
  const geometry = new THREE.SphereGeometry(15, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const neptune = new THREE.Mesh(geometry, material);
  neptune.receiveShadow = true;

  return neptune;
};

export default createNeptune;
