import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { SoftShadows, Float, CameraControls, Sky} from "@react-three/drei"
import { easing } from "maath"
import { Model as Room } from "./Room"
import { Logo } from "@pmndrs/branding"

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        pmnd.rs
        <br />
        dev collective
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>ok —</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>16/12/2022</div>
    </div>
  )
}

function Light() {
  const ref = useRef()
  useFrame((state, delta) => {
    easing.dampE(ref.current.rotation, [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0], 0.2, delta)
  })
  return (
    <group ref={ref}>
      <directionalLight position={[5, 5, -8]} castShadow intensity={5} shadow-mapSize={2048} shadow-bias={-0.001}>
        <orthographicCamera attach="shadow-camera" args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} />
      </directionalLight>
    </group>
  )
}

export default function App() {
  const [bad, set] = useState(false)
  return (
    <Canvas shadows camera={{ position: [5, 2, 10], fov: 35 }}>
     <SoftShadows/>
      <CameraControls makeDefault />
      <color attach="background" args={["#d0d0d0"]} />
      <fog attach="fog" args={["#d0d0d0", 8, 5]} />
      <ambientLight intensity={0.4} />
      <Light />
      <Room scale={0.5} position={[0, -1, 0]} />
      <Sphere />
      <Sphere position={[2, 4, -8]} scale={0.9} />
      <Sphere position={[-2, 2, -8]} scale={0.8} />
      <Sky inclination={0.52} scale={20} />
      <Overlay />
    <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
    </Canvas>
  )
}

function Sphere({ color = "hotpink", floatIntensity = 15, position = [0, 5, -8], scale = 1 }) {
  return (
    <Float floatIntensity={floatIntensity}>
      <mesh castShadow position={position} scale={scale}>
        <sphereGeometry />
        <meshBasicMaterial color={color} roughness={1} />
      </mesh>
    </Float>
  )
}
