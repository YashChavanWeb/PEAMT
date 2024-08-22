import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import home1 from '../assets/2woman.png';
import tabCheat from '../assets/cheat.png';
import veri from '../assets/verification.gif';
import realtime from '../assets/realtime.gif';
import assessmentimg from '../assets/assessment.png';
import assessment2img from '../assets/assessment2.png';
import teacherLaptop from '../assets/teacher.png';
import easyUseGuy from '../assets/guyonlaptop.png';

function Home() {
  const [visible, setVisible] = useState([]);
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from the Redux store

  const featuresRef = useRef(null); // Create a ref for the heading section
  const topreference = useRef(null); // Create a ref for the heading section

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate');
      const windowHeight = window.innerHeight;

      elements.forEach((element, index) => {
        const position = element.getBoundingClientRect();
        if (position.top < windowHeight && position.bottom >= 0) {
          setVisible(prev => [...prev, index]);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (topreference.current) {
      topreference.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slideInStyle = (direction = 'left') => ({
    opacity: 0,
    transform: `translate${direction === 'left' ? 'X' : 'Y'}(-30px)`,
    transition: 'opacity 1s ease-out, transform 1s ease-out'
  });

  const slideInActiveStyle = {
    opacity: 1,
    transform: 'translateX(0)',
  };

  const zoomInStyle = {
    opacity: 0,
    transform: 'scale(0.9)',
    transition: 'opacity 1s ease-out, transform 1s ease-out'
  };

  const zoomInActiveStyle = {
    opacity: 1,
    transform: 'scale(1)',
  };

  const rotateInStyle = {
    opacity: 0,
    transform: 'rotate(-20deg)',
    transition: 'opacity 1s ease-out, transform 1s ease-out'
  };

  const rotateInActiveStyle = {
    opacity: 1,
    transform: 'rotate(0)',
  };

  return (
    <div ref={topreference} className='bg-gradient-to-r from-cyan-600 to-indigo-300' style={{ height: '100%', width: '100vw', overflowX: 'hidden' }}>
      <section className='intro p-20 text-white flex flex-row justify-between'>
        <section className='animate'
          style={visible.includes(0) ? { ...slideInStyle('right'), ...slideInActiveStyle } : slideInStyle('right')}>
          <h2 className='text-6xl p-4'>
            <b>Secure Exams, Guaranteed Success.</b>
          </h2>
          <h4 className='text-3xl m-auto mt-10 p-3 font-bold'>Welcome to Scorezy ! </h4>
          <p className='p-3'>
            Your Trusted Online Exam Proctoring Solution! At Scorezy, we understand that maintaining the integrity of online exams is crucial. That's why we've created an easy-to-use, reliable tool that helps ensure a fair testing environment. Whether you're a student taking an important test or an educator administering one, Scorezy is here to make the process smooth and secure.
          </p>
          <div className='flex items-center'>
            {!currentUser?.isAdmin && ( // Conditionally render the button only if the user is not an admin
              <Link to='/registration-form'>
                <button className='button'>
                  Registration Form
                </button>
              </Link>
            )}

            {currentUser && ( // Conditionally render the button
              <Link to={currentUser.isAdmin ? '/admin-dashboard' : '/user-dashboard'}>
                <button className='button m-10'>
                  Go to Dashboard
                </button>
              </Link>
            )}

            <div className='flex flex-col items-center mt-10 pl-48 cursor-pointer' onClick={scrollToFeatures}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 14a.75.75 0 01-.53-.22L5.22 9.53a.75.75 0 011.06-1.06L10 12.44l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-.53.22z" clipRule="evenodd" />
              </svg>
              <p className='text-white mt-2'>Explore More</p>
            </div>
          </div>
        </section>
        <img src={home1} className='w-1/2 m-auto mt-4 animate' alt='Home illustration'
          style={visible.includes(1) ? { ...zoomInStyle, ...zoomInActiveStyle } : zoomInStyle} />
      </section>

      <h1 ref={featuresRef} className='text-6xl p-4 font-extrabold text-white text-center animate'
        style={visible.includes(2) ? { ...slideInStyle('bottom'), ...slideInActiveStyle } : slideInStyle('bottom')}>
        Explore Our Cutting-Edge Features
      </h1>

      <section className='grid grid-rows-2 md:grid-cols-3 gap-10 m-20'>

        <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s rounded-2xl flex flex-col items-center justify-center p-10 text-justify overflow-hidden animate'
          style={visible.includes(3) ? { ...slideInStyle('top'), ...slideInActiveStyle } : slideInStyle('top')}>
          <img src={tabCheat} alt='Secure Browser Lockdown' />
          <h1 className='text-xl font-bold'>Secure Browser Lockdown</h1>
          <p className='text-lg'>Prevent cheating with our robust browser lockdown mode, designed to keep exams secure and free from unauthorized access.</p>
        </div>

        <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s col-span-2 rounded-2xl flex flex-row items-center justify-center p-10 text-justify overflow-hidden animate'
          style={visible.includes(4) ? { ...rotateInStyle, ...rotateInActiveStyle } : rotateInStyle}>
          <img src={veri} className='w-full' alt='Authentication and Verification' />
          <div>
            <h1 className='text-xl font-bold'>Authentication and Verification</h1>
            <p className='text-lg'>At Scorezy, we ensure exam integrity with our advanced registration and verification system. Our thorough authentication process confirms each candidate's identity, preventing unauthorized access and ensuring a secure testing environment.</p>
          </div>
        </div>

        <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s rounded-2xl flex flex-col items-center justify-center p-10 text-justify overflow-hidden animate'
          style={visible.includes(5) ? { ...slideInStyle('left'), ...slideInActiveStyle } : slideInStyle('left')}>
          <img src={realtime} alt='Real-Time Monitoring' />
          <h1 className='text-xl font-bold'>Real-Time Monitoring</h1>
          <p className='text-md'>Ensure exam integrity with our real-time monitoring feature, which provides live oversight and instant alerts for any suspicious activity.</p>
        </div>

        <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s rounded-2xl flex flex-col items-center justify-center p-10 text-justify overflow-hidden animate'
          style={visible.includes(6) ? { ...zoomInStyle, ...zoomInActiveStyle } : zoomInStyle}>
          <img src={assessment2img} alt='Rapid Assessment' />
          <h1 className='text-xl font-bold'>Rapid Assessment</h1>
          <p className='text-md'>Experience rapid assessment and evaluation with our secure browser lockdown, ensuring fast and accurate exam results.</p>
        </div>

        <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s row-span-2 rounded-2xl flex flex-col items-center justify-center p-10 text-justify overflow-hidden animate'
          style={visible.includes(7) ? { ...rotateInStyle, ...rotateInActiveStyle } : rotateInStyle}>
          <img src={teacherLaptop} alt='Create an Exam' />
          <h1 className='text-xl font-bold'>Create an exam in minutes</h1>
          <p className='text-md'>Create exams with diverse question types, from multiple choice to fill-in-the-gaps. Choose which questions are automatically scored and which require manual grading. Save time and focus on the next task at hand, even for theory-based questions.</p>
          <img src={assessmentimg} alt='Assessment' />
        </div>

        <div className='bg-white/45 w-full border-2 shadow-md hover:shadow-black transition-all-0.3s col-span-2 rounded-2xl flex flex-row items-center justify-center p-10 text-justify overflow-hidden animate'
          style={visible.includes(8) ? { ...slideInStyle('bottom'), ...slideInActiveStyle } : slideInStyle('bottom')}>
          <img src={easyUseGuy} alt='Easy to Use' />
          <div>
            <h1 className='text-xl font-bold'>Easy to Use</h1>
            <p className='text-lg'>Our platform simplifies exam creation with an intuitive interface. Manage various question types effortlessly and let automation handle scoring. Save time and focus on what matters most.</p>
          </div>
        </div>
      </section>

      <div className='flex flex-col items-center mt-10 cursor-pointer mb-20' onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 6a.75.75 0 01.53.22l4.25 4.25a.75.75 0 01-1.06 1.06L10 8.56 5.22 11.84a.75.75 0 01-1.06-1.06L9.47 6.22A.75.75 0 0110 6z" clipRule="evenodd" />
        </svg>
        <p className='text-white mt-2'>Go to Top</p>
      </div>
    </div>
  );
}

export default Home;
