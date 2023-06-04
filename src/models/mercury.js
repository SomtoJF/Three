import * as THREE from "three";

const createMercury = () => {
  const texture = new THREE.TextureLoader().load("../../images/mercury.jpg");
  const geometry = new THREE.SphereGeometry(2, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const mercury = new THREE.Mesh(geometry, material);
  return mercury;
};

export default createMercury;
