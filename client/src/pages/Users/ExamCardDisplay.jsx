import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/ExamCardDisplay.css';

const ExamCardDisplay = ({ exams }) => {
    const [selectedExam, setSelectedExam] = useState(null);
    const navigate = useNavigate();

    const handleApplyClick = (exam) => {
        setSelectedExam(exam);
    };

    const handleClosePopup = () => {
        if (selectedExam) {
            navigate('/registration-form', { state: { exam: selectedExam } });
        }
    };

    return (
        <div className="exam-card-container">
            {exams.map((exam, index) => {
                const {
                    examName,
                    duration,
                    eligibility,
                    examDate,
                    totalMarks,
                    passingMarks,
                    registrationEndDate, // Ensure this field is part of the data returned by your API
                } = exam;

                const currentDate = new Date();
                const endDate = new Date(registrationEndDate);
                const examDateObj = new Date(examDate);

                const timeLeft = endDate - currentDate;
                const totalTime = endDate - new Date('2024-01-01T00:00:00.000+00:00');
                const progress = (timeLeft / totalTime) * 100;

                const formattedDate = examDateObj.toLocaleDateString();

                return (
                    <div key={index} className="exam-card">
                        <div className="exam-card-header">
                            <h2 className="text-xl font-bold">{examName}</h2>
                        </div>
                        <div className="exam-card-body">
                            <div className="exam-card-info">
                                <span className="info-label">Duration:</span>
                                <span>{duration} minutes</span>
                            </div>
                            <div className="exam-card-info">
                                <span className="info-label">Eligibility:</span>
                                <span>{eligibility}</span>
                            </div>
                            <div className="exam-card-info">
                                <span className="info-label">Exam Date:</span>
                                <span>{formattedDate}</span>
                            </div>
                            <div className="exam-card-info">
                                <span className="info-label">Total Marks:</span>
                                <span>{totalMarks}</span>
                            </div>
                            <div className="exam-card-info">
                                <span className="info-label">Passing Marks:</span>
                                <span>{passingMarks}</span>
                            </div>

                            <div className="progress-container">
                                <div className="progress-info">
                                    <span>Time left for registration:</span>
                                    <span>{Math.max(Math.ceil(timeLeft / (1000 * 60 * 60 * 24)), 0)} days</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        style={{ width: `${progress}%` }}
                                        className="progress-fill"
                                    ></div>
                                </div>
                            </div>

                            <div className="apply-button">
                                <button className="btn-apply" onClick={() => handleApplyClick(exam)}>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            {selectedExam && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className="popup-header">Exam Details</h3>
                        <div className="popup-body">
                            <p><strong>Exam Name:</strong> {selectedExam.examName}</p>
                            <p><strong>Duration:</strong> {selectedExam.duration} minutes</p>
                            <p><strong>Eligibility:</strong> {selectedExam.eligibility}</p>
                            <p><strong>Exam Date:</strong> {new Date(selectedExam.examDate).toLocaleDateString()}</p>
                            <p><strong>Total Marks:</strong> {selectedExam.totalMarks}</p>
                            <p><strong>Passing Marks:</strong> {selectedExam.passingMarks}</p>
                            <p><strong>Registration End Date:</strong> {new Date(selectedExam.registrationEndDate).toLocaleDateString()}</p>
                        </div>

                        <button className="popup-close" onClick={handleClosePopup}>Register</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamCardDisplay;
