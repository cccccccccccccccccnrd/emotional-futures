<template>
  <Renderer
    ref="rendererC"
    antialias
    :shadow="true"
    :orbit-ctrl="{
      enableDamping: true,
      dampingFactor: 0.07,
      minDistance: 2,
      maxDistance: 10,
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
        :visible="showPlane"
        :position="{ x: 0, y: 0.1, z: 1 }"
        :scale="{ x: 1.5, y: 1.5, z: 0 }"
      >
        <BasicMaterial ref="BM">
          <Texture :src="face_src" />
        </BasicMaterial>
      </Plane>

      <GltfModel
        :src="emoxy_src"
        :position="{ x: 0, y: 0, z: 0 }"
        :scale="{ x: 0.7, y: 0.7, z: 0.7 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        ref="gltfC"
        @load="onReady"
        @before-load="whileLoading"
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
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  MeshPhysicalMaterial,
  Mesh,
  MeshBasicMaterial,
  AdditiveBlending
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
const gltfLoader = new GLTFLoader()
const sceneC = ref()

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
if (activations.length == 0) {
  level = 0
  last_emotion = 1
} else {
  for (let i = 0; i < activations.length; i++) {
    emotions_played.add(activations[i].type[0])
  }

  level = emotions_played.size
  last_emotion = Number(activations[0].type[0]) - 1 /* 👿👿👿 */
}

r = props.emoxy.r
bst_init = props.emoxy.bst

let emoxy_level

level > 4 ? (emoxy_level = 4) : (emoxy_level = level)

let i = r
const types = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
let emoxy_type = types[i]
level <= 1 ? (emoxy_type = 'X') : (emoxy_type = types[i])

const emoxy_src_path = '/emoxy/meshes/' + emoxy_level + emoxy_type + '.glb'
emoxy_src.value = emoxy_src_path

const b = bst_init[0]
const s = bst_init[1]
const t = bst_init[2]

let bst_all = b + s + t

if (bst_all <= 0) {
  bst_all = 1
}

let bst_rel = [b / bst_all, s / bst_all, t / bst_all]

const closestColor = colors.reduce(
  (acc, color) => {
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

const m = closestColor[1]
const phong_color = colors[m - 1].hex

const closestMaterial = pbr_materials.reduce(
  (acc, material) => {
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

const n = closestMaterial[1] - 1
const selected_material = pbr_materials[n].material

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

const envTexture = new TextureLoader().load('/emoxy/textures/enviroment.jpg')
envTexture.mapping = EquirectangularReflectionMapping
const refractionTexture = envTexture
refractionTexture.mapping = EquirectangularRefractionMapping

material.value = selected_material_src

const showPlane: any = ref(false)

let selected_face = last_emotion + 'A'
face_src.value = '/emoxy/faces/' + selected_face + '.png'

function whileLoading() {
  showPlane.value = false
}

function onReady(gltf: any) {
  Scene.environment = envTexture

  const renderer = rendererC.value as RendererPublicInterface

  const mesh = gltf.scene.children[0]

  showPlane.value = true

  const finetuningSpeed = [
    0.0025, 0.0022, 0.0052, 0.0025, 0.0015, 0.0035, 0.0045, 0.0045
  ]

  renderer.onBeforeRender(() => {
    let face_f
    const time = Date.now() * finetuningSpeed[last_emotion]
    let io = Math.cos(time)
    io > 0 ? (face_f = 'A') : (face_f = 'B')
    selected_face = last_emotion + face_f
    face_src.value = '/emoxy/faces/' + selected_face + '.png'
  })

  const plane = planeC.value.mesh
  plane.material.transparent = true

  if (level > 4) {
    opacity.image == undefined
      ? (mesh.material.transparent = false)
      : (mesh.material.transparent = true)

    mesh.material = new MeshPhysicalMaterial({
      map: basecolor,
      aoMap: ambientOcclusion,
      metalnessMap: metallic,
      roughnessMap: roughness,
      normalMap: normal
    })
  } else {
    mesh.material = new MeshBasicMaterial({
      color: phong_color,
      reflectivity: 1,
      envMap: refractionTexture,
      refractionRatio: 0.98
    })

    const scaleMesh = 1

    const reflectionmesh = mesh.clone()
    reflectionmesh.scale.set(
      mesh.scale.x * gltfC.value.scale.x * scaleMesh,
      mesh.scale.y * gltfC.value.scale.y * scaleMesh,
      mesh.scale.z * gltfC.value.scale.z * scaleMesh
    )
    reflectionmesh.position.set(
      mesh.position.x * 0.7,
      mesh.position.y * 0.7,
      mesh.position.z * 0.7
    )
    sceneC.value.scene.add(reflectionmesh)

    reflectionmesh.material = new MeshPhysicalMaterial({
      color: 0x000000,
      envMap: envTexture,
      envMapIntensity: 1,
      metalness: 0,
      reflectivity: 0.8,
      roughness: 0.4,
      blending: AdditiveBlending,
      opacity: 1
    })
  }

  if (level >= 6) {
    let scatter_amount = bst_all
    scatter_amount > 700
      ? (scatter_amount = 700)
      : (scatter_amount = scatter_amount)

    const scatter_material = new MeshPhysicalMaterial({
      color: phong_color,
      opacity: 0.8,

      metalness: 0.42,
      reflectivity: 0.8,
      roughness: 0.5,
      transparent: true
    })

    const surface_mesh = mesh.clone()

    gltfLoader.load('/emoxy/meshes/stone1.glb', function (gltf) {
      const finetune_scale = [0.7, 0.7, 1.4, 1.2, 0.7, 1.4, 2, 0.7, 0.7]
      const test_mesh = gltf.scene.children[0]
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

  if (level == 1) {
    let morphMesh = gltf.scene.getObjectByName('blob1001')
    morphMesh.rotation.set(-0.9, 1.3, 1.3)

    morphMesh.material = new MeshBasicMaterial({
      color: phong_color,
      reflectivity: 1,
      envMap: refractionTexture,
      refractionRatio: 0.98
    })

    const scaleMesh = 1

    const reflectionmesh = morphMesh.clone()
    reflectionmesh.scale.set(
      morphMesh.scale.x * gltfC.value.scale.x * scaleMesh,
      morphMesh.scale.y * gltfC.value.scale.y * scaleMesh,
      morphMesh.scale.z * gltfC.value.scale.z * scaleMesh
    )
    reflectionmesh.position.set(
      morphMesh.position.x * 0.7,
      morphMesh.position.y * 0.7,
      morphMesh.position.z * 0.7
    )

    sceneC.value.scene.add(reflectionmesh)

    reflectionmesh.material = new MeshPhysicalMaterial({
      color: 0x000000,
      envMap: envTexture,
      envMapIntensity: 1,
      metalness: 0,
      reflectivity: 0.8,
      roughness: 0.4,
      blending: AdditiveBlending,
      opacity: 1
    })

    const clip = gltf.animations[0]

    let mixer = new AnimationMixer(reflectionmesh)
    let mixer2 = new AnimationMixer(morphMesh)

    let morphAction = mixer.clipAction(clip)
    let morphAction2 = mixer2.clipAction(clip)

    morphAction.setLoop(LoopPingPong, Infinity)
    morphAction.play()
    morphAction2.setLoop(LoopPingPong, Infinity)
    morphAction2.play()

    let mixers: any = []
    mixers.push(mixer, mixer2)

    renderer.onBeforeRender(() => {
      const delta = clock.getDelta() * 2.3
      for (const mixer of mixers) mixer.update(delta)
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

  const scatter_scale = scale

  const scatter_geo = scatterMesh.geometry.clone()
  const surface = surfaceMesh

  scatter_geo.rotateX(90)
  scatter_geo.translate(0, -0.2, -0.5)
  scatter_geo.scale(scatter_scale, scatter_scale, scatter_scale)

  const scatter = new InstancedMesh(scatter_geo, Material, count)

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

  const sampler = new MeshSurfaceSampler(surface).build()

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

  sceneC.value.scene.add(scatter)
}
</script>
