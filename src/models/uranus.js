import * as THREE from "three";
import uranusTexture from "../../images/uranus.jpg";

const createUranus = () => {
  const texture = new THREE.TextureLoader().load(uranusTexture);
  const geometry = new THREE.SphereGeometry(18, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const uranus = new THREE.Mesh(geometry, material);
  uranus.castShadow = true;
  return uranus;
};

export default createUranus;
