// RegistrationForm.js
import React, { useState } from 'react';
import SideDrawer from './SideDrawer';
import PersonalDetails from './Form_Sections/PersonalDetails';
import AddressInformation from './Form_Sections/AddressInformation';
import OtherInformation from './Form_Sections/OtherInformation';
import CurrentCourse from './Form_Sections/CurrentCourse';
import PastQualification from './Form_Sections/PastQualification';

const RegistrationForm = () => {
    const [currentSection, setCurrentSection] = useState('personal');

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    const handleNext = () => {
        // Define logic for transitioning to the next section
        switch (currentSection) {
            case 'personal':
                setCurrentSection('address');
                break;
            case 'address':
                setCurrentSection('other');
                break;
            case 'other':
                setCurrentSection('course');
                break;
            case 'course':
                setCurrentSection('qualification');
                break;
            case 'qualification':
                // Handle end of form or loop back to the start
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex ">
            <SideDrawer currentSection={currentSection} handleSectionChange={handleSectionChange} />
            <div className="flex-1 p-4 ml-40 mt-10">
                {/* Render form content based on currentSection */}
                {currentSection === 'personal' && <PersonalDetails handleNext={handleNext} />}
                {currentSection === 'address' && <AddressInformation handleNext={handleNext} />}
                {currentSection === 'other' && <OtherInformation handleNext={handleNext} />}
                {currentSection === 'course' && <CurrentCourse handleNext={handleNext} />}
                {currentSection === 'qualification' && <PastQualification handleNext={handleNext} />}
            </div>
        </div>
    );
};



export default RegistrationForm;
