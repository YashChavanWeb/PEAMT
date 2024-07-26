import React, { useRef, useEffect } from 'react';
import home1 from '../assets/2woman.png';
import home2 from '../assets/pc.png'
import test from '../assets/test.png'

function Home() {

    return (
        <div className='bg-gradient-to-r from-cyan-600 to-indigo-300' style={{ height: '100%', width: '100vw', overflowX: 'hidden' }}>
            <section className='intro p-20 text-white flex row justify-between'>
                <section className='m-auto' 
                  data-aos="zoom-out-right"
                  data-aos-offset="500"
                  data-aos-duration="1000"
                  data-aos-easing="linear"
                  >
                  <h2 className='text-6xl p-4' 
                    data-aos-duration="1000"
                  ><b>Secure Exams, Guaranteed Success.</b></h2>
                  <h4 className='text-3xl m-auto mt-10 p-3 font-bold'>Welcome to TestOps :) </h4>
                  <p className='p-3'>Your Trusted Online Exam Proctoring Solution! 
                  At TestOps, we understand that maintaining the integrity of online exams is crucial. That's why we've created an easy-to-use, reliable tool that helps ensure a fair testing environment. Whether you're a student taking an important test or an educator administering one, TestOps is here to make the process smooth and secure.
                  </p>
                </section>
                <img src={home1} className='w-1/2 m-auto mt-4' data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"></img>
            </section>
            <section className='intro p-20 text-white flex row justify-evenly'>
                <img src={test} className='w-1/2' 
                  data-aos="fade-down-right"
                  data-aos-anchor-placement="top-center"
                ></img>
                <p className='p-3'>Your Trusted Online Exam Proctoring Solution! 
                  At TestOps, we understand that maintaining the integrity of online exams is crucial. That's why we've created an easy-to-use, reliable tool that helps ensure a fair testing environment. Whether you're a student taking an important test or an educator administering one, TestOps is here to make the process smooth and secure.
                  </p>
            </section>
            <section className='intro p-20 text-white flex row justify-between'>
                <p className='p-3'>Your Trusted Online Exam Proctoring Solution! 
                  At TestOps, we understand that maintaining the integrity of online exams is crucial. That's why we've created an easy-to-use, reliable tool that helps ensure a fair testing environment. Whether you're a student taking an important test or an educator administering one, TestOps is here to make the process smooth and secure.
                  </p>
                <img src={home2} className='w-1/2' 
                  data-aos="fade-left"
                  data-aos-anchor-placement="bottom-bottom"
                ></img>
            </section>
        </div>
    )
}

export default Home
