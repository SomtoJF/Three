import * as THREE from "three";
import neptuneTexture from "../../images/neptune.jpg";

const createNeptune = () => {
  const texture = new THREE.TextureLoader().load(neptuneTexture);
  const geometry = new THREE.SphereGeometry(15, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const neptune = new THREE.Mesh(geometry, material);
  neptune.receiveShadow = true;

  return neptune;
};

export default createNeptune;
