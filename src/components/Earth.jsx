import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Fresnel Material Function
function getFresnelMat({ rimHex = 0x0088ff, facingHex = 0x000000 } = {}) {
    const uniforms = {
        color1: { value: new THREE.Color(rimHex) },
        color2: { value: new THREE.Color(facingHex) },
        fresnelBias: { value: 0.1 },
        fresnelScale: { value: 1.0 },
        fresnelPower: { value: 4.0 },
    };

    const vs = `
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;

    varying float vReflectionFactor;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

        vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

        vec3 I = worldPosition.xyz - cameraPosition;

        vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );

        gl_Position = projectionMatrix * mvPosition;
    }
    `;

    const fs = `
    uniform vec3 color1;
    uniform vec3 color2;

    varying float vReflectionFactor;

    void main() {
        float f = clamp( vReflectionFactor, 0.0, 1.0 );
        gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
    }
    `;

    return new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        blending: THREE.AdditiveBlending,
    });
}

// Starfield Function
function getStarfield({ numStars = 500 } = {}) {
    function randomSpherePoint() {
        const radius = Math.random() * 25 + 25;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi);

        return {
            pos: new THREE.Vector3(x, y, z),
            hue: 0.6,
            minDist: radius,
        };
    }

    const verts = [];
    const colors = [];
    for (let i = 0; i < numStars; i += 1) {
        let p = randomSpherePoint();
        const { pos, hue } = p;
        const col = new THREE.Color().setHSL(hue, 0.2, Math.random());
        verts.push(pos.x, pos.y, pos.z);
        colors.push(col.r, col.g, col.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        map: new THREE.TextureLoader().load("./public/textures/earth/circle.png"),
    });

    return new THREE.Points(geo, mat);
}

const Earth = () => {
    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(w, h);
        document.body.appendChild(renderer.domElement);

        const earthGroup = new THREE.Group();
        earthGroup.rotation.z = -23.4 * Math.PI / 180;
        scene.add(earthGroup);

        new OrbitControls(camera, renderer.domElement);

        const detail = 12;
        const loader = new THREE.TextureLoader();

        // Earth Mesh
        const geometry = new THREE.IcosahedronGeometry(1, detail);
        const material = new THREE.MeshPhongMaterial({
            map: loader.load("./public/textures/earth/00_earthmap1k.jpg"),
            specularMap: loader.load("./public/textures/earth/02_earthspec1k.jpg"),
            bumpMap: loader.load("./public/textures/earth/03_earthlights1k.jpg"),
            bumpScale: 0.04,
        });
        const earthMesh = new THREE.Mesh(geometry, material);
        earthGroup.add(earthMesh);

        // Lights Mesh
        const lightsMat = new THREE.MeshBasicMaterial({
            map: loader.load("public/textures/earth/03_earthlights1k.jpg"),
            blending: THREE.AdditiveBlending,
        });
        const lightsMesh = new THREE.Mesh(geometry, lightsMat);
        earthGroup.add(lightsMesh);

        // Clouds Mesh
        const cloudsMat = new THREE.MeshStandardMaterial({
            map: loader.load("./public/textures/earth/04_earthcloudmap.jpg"),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            alphaMap: loader.load('./public/textures/earth/05_earthcloudmaptrans.jpg'),
        });
        const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
        cloudsMesh.scale.setScalar(1.003);
        earthGroup.add(cloudsMesh);

        // Glow Mesh
        const fresnelMat = getFresnelMat();
        const glowMesh = new THREE.Mesh(geometry, fresnelMat);
        glowMesh.scale.setScalar(1.01);
        earthGroup.add(glowMesh);

        // Starfield
        const stars = getStarfield({ numStars: 2000 });
        scene.add(stars);

        // Sunlight
        const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
        sunLight.position.set(-2, 0.5, 1.5);
        scene.add(sunLight);

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.002;
            lightsMesh.rotation.y += 0.002;
            cloudsMesh.rotation.y += 0.0023;
            glowMesh.rotation.y += 0.002;
            stars.rotation.y -= 0.0002;
            renderer.render(scene, camera);
        }
        animate();

        // Handle Window Resize
        function handleWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', handleWindowResize, false);

        return () => {
            // Cleanup on component unmount
            window.removeEventListener('resize', handleWindowResize);
            renderer.dispose();
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return null; // This component does not render any additional UI
};

export default Earth;
