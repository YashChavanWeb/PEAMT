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
        <div ref={vantaRef} style={{ height: '100%', width: '100vw', overflowX: 'hidden' }}>
            <section className='intro p-20 text-white flex row justify-between'>
                <h1>TestOps</h1>
                <img src={pc} className='w-1/2' data-aos="fade-left"></img>
            </section>
            <section className='intro p-20 text-white flex row justify-evenly'>
                <img src={pc} className='w-1/2' 
                  data-aos="fade-down-right"
                  data-aos-anchor-placement="top-center"
                ></img>
                <p>GSAP has sensible defaults for units. If you want to set the x property, you can say x: 24 instead of x: "24px" because GSAP uses pixels as the default unit for x. If you want to specify a particular unit you can append the unit value on the end and wrap the value in a string.</p>
            </section>
            <section className='intro p-20 text-white flex row justify-between'>
                <p>GSAP has sensible defaults for units. If you want to set the x property, you can say x: 24 instead of x: "24px" because GSAP uses pixels as the default unit for x. If you want to specify a particular unit you can append the unit value on the end and wrap the value in a string.</p>
                <img src={pc} className='w-1/2' 
                  data-aos="fade-left"
                  data-aos-anchor-placement="top-center"
                ></img>
            </section>
        </div>
    )
}

export default Home
