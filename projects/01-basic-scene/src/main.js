import * as THREE from 'three';

// 创建3D场景对象Scene
const scene = new THREE.Scene();

//创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(50, 50, 50);

//创建一个材质对象Material
const material = new THREE.MeshBasicMaterial({
    color: 0x44aa88,
});

// 两个参数分别为几何体geometry、材质material
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0,10,0);

//. 通过.add()方法，把网格模型mesh添加到三维场景scene中
scene.add(mesh);

// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
const width = 800; //宽度
const height = 500; //高度
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(200, 200, 200);

//相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0, 0, 0); //坐标原点
// camera.lookAt(mesh.position);//指向mesh对应的位置

const renderer = new THREE.WebGLRenderer();

//设置three.js渲染区域的尺寸(像素px)
renderer.setSize(width, height);

//. 增加旋转
function animate() {
    requestAnimationFrame(animate);

    // mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera); //执行渲染操作
}

animate();

document.getElementById('webgl').appendChild(renderer.domElement);
