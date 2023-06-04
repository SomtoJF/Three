import * as THREE from "three";

const createVenus = () => {
  const texture = new THREE.TextureLoader().load("../../images/venus.jpg");
  const atmosphereTexture = new THREE.TextureLoader().load(
    "../../images/venus_atmosphere.jpg"
  );
  const geometry = new THREE.SphereGeometry(2.5, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    bumpMap: texture,
    map: atmosphereTexture,
    bumpScale: 0.1,
  });
  const venus = new THREE.Mesh(geometry, material);
  return venus;
};

export default createVenus;
