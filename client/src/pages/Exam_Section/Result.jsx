import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Optional for auto table creation

function Result() {
    const { currentUser } = useSelector((state) => state.user);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`/api/results?userId=${currentUser._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch results');
                }
                const data = await response.json();
                setResults(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [currentUser]);

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Your Exam Results", 14, 22);

        const tableData = results.map(result => [
            result.examName,
            result.score,
            new Date(result.createdAt).toLocaleDateString()
        ]);

        doc.autoTable({
            head: [['Exam Name', 'Score', 'Date']],
            body: tableData,
            startY: 30,
        });

        doc.save('scorecard.pdf');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4">Your Exam Results</h1>
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <>
                    <button
                        onClick={downloadPDF}
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Download Scorecard as PDF
                    </button>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Exam Name</th>
                                <th className="border px-4 py-2">Score</th>
                                <th className="border px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result._id}>
                                    <td className="border px-4 py-2">{result.examName}</td>
                                    <td className="border px-4 py-2">{result.score}</td>
                                    <td className="border px-4 py-2">{new Date(result.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Result;
