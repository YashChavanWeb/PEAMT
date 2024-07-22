import React, { useRef, useEffect } from 'react';
import * as THREE from 'three'; // Import three.js
import VANTA from 'vanta'; // Import Vanta.js
import FOG from 'vanta/dist/vanta.fog.min';
import pc from '../assets/pc.png';

function Home() {

    const vantaRef = useRef(null);

    useEffect(() => {
      let vantaEffect;
  
      if (vantaRef.current) {
        vantaEffect = FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0x7b7ff4,
          midtoneColor: 0x7600ff,
          lowlightColor: 0xac,
          baseColor: 0xf9d1f9
        });
      }
  
      // Clean up Vanta.js effect
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }, []);
  
    return (
        <div ref={vantaRef} style={{ height: '100vh', width: '100%' }}>
            <div className='intro p-20 text-white flex row justify-between'>
                <h2>PEAMT</h2>
                <img src={pc} className='w-1/2'></img>
            </div>
        </div>
    )
}

export default Home
