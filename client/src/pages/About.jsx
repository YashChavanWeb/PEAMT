import React, { useState, useEffect, useRef } from 'react';
import teamMember1 from '../assets/team1.jpg';
import teamMember2 from '../assets/team2.jpg';
import teamMember3 from '../assets/team3.jpg';

const features = [
    {
        title: 'Comprehensive Exam Management',
        description: 'Manage competitive, online, and offline exams seamlessly. Our platform provides tools to schedule exams, assign proctors, and monitor exam activities in real-time, ensuring a smooth and efficient examination process for both administrators and students.',
        imgSrc: 'https://media.istockphoto.com/id/1398462038/photo/online-exam-or-test.webp?b=1&s=170667a&w=0&k=20&c=rPmfkbaVJ5zY_WcFe5TV9LfLGaamTIW6F-YGrC1jzmc=',
        imagePosition: 'left'
    },
    {
        title: 'Student Application Forms',
        description: 'Easy-to-fill forms for students to register and apply for exams. The application forms are designed to be user-friendly, guiding students through the necessary steps to ensure they provide all required information accurately and efficiently.',
        imgSrc: 'https://www.shutterstock.com/image-photo/application-online-college-form-concept-600nw-483345682.jpg',
        imagePosition: 'right'
    },
    {
        title: 'Secure Authentication',
        description: 'Ensures security with robust authentication methods. Our platform uses advanced encryption and multi-factor authentication to protect sensitive data and verify user identities, providing a secure environment for both students and administrators.',
        imgSrc: 'https://i.pinimg.com/564x/42/80/7a/42807ae5e6eb79fbcf53ec8ef3f9d40e.jpg',
        imagePosition: 'left'
    },
    {
        title: 'Result Declaration',
        description: 'View and manage exam results directly on the platform. Students can easily access their results, while administrators have tools to publish and analyze exam performance, making the results process transparent and efficient.',
        imgSrc: 'https://i.pinimg.com/564x/a7/e4/ce/a7e4cea37478f8668b13312ab22ff442.jpg',
        imagePosition: 'right'
    }
];

function About() {
    const [currentImage, setCurrentImage] = useState(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = entry.target.dataset.index;
                if (entry.isIntersecting) {
                    setCurrentImage(index);
                } else if (currentImage === index) {
                    setCurrentImage(null);
                }
            });
        }, observerOptions);

        imageRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            imageRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [currentImage]);

    return (
        <div className="p-8 mt-20 animate-fadeIn bg-gradient-to-r from-cyan-600 to-indigo-300">
            <section className="intro text-center mb-12">
                <h1 className="text-3xl font-bold mb-4">About Our Platform</h1>
                <p className="text-lg mx-auto animate-fadeIn">
                    Our proctoring exam automation and monitoring platform allows institutes to create and manage exams effortlessly. Students can fill application forms, participate in various types of exams (competitive, online, offline), and receive results all on this secure and user-friendly platform.
                </p>
            </section>

            <section className="features mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-center text-white py-2 px-4 rounded">
                    Key Features
                </h2>
                <div className="flex flex-col gap-8">
                    {features.map((feature, index) => {
                        const imageAnimation = currentImage === index ? 'animate-slideIn' : (currentImage === null ? 'animate-slideOut' : '');
                        return (
                            <div key={index} className={`flex flex-col ${feature.imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between bg-white rounded-lg p-4 shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl`}>
                                <div className="flex-1 p-4">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="animate-fadeIn">{feature.description}</p>
                                </div>
                                <div className="flex-1 p-4 overflow-hidden">
                                    <img
                                        src={feature.imgSrc}
                                        alt={feature.title}
                                        data-index={index}
                                        ref={(el) => imageRefs.current[index] = el}
                                        className={`w-50 h-auto rounded-lg transition-transform duration-300 ${imageAnimation}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="team text-center">
                <h2 className="text-2xl font-semibold mb-6 animate-bounce">Meet Our Team</h2>
                <div className="flex flex-wrap justify-center">
                    <div className="flex-1 min-w-[200px] m-4 bg-white rounded-lg p-4 text-center shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl animate-fadeIn">
                        <img src={teamMember1} alt="Team Member 1" className="w-52 h-52 rounded-full mb-4 mx-auto object-cover" />
                        <h3 className="text-lg font-bold mb-2">Yash Chavan</h3>
                        <p>Role Description</p>
                    </div>
                    <div className="flex-1 min-w-[200px] m-4 bg-white rounded-lg p-4 text-center shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl animate-fadeIn">
                        <img src={teamMember2} alt="Team Member 2" className="w-52 h-52 rounded-full mb-4 mx-auto object-cover" />
                        <h3 className="text-lg font-bold mb-2">Krisha Chikka</h3>
                        <p>Role Description</p>
                    </div>
                    <div className="flex-1 min-w-[200px] m-4 bg-white rounded-lg p-4 text-center shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl animate-fadeIn">
                        <img src={teamMember3} alt="Team Member 3" className="w-52 h-52 rounded-full mb-4 mx-auto object-cover" />
                        <h3 className="text-lg font-bold mb-2">Anjali Gupta</h3>
                        <p>Role Description</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
