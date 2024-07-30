import React, { useRef, useEffect } from 'react';
import home1 from '../assets/2woman.png';
import home2 from '../assets/pc.png'
import test from '../assets/test.png'
import tabCheat from '../assets/cheat.png'
import veri from '../assets/verification.gif'
import assessmentimg from '../assets/assessment.png'
import assessment2img from '../assets/assessment2.png'
import teacherLaptop from '../assets/teacher.png'
import easyUseGuy from '../assets/guyonlaptop.png'
import realtime from '../assets/realtime.gif'
import veri2 from '../assets/verify2.gif'

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

            {/* <section className='intro p-20 text-white flex row justify-evenly'>
                <img src={test} className='w-1/2' 
                  data-aos="fade-down-right"
                  data-aos-anchor-placement="top-center"
                ></img>
                <p className='p-3'>Your Trusted Online Exam Proctoring Solution! 
                  At TestOps, we understand that maintaining the integrity of online exams is crucial. That's why we've created an easy-to-use, reliable tool that helps ensure a fair testing environment. Whether you're a student taking an important test or an educator administering one, TestOps is here to make the process smooth and secure.
                  </p>
            </section> */}

            {/* FEATURES SECTION */}
            <h1 className='text-6xl p-4 font-extrabold text-white text-center'>Explore Our Cutting-Edge Features</h1>
            <section className='grid grid-rows-2 md:grid-cols-3 gap-10 m-20'>

                  <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s rounded-2xl flex flex-col items-center justify-center p-10 text-justify'>
                      <img src={tabCheat} alt='Cheating'></img>
                      <h1 className='text-xl font-bold'>Secure Browser Lockdown</h1>
                      <p className='text-lg'>Prevent cheating with our robust browser lockdown mode, designed to keep exams secure and free from unauthorized access.</p>
                  </div>

                  <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s col-span-2 rounded-2xl flex flex-row items-center justify-center p-10 text-justify'>
                    <img src={veri} className='w-full'></img>
                    <div>
                      <h1 className='text-xl font-bold'>Authentication and Verification</h1>
                      <p className='text-lg'>At TestOps, we ensure exam integrity with our advanced registration and verification system. Our thorough authentication process confirms each candidate’s identity, preventing unauthorized access and ensuring a secure testing environment.</p>
                    </div>
                  </div>

                  <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s rounded-2xl flex flex-col items-center justify-center p-10 text-justify'>
                    <img src={realtime}></img>
                    <h1 className='text-xl font-bold'>Real-Time Monitoring</h1>
                    <p className='text-md'>Ensure exam integrity with our real-time monitoring feature, which provides live oversight and instant alerts for any suspicious activity.</p>
                  </div>

                  <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s rounded-2xl flex flex-col items-center justify-center p-10 text-justify'>
                    <img src={assessment2img}></img>
                    <h1 className='text-xl font-bold'>Rapid Assessment</h1>
                    <p className='text-md'>Experience rapid assessment and evaluation with our secure browser lockdown, ensuring fast and accurate exam results.</p>
                  </div>

                  <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s row-span-2 rounded-2xl flex flex-col items-center justify-center p-10 text-justify'>
                    <img src={teacherLaptop}></img>
                    <h1 className='text-xl font-bold'>Create an exam in minutes</h1>
                    <p className='text-md'>Create exams with diverse question types, from multiple choice to fill-in-the-gaps. Choose which questions are automatically scored and which require manual grading. Save time and focus on the next task at hand, even for theory-based questions.</p>
                    <img src={assessmentimg}></img>
                  </div>

                  <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s col-span-2 rounded-2xl flex flex-row items-center justify-center p-10 text-justify'>
                    <img src={easyUseGuy}></img>
                    <div>
                      <h1 className='text-xl font-bold'>Easy to Use</h1>
                      <p className='text-lg'>Our platform simplifies exam creation with an intuitive interface. Manage various question types effortlessly and let automation handle scoring. Save time and focus on what matters most.</p>
                    </div>
                  </div>
            </section>

            {/* <section className='intro p-20 text-white flex row justify-between'>
                <p className='p-3'>Your Trusted Online Exam Proctoring Solution! 
                  At TestOps, we understand that maintaining the integrity of online exams is crucial. That's why we've created an easy-to-use, reliable tool that helps ensure a fair testing environment. Whether you're a student taking an important test or an educator administering one, TestOps is here to make the process smooth and secure.
                  </p>
                <img src={home2} className='w-1/2' 
                  data-aos="fade-left"
                  data-aos-anchor-placement="bottom-bottom"
                ></img>
            </section> */}
        </div>
    )
}

export default Home
