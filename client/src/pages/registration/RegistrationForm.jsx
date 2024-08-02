import React, { useState } from 'react';
import SideDrawer from './SideDrawer';
import PersonalDetails from './Form_Sections/PersonalDetails';
// import AddressInformation from './Form_Sections/AddressInformation';
import OtherInformation from './Form_Sections/OtherInformation';
import CurrentCourse from './Form_Sections/CurrentCourse';
import PastQualification from './Form_Sections/PastQualification';
import PaymentProcess from './Form_Sections/PaymentProcess';

const RegistrationForm = () => {
    const [currentSection, setCurrentSection] = useState('personal');

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    const handleNext = () => {
        switch (currentSection) {
            case 'personal':
                setCurrentSection('other');
                break;
            // case 'address':
            //     setCurrentSection('other');
            //     break;
            case 'other':
                setCurrentSection('course');
                break;
            case 'course':
                setCurrentSection('qualification');
                break;
            case 'qualification':
                setCurrentSection('payment');
                break;
            case 'payment':
                // Handle form submission or finalization
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex min-h-screen">
            <SideDrawer currentSection={currentSection} handleSectionChange={handleSectionChange} />
            <div className="flex-1 p-8 ml-64 mt-16 bg-gray-50">
                {/* Render form content based on currentSection */}
                {currentSection === 'personal' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <PersonalDetails handleNext={handleNext} />
                    </div>
                )}
                {/* {currentSection === 'address' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <AddressInformation handleNext={handleNext} />
                    </div>
                )} */}
                {currentSection === 'other' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <OtherInformation handleNext={handleNext} />
                    </div>
                )}
                {currentSection === 'course' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <CurrentCourse handleNext={handleNext} />
                    </div>
                )}
                {currentSection === 'qualification' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <PastQualification handleNext={handleNext} />
                    </div>
                )}
                {currentSection === 'payment' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <PaymentProcess />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationForm;
