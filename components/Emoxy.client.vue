<template>
  <Renderer
    ref="rendererC"
    antialias
    :shadow="true"
    :orbit-ctrl="{
      enableDamping: true,
      dampingFactor: 0.07,
      minDistance: 2,
      maxDistance: 3,
      enablePan: false
    }"
    resize
    alpha
  >
    <Scene ref="sceneC">
      <Camera :position="{ z: 5 }" :fov="75" :aspect="2" :near="0.1" :far="900">
        <PointLight :position="{ x: 3.321, y: 0, z: 4.74 }" :intensity="1" />
        <PointLight :position="{ x: -5.1, y: 3.35, z: 0.12 }" :intensity="1" />
        <PointLight :position="{ x: 2, y: -5.2, z: -7 }" :intensity="1" />
        <PointLight :position="{ x: 1.5, y: 7.5, z: 0 }" :intensity="0.1" />
        <PointLight
          :position="{ x: -5.5, y: -4.7, z: 0.12 }"
          :intensity="0.1"
        />
      </Camera>

      <Plane
        ref="planeC"
        :position="{ x: 0, y: 0.1, z: 1 }"
        :scale="{ x: 1.5, y: 1.5, z: 0 }"
      >
        <BasicMaterial ref="BM">
          <Texture :src="face_src" />
        </BasicMaterial>
      </Plane>
      <Plane
        :position="{ x: 0, y: 0, z: -2 }"
        :scale="{ x: 3.5, y: 3.5, z: 0 }"
      >
        <BasicMaterial>
          <Texture :src="bg" />
        </BasicMaterial>
      </Plane>
      <GltfModel
        :src="emoxy_src"
        :position="{ x: 0, y: 0, z: 0 }"
        :scale="{ x: 0.7, y: 0.7, z: 0.7 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        ref="gltfC"
        @load="onReady"
      >
      </GltfModel>
    </Scene>
    <EffectComposer>
      <RenderPass />
    </EffectComposer>
  </Renderer>
</template>

<script setup lang="ts">
import {
  BasicMaterial,
  Texture,
  Plane,
  EffectComposer,
  RenderPass,
  Camera,
  GltfModel,
  PointLight,
  Renderer,
  RendererPublicInterface,
  Scene
} from 'troisjs'
import {
  InstancedMesh,
  Object3D,
  TextureLoader,
  RepeatWrapping,
  LoopPingPong,
  Vector3,
  AnimationMixer,
  Clock,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  Mesh
} from 'three'
import { ref } from 'vue'

import pbr_materials from '~/assets/emoxy/materials.json'
import colors from '~/assets/emoxy/colors.json'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Emoxy, Activation } from '~/types/futures'

const material = ref()
const clock = new Clock()
const rendererC = ref()
const gltfC = ref()
const planeC = ref()
const BM = ref()
const emoxy_src = ref()
const face_src = ref()
const imesh = ref()
const gltfLoader = new GLTFLoader()
const sceneC = ref()
const bg = ref()

const props = defineProps<{
  activations: Array<Activation>
  emoxy: Emoxy
}>()

let r: number
let level: number
let last_emotion: number
let bst_init: Array<number>
let activations: any

activations = props.activations

let emotions_played: Set<number> = new Set()
for (let i = 0; i < activations.length; i++) {
  emotions_played.add(activations[i].type[0])
}

level = emotions_played.size
last_emotion = activations[0].type[0]

r = props.emoxy.r || 4
bst_init = props.emoxy.bst

/// DEBUG ////

// r = 0;
// level = 2;
// last_emotion = 4;
// bst_init = [100,0,70]

console.log('level: ' + level)
console.log('last emotion: ' + last_emotion)
console.log('emoxy style: ' + r)
console.log('BST: ' + bst_init)

// rendererC.value.alpha = true;

/// level and style

let style = r
let emoxy_level

level > 4 ? (emoxy_level = 4) : (emoxy_level = level)

// emoxy type selection
let i = r
const types = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
let emoxy_type = types[i]
level <= 1 ? (emoxy_type = 'X') : (emoxy_type = types[i])

/// determine emoxy src path to src prop of the GLTF Comopnent
const emoxy_src_path = '/emoxy/meshes/' + emoxy_level + emoxy_type + '.glb'
emoxy_src.value = emoxy_src_path

/// calculate relative BST value
const b = bst_init[0]
const s = bst_init[1]
const t = bst_init[2]

console.log(b, s, t)
let bst_all = b + s + t

if (bst_all <= 0) {
  bst_all = 1
  console.log(
    'Alert: The sum of BST is 0 so it was set to 1 to avoid divided by 0 Errors'
  )
}

let bst_rel = [b / bst_all, s / bst_all, t / bst_all]

/////// color selection
let m = 2
let phong_color = colors[m].hex

//calculate shortest distance between relative BST and weight of color
const closestColor = colors.reduce(
  (acc: any, color: any) => {
    const color_weight = new Vector3(
      color.weight.b,
      color.weight.s,
      color.weight.t
    )
    const distance = Math.sqrt(
      (color_weight.x - bst_rel[0]) * (color_weight.x - bst_rel[0]) +
        (color_weight.y - bst_rel[1]) * (color_weight.y - bst_rel[1]) +
        (color_weight.z - bst_rel[2]) * (color_weight.z - bst_rel[2])
    )
    return distance < acc[0] ? [distance, color.id] : acc
  },
  [9999999, 0]
)

m = closestColor[1]
phong_color = colors[m].hex

console.log('color ID: ' + phong_color)

/// PBR-Material selection
let n = 0
let selected_material = pbr_materials[n].material

//calculate shortest distance between relative BST and weight of material
const closestMaterial = pbr_materials.reduce(
  (acc: any, material: any) => {
    const material_weight = new Vector3(
      material.weight.b,
      material.weight.s,
      material.weight.t
    )
    const distance = Math.sqrt(
      (material_weight.x - bst_rel[0]) * (material_weight.x - bst_rel[0]) +
        (material_weight.y - bst_rel[1]) * (material_weight.y - bst_rel[1]) +
        (material_weight.z - bst_rel[2]) * (material_weight.z - bst_rel[2])
    )
    return distance < acc[0] ? [distance, material.id] : acc
  },
  [9999999, 0]
)

console.log('material ID: ' + closestMaterial[1])
n = closestMaterial[1] - 1 //I started the ID count of the materials at 1 instead of 0 so i have to subtract 1 here
selected_material = pbr_materials[n].material

///load textures

console.log(selected_material)
const selected_material_src = '/emoxy/materials/' + selected_material + '/'

let repeat = 3

let basecolor = new TextureLoader().load(
  selected_material_src + selected_material + '_basecolor.jpg'
)
basecolor.wrapS = basecolor.wrapT = RepeatWrapping
basecolor.repeat.set(repeat, repeat)
let normal = new TextureLoader().load(
  selected_material_src + selected_material + '_normal.jpg'
)
normal.wrapS = normal.wrapT = RepeatWrapping
normal.repeat.set(repeat, repeat)
let roughness = new TextureLoader().load(
  selected_material_src + selected_material + '_roughness.jpg'
)
roughness.wrapS = roughness.wrapT = RepeatWrapping
roughness.repeat.set(repeat, repeat)
let metallic = new TextureLoader().load(
  selected_material_src + selected_material + '_metallic.jpg'
)
metallic.wrapS = metallic.wrapT = RepeatWrapping
metallic.repeat.set(repeat, repeat)
let ambientOcclusion = new TextureLoader().load(
  selected_material_src + selected_material + '_ambientOcclusion.jpg'
)
ambientOcclusion.wrapS = ambientOcclusion.wrapT = RepeatWrapping
ambientOcclusion.repeat.set(repeat, repeat)
let opacity = new TextureLoader().load(
  selected_material_src + selected_material + '_opacity.jpg'
)
opacity.wrapS = opacity.wrapT = RepeatWrapping
opacity.repeat.set(repeat, repeat)

material.value = selected_material_src

const easeOutCubic = function (t: number) {
  return --t * t * t + 1
}
const scaleCurve = function (t: number) {
  return Math.abs(easeOutCubic((t > 0.5 ? 1 - t : t) * 2))
}

///  Load BG
bg.value = '/emoxy/textures/water.png'
///// determine Shaders, Animation once GltF has loaded
/////// READY //////
function onReady(gltf: any) {
  console.log('Scene: ' + Scene)

  const renderer = rendererC.value as RendererPublicInterface
  console.log(renderer)

  const mesh = gltf.scene.children[0]

  // face selection

  const finetuningSpeed = [
    0.0025, 0.0022, 0.0052, 0.0025, 0.0015, 0.0035, 0.0045, 0.0045
  ]

  renderer.onBeforeRender(() => {
    let face_f
    const time = Date.now() * finetuningSpeed[last_emotion]
    let io = Math.cos(time)
    io > 0 ? (face_f = 'A') : (face_f = 'B')
    const selected_face = last_emotion + face_f
    face_src.value = '/emoxy/faces/' + selected_face + '.png'
  })

  /// make plane transparent
  const plane = planeC.value.mesh
  plane.material.transparent = true

  ///// Materials

  //// PBR //////

  if (level > 4) {
    console.log('Selceted Material' + selected_material)

    // mesh.material = new MeshPhongMaterial({
    // color: phong_color,
    // emissive: 0x000000,
    // specular: 0x111111,
    // shininess: 70.9,

    // check if has opacity map and set transparent true if defined
    opacity.image == undefined
      ? (mesh.material.transparent = false)
      : (mesh.material.transparent = true)

    mesh.material = new MeshPhysicalMaterial({
      map: basecolor,
      aoMap: ambientOcclusion,
      metalnessMap: metallic,
      roughnessMap: roughness,
      normalMap: normal
      // alphaMap: opacity,
      // envMap: hdr,
    })
  }

  /// Phong /////
  else {
    console.log('selcted color: ' + phong_color)

    mesh.material = new MeshPhongMaterial({
      color: phong_color,
      emissive: 0x000000,
      specular: 0x111111,
      shininess: 70.9

      // // envMap: hdr,
    })
  }

  ////  SCATTER ///

  if (level >= 6) {
    let scatter_amount = bst_all
    scatter_amount > 700
      ? (scatter_amount = 700)
      : (scatter_amount = scatter_amount)

    const scatter_material = new MeshPhysicalMaterial({
      color: phong_color,
      opacity: 0.8,
      // emissive: 0x000000,
      metalness: 0.42,
      reflectivity: 0.8,
      roughness: 0.5,
      transparent: true
    })

    const surface_mesh = mesh.clone()
    console.log(surface_mesh)

    // const cube_geo= new SphereGeometry (1, 32, 16);
    // const cube_mesh= new Mesh(cube_geo, scatter_material)

    gltfLoader.load('/emoxy/meshes/stone1.glb', function (gltf) {
      console.log('GLTF: Type ' + r)
      const finetune_scale = [0.7, 0.7, 1.4, 1.2, 0.7, 1.4, 2, 0.7, 0.7]
      const test_mesh = gltf.scene.children[0]
      const scale = 100
      resample(
        surface_mesh,
        test_mesh,
        scatter_material,
        scatter_amount,
        finetune_scale[r],
        r
      )
    })
  }

  // Handling Animation for  Emoxy Level 1

  if (level == 1) {
    gltfC.value.position.y = 0.45
    gltfC.value.position.x = -0.1
    gltfC.value.rotation.x = 0.95
    gltfC.value.rotation.y = 1.3
    gltfC.value.rotation.z = 3

    let morphMesh = gltf.scene.getObjectByName('blob1001')

    // Set-up Material

    console.log(morphMesh.material)

    morphMesh.material = new MeshPhongMaterial({
      color: phong_color,
      emissive: 0x000000,
      specular: 0x111111,
      shininess: 70.9
    })

    console.log(morphMesh)

    // Set-up Animation

    const clip = gltf.animations[0]
    console.log(clip)

    let mixer = new AnimationMixer(morphMesh)

    let morphAction = mixer.clipAction(clip)

    morphAction.setLoop(LoopPingPong, Infinity)
    morphAction.play()

    renderer.onBeforeRender(() => {
      if (mixer) mixer.update(clock.getDelta() * 2.3)
    })
  }

  renderer.onBeforeRender(() => {})
}

function resample(
  surfaceMesh: Mesh,
  scatterMesh: any,
  Material: any,
  count: number,
  scale: number,
  type: number
) {
  const finetune_y = [0.1, -0.1, 0, 0, 0.1, 0, 0.05, 0, 0.4]
  const finetune_z = [0, 0, 0, 0.3, 0, 0, 0, 0, 0]

  console.log('finetune_y ' + finetune_y[type])
  const scatter_scale = scale

  const scatter_geo = scatterMesh.geometry.clone()
  const surface = surfaceMesh

  scatter_geo.rotateX(90)
  scatter_geo.translate(0, -0.2, -0.5)
  scatter_geo.scale(scatter_scale, scatter_scale, scatter_scale)

  const scatter = new InstancedMesh(scatter_geo, Material, count)

  console.log('resampling')

  const dummy = new Object3D()

  const ages = new Float32Array(count)
  const scales = new Float32Array(count)
  const _position = new Vector3()
  const _normal = new Vector3()

  const easeOutCubic = function (t: number) {
    return --t * t * t + 1
  }

  const scaleCurve = function (t: number) {
    return Math.abs(easeOutCubic((t > 0.5 ? 1 - t : t) * 2))
  }

  const vertexCount = surface.geometry.getAttribute('position').count

  const _scale = new Vector3()

  console.info(
    'Sampling ' +
      count +
      ' points from a surface with ' +
      vertexCount +
      ' vertices...'
  )
  console.time('.build()')
  const sampler = new MeshSurfaceSampler(surface).build()
  console.timeEnd('.build()')
  console.time('.sample()')

  for (let i = 0; i < count; i++) {
    ages[i] = Math.random()
    scales[i] = scaleCurve(ages[i])

    sampler.sample(_position, _normal)
    _normal.add(_position)

    dummy.position.copy(_position)
    dummy.scale.set(scales[i], scales[i], scales[i])
    dummy.lookAt(_normal)

    dummy.updateMatrix()

    scatter.setMatrixAt(i, dummy.matrix)
    scatter.scale.x = surfaceMesh.scale.x * gltfC.value.scale.x
    scatter.scale.y = surfaceMesh.scale.y * gltfC.value.scale.y
    scatter.scale.z = surfaceMesh.scale.z * gltfC.value.scale.z
    scatter.rotation.x = surfaceMesh.rotation.x
    scatter.rotation.y = surfaceMesh.rotation.y
    scatter.rotation.z = surfaceMesh.rotation.z
    scatter.position.x = surfaceMesh.position.x
    scatter.position.y = surfaceMesh.position.y + finetune_y[r]
    scatter.position.z = surfaceMesh.position.z + finetune_z[r]
    scatter.quaternion.x = surfaceMesh.quaternion.x
    scatter.quaternion.y = surfaceMesh.quaternion.y
    scatter.quaternion.z = surfaceMesh.quaternion.z
  }

  console.timeEnd('.sample()')

  sceneC.value.scene.add(scatter)
}
</script>
