import * as THREE from "three";
import { useRef, useState, useEffect, memo, ReactNode } from "react";
import {
    Canvas,
    createPortal,
    useFrame,
    useThree,
    ThreeElements,
} from "@react-three/fiber";
import {
    useFBO,
    useGLTF,
    Preload,
    ScrollControls,
    MeshTransmissionMaterial,
} from "@react-three/drei";
import { easing } from "maath";
import { Text } from "@react-three/drei";

type Mode = "lens";


type ModeProps = Record<string, unknown>;

interface FluidGlassProps {
    mode?: Mode;
    lensProps?: ModeProps;
}

export default function FluidGlass({
    lensProps = {},
}: FluidGlassProps) {
    const Wrapper = Lens;
    const rawOverrides = lensProps;

    const {
        ...modeProps
    } = rawOverrides;

    return (
        <>
        <Canvas 
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true }}
        // style={{background:'transparent'}}
        >
        <ScrollControls>
            <Wrapper modeProps={modeProps}>
                <Preload />
            </Wrapper>
            </ScrollControls>
        </Canvas>

            <main
                style={{
                    position: 'relative',
                    zIndex: 5,
                    padding: '2rem',
                    color: 'black',
                    fontSize: '2rem',
                }}
            >
                This is the Vineet Zone 🧠
            </main>
</>
    );
}

type MeshProps = ThreeElements["mesh"];

interface ModeWrapperProps extends MeshProps {
    children?: ReactNode;
    glb: string;
    geometryKey: string;
    lockToBottom?: boolean;
    followPointer?: boolean;
    modeProps?: ModeProps;
}

// interface ZoomMaterial extends THREE.Material {
//     zoom: number;
// }

// Removed ZoomMesh interface as it was redundant

// type ZoomGroup = THREE.Group & { children: THREE.Mesh<THREE.BufferGeometry, ZoomMaterial>[] };

const ModeWrapper = memo(function ModeWrapper({
    glb,
    geometryKey,
    lockToBottom = false,
    followPointer = true,
    modeProps = {},
    ...props
}: ModeWrapperProps) {
    const ref = useRef<THREE.Mesh>(null!);
    const { nodes } = useGLTF(glb);
    const buffer = useFBO();
    const { viewport: vp } = useThree();
    const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
    const geoWidthRef = useRef<number>(1);

    useEffect(() => {
        const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
        geo.computeBoundingBox();
        geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
    }, [nodes, geometryKey]);

    useFrame((state, delta) => {
        const { gl, viewport, pointer, camera } = state;
        const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

        const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
        const destY = lockToBottom
            ? -v.height / 2 + 0.2
            : followPointer
                ? (pointer.y * v.height) / 2
                : 0;
        easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

        if ((modeProps as { scale?: number }).scale == null) {
            const maxWorld = v.width * 0.9;
            const desired = maxWorld / geoWidthRef.current;
            ref.current.scale.setScalar(Math.min(0.15, desired));
        }

        gl.setRenderTarget(buffer);
        gl.render(scene, camera);
        gl.setRenderTarget(null);
        // gl.setClearColor(0x5227ff, 1);
    });

    const {
        scale,
        ior,
        thickness,
        anisotropy,
        chromaticAberration,
        ...extraMat
    } = modeProps as {
        scale?: number;
        ior?: number;
        thickness?: number;
        anisotropy?: number;
        chromaticAberration?: number;
        [key: string]: unknown;
    };

    return (
        <>
            {createPortal(
                // children, scene
                <>
                    {/* Background Scene in Render Buffer */}
                    <color attach="background" 
                    args={["transparent"]} 
                    />
                    <Text
                    color='black'
                    fontSize={0.8}
                    fontWeight={800}
                    >HI 🫦</Text>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 2]} />
                </>,
              scene
            )}
            <mesh scale={[vp.width, vp.height, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={buffer.texture} transparent />
            </mesh>
            <mesh
                ref={ref}
                scale={scale ?? 0.15}
                rotation-x={Math.PI / 2}
                geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}
                {...props}
            >
                <MeshTransmissionMaterial
                    buffer={buffer.texture}
                    ior={ior ?? 1.15}
                    thickness={thickness ?? 5}
                    transmission={1}
                    anisotropy={anisotropy ?? 0.01}
                    chromaticAberration={chromaticAberration ?? 0.1}
                    {...(typeof extraMat === "object" && extraMat !== null
                        ? extraMat
                        : {})}
                />
            </mesh>
        </>
    );
});

function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
    return (
        <ModeWrapper
            glb="/assets/3d/lens.glb"
            geometryKey="Cylinder"
            followPointer
            modeProps={modeProps}
            {...p}
        />
    );
}


// function NavItems({ items }: { items: NavItem[] }) {
//     const group = useRef<THREE.Group>(null!);
//     const { viewport, camera } = useThree();

//     const DEVICE = {
//         mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
//         tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
//         desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 },
//     };
//     const getDevice = () => {
//         const w = window.innerWidth;
//         return w <= DEVICE.mobile.max
//             ? "mobile"
//             : w <= DEVICE.tablet.max
//                 ? "tablet"
//                 : "desktop";
//     };

//     const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

//     useEffect(() => {
//         const onResize = () => setDevice(getDevice());
//         window.addEventListener("resize", onResize);
//         return () => window.removeEventListener("resize", onResize);
//     }, []);

//     const { spacing, fontSize } = DEVICE[device];

//     useFrame(() => {
//         if (!group.current) return;
//         const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
//         group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

//         group.current.children.forEach((child, i) => {
//             child.position.x = (i - (items.length - 1) / 2) * spacing;
//         });
//     });

//     const handleNavigate = (link: string) => {
//         if (!link) return;
//         if (link.startsWith("#")) {
//             window.location.hash = link;
//         } else {
//             window.location.href = link;
//         }
//     };

//     return (
//         <group ref={group} renderOrder={10}>
//             {items.map(({ label, link }) => (
//                 <Text
//                     key={label}
//                     fontSize={fontSize}
//                     color="white"
//                     anchorX="center"
//                     anchorY="middle"
//                     font="/assets/fonts/figtreeblack.ttf"
//                     outlineWidth={0}
//                     outlineBlur="20%"
//                     outlineColor="#000"
//                     outlineOpacity={0.5}
//                     renderOrder={10}
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         handleNavigate(link);
//                     }}
//                     onPointerOver={() => (document.body.style.cursor = "pointer")}
//                     onPointerOut={() => (document.body.style.cursor = "auto")}
//                 >
//                     {label}
//                 </Text>
//             ))}
//         </group>
//     );
// }

