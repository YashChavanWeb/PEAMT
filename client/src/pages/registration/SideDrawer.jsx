// SideDrawer.js
import React from 'react';

const SideDrawer = ({ currentSection, handleSectionChange }) => {
    return (
        <div className='fixed bg-gray-200'>
            <div className="bg-gray-200 h-full w-1/4 p-4" >
                <ul>
                    <li
                        className={`cursor-pointer py-2 ${currentSection === 'personal' ? 'font-bold' : ''
                            }`}
                        onClick={() => handleSectionChange('personal')}
                    >
                        Personal Information
                    </li>
                    <li
                        className={`cursor-pointer py-2 ${currentSection === 'address' ? 'font-bold' : ''
                            }`}
                        onClick={() => handleSectionChange('address')}
                    >
                        Address Information
                    </li>
                    <li
                        className={`cursor-pointer py-2 ${currentSection === 'other' ? 'font-bold' : ''
                            }`}
                        onClick={() => handleSectionChange('other')}
                    >
                        Other Information
                    </li>
                    <li
                        className={`cursor-pointer py-2 ${currentSection === 'course' ? 'font-bold' : ''
                            }`}
                        onClick={() => handleSectionChange('course')}
                    >
                        Current Course
                    </li>
                    <li
                        className={`cursor-pointer py-2 ${currentSection === 'qualification' ? 'font-bold' : ''
                            }`}
                        onClick={() => handleSectionChange('qualification')}
                    >
                        Past Qualification
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideDrawer;
