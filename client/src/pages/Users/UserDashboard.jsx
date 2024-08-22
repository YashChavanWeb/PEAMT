import React from 'react';
import ExamCardDisplay from './ExamCardDisplay';

function UserDashboard() {
    // Array of exam data
    const exams = [
        {
            examName: 'JEE',
            duration: '180',
            eligibility: '12th',
            examDate: '2024-08-11T00:00:00.000+00:00',
            totalMarks: 180,
            passingMarks: 75,
            registrationEndDate: '2024-07-31T00:00:00.000+00:00',
        },
        {
            examName: 'NEET',
            duration: '180',
            eligibility: '12th',
            examDate: '2024-09-15T00:00:00.000+00:00',
            totalMarks: 200,
            passingMarks: 50,
            registrationEndDate: '2024-08-30T00:00:00.000+00:00',
        },
        {
            examName: 'GATE',
            duration: '180',
            eligibility: 'B.Tech',
            examDate: '2024-10-20T00:00:00.000+00:00',
            totalMarks: 100,
            passingMarks: 25,
            registrationEndDate: '2024-09-15T00:00:00.000+00:00',
        },
        {
            examName: 'CAT',
            duration: '180',
            eligibility: 'Graduation',
            examDate: '2024-11-30T00:00:00.000+00:00',
            totalMarks: 300,
            passingMarks: 70,
            registrationEndDate: '2024-10-15T00:00:00.000+00:00',
        },
    ];

    return (
        <ExamCardDisplay exams={exams} />
    );
}

export default UserDashboard;
