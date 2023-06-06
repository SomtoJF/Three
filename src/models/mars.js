import * as THREE from "three";

const createMars = () => {
  const texture = new THREE.TextureLoader().load("../../images/mars.jpg");
  const geometry = new THREE.SphereGeometry(4.5, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    bumpMap: texture,
    map: texture,
    bumpScale: 0.1,
  });
  const mars = new THREE.Mesh(geometry, material);
  return mars;
};

export default createMars;
