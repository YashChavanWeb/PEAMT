import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

function Result() {
    const navigate = useNavigate();
    const [score, setScore] = useState(null);
    const [error, setError] = useState('');
    const userId = 'currentUserId'; // Replace with actual user ID from context or props

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch(`/api/results/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch result');
                }
                const data = await response.json();
                if (data.length === 0) {
                    setError('No results found for this user.');
                } else {
                    setScore(data[0]); // Assuming the latest result is first
                }
            } catch (error) {
                setError('Could not load result. Please try again later.');
            }
        };

        fetchResult();
    }, [userId]);

    const generatePDF = () => {
        if (!score) return; // Guard clause

        const doc = new jsPDF();
        doc.setFontSize(25);
        doc.text(`Exam Name: ${score.examName}`, 10, 10);
        doc.text(`Score: ${score.score}`, 10, 20);
        doc.text('Responses:', 10, 30);

        const responsesText = JSON.stringify(score.responses, null, 2);
        const splitResponses = doc.splitTextToSize(responsesText, 190); // Break text to fit PDF width
        doc.text(splitResponses, 10, 40);

        doc.save(`${score.examName}_result.pdf`);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-10 bg-white shadow-md rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Your Exam Result</h1>
                {error && <p className="text-red-500">{error}</p>}
                {score && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Your Score: {score.score}</h2>
                        <button
                            onClick={generatePDF}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            Download Result
                        </button>
                    </>
                )}
                <button
                    onClick={() => navigate('/')} // Navigate back to home
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-4"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default Result;
