import { Object3DNode } from '@react-three/fiber'
import { AmbientLight, Mesh, CylinderGeometry, MeshStandardMaterial, SphereGeometry, Group } from 'three'

// Extend R3F's ThreeElements interface
declare module '@react-three/fiber' {
    interface ThreeElements {
        group: Object3DNode<Group, typeof Group>
        mesh: Object3DNode<Mesh, typeof Mesh>
        ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>
        cylinderGeometry: Object3DNode<CylinderGeometry, typeof CylinderGeometry>
        sphereGeometry: Object3DNode<SphereGeometry, typeof SphereGeometry>
        meshStandardMaterial: Object3DNode<MeshStandardMaterial, typeof MeshStandardMaterial>
    }
}


