import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as satellite from 'satellite.js';

const EARTH_RADIUS_KM = 6371; // km
const TIME_STEP = 3 * 1000; // per frame
const SAT_SIZE = 100; // km


const GlobeComponent = () => {
  const globeEl = useRef();
  const [time, setTime] = useState(new Date());
  const loader = new GLTFLoader();

  useEffect(() => {
    const world = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .objectLat('lat')
      .objectLng('lng')
      .objectAltitude('alt')
      .objectFacesSurface(false)
      .objectLabel('name');

    setTimeout(() => world.pointOfView({ altitude: 3.5 }));

    // // Load Satellite 3D model
    // loader.load(
    //   '/public/data/sat.glb', // 3D model
    //   (gltf) => {
    //     const satelliteModel = gltf.scene;

    //     // Adjust satellite model scale relative to the globe
    //     const scaleFactor = 0.01 * world.getGlobeRadius() / EARTH_RADIUS_KM;
    //     satelliteModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

    //     // Use the satellite 3D model instead of the Octahedron
    //     world.objectThreeObject(() => satelliteModel.clone());
    //   },
    //   undefined,
    //   (error) => {
    //     console.error('Error loading satellite model:', error);
    //   }
    // );

    // you can use either the 3D model or the Octahedron hai dost  

    // Satellite geometry
    const satGeometry = new THREE.OctahedronGeometry(SAT_SIZE * world.getGlobeRadius() / EARTH_RADIUS_KM / 2, 0);
    const satMaterial = new THREE.MeshLambertMaterial({
      color: 'palegreen',
      transparent: true,
      opacity: 0.7
    });
    world.objectThreeObject(() => new THREE.Mesh(satGeometry, satMaterial));

    // Fetch TLE data
    fetch('/public/data/space-track-leo.txt')
      .then(r => r.text())
      .then(rawData => {
        const tleData = rawData
          .replace(/\r/g, '')
          .split(/\n(?=[^12])/)
          .filter(d => d)
          .map(tle => tle.split('\n'));

        const satData = tleData
          .map(([name, ...tle]) => ({
            satrec: satellite.twoline2satrec(...tle),
            name: name.trim().replace(/^0 /, '')
          }))
          .filter(d => !!satellite.propagate(d.satrec, new Date()).position)
          .slice(0, 2000);

        // Time ticker
        const tick = () => {
          setTime((prevTime) => new Date(+prevTime + TIME_STEP));

          const gmst = satellite.gstime(new Date());
          satData.forEach(d => {
            const eci = satellite.propagate(d.satrec, new Date());
            if (eci.position) {
              const gdPos = satellite.eciToGeodetic(eci.position, gmst);
              d.lat = satellite.radiansToDegrees(gdPos.latitude);
              d.lng = satellite.radiansToDegrees(gdPos.longitude);
              d.alt = gdPos.height / EARTH_RADIUS_KM;
            }
          });

          world.objectsData(satData);
        };

        const intervalId = setInterval(tick, TIME_STEP);
        return () => clearInterval(intervalId); // Cleanup
      });
  }, []);

  return (
    <>
      <div id="chart" ref={globeEl} style={{ width: '100%', height: '100vh' }} />
      <div id="time-log" style={{
        position: 'absolute',
        fontSize: '12px',
        fontFamily: 'sans-serif',
        padding: '5px',
        borderRadius: '3px',
        backgroundColor: 'rgba(200, 200, 200, 0.1)',
        color: 'lavender',
        bottom: '10px',
        right: '10px'
      }}>
        {time.toString()}
      </div>
    </>
  );
};

export default GlobeComponent;
