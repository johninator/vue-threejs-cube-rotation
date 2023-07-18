import { BoxGeometry, Color, Group, Mesh, MeshBasicMaterial, Scene } from 'three';

interface NeedleTree {
  trunk: Mesh
  needles: Mesh
}

export const createScene = (): [Scene, Mesh] => {
  const scene = new Scene();
  scene.background = new Color('skyblue');
  const cube = createCube();
  scene.add(cube);
  const trees = createTrees();
  trees.forEach((tree) => scene.add(tree));
  return [scene, cube];
};

const createCube = (): Mesh => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshBasicMaterial({
    color: 'green',
    wireframe: true,
    wireframeLinewidth: 1,
  });
  return new Mesh(geometry, material);
};

const createTrees = (): Mesh[] => {
  const trees = createRandomNeedleTrees(500, 20, 50, -5);
  const trunkMeshes = trees.map((tree) => tree.trunk);
  const needlesMeshes = trees.map((tree) => tree.needles);
  return [...trunkMeshes, ...needlesMeshes];
};

const createNeedleTree = (): NeedleTree => {
  // Step 1: Create the trunk's geometry and material
  const trunkGeometry = new BoxGeometry(0.2, 1, 0.2)
  const trunkMaterial = new MeshBasicMaterial({ color: 'brown' })

  // Step 2: Create the needles' geometry and material
  const needlesGeometry = new BoxGeometry(0.6, 0.6, 0.6)
  const needlesMaterial = new MeshBasicMaterial({ color: 'green' })

  // Step 3: Create the trunk and needles meshes
  const trunk = new Mesh(trunkGeometry, trunkMaterial)
  const needles = new Mesh(needlesGeometry, needlesMaterial)

  // Step 4: Adjust the positions of trunk and needles
  trunk.position.y = 0.5 // Move the trunk up to sit on the plane
  needles.position.y = 1.2 // Move the needles above the trunk

  // Step 5: Create a group to hold both trunk and needles
  const treeGroup = new Group()
  treeGroup.add(trunk, needles)

  return {
    trunk,
    needles
  }
};

const createRandomNeedleTrees = (
    count: number,
    maxX: number,
    maxZ: number,
    shiftY?: number
  ): NeedleTree[] => {
    const trees: NeedleTree[] = [];
  
    for (let i = 0; i < count; i++) {
      const tree = createNeedleTree();
      tree.trunk.position.x = Math.random() * maxX - maxX / 2;
      tree.trunk.position.z = Math.random() * maxZ - maxZ / 2;
      tree.trunk.position.y += shiftY ?? 0;
      tree.needles.position.x = tree.trunk.position.x;
      tree.needles.position.z = tree.trunk.position.z;
      tree.needles.position.y += shiftY ?? 0;
      trees.push(tree);
    }
  
    return trees;
};
