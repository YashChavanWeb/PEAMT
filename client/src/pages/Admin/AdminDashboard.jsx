// src/components/FetchRegFormByAdhar.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [adhar, setAdhar] = useState('');
    const [regForm, setRegForm] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setAdhar(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setRegForm(null);

        try {
            const response = await axios.get(`/api/regform/adhar/${adhar}`);
            setRegForm(response.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, porro corrupti. Odio asperiores labore debitis magnam fuga laudantium provident quos! Mollitia, aut esse. Inventore aspernatur minima eos distinctio ipsum enim exercitationem, similique nisi fuga, quaerat temporibus atque suscipit eligendi nulla vitae eveniet. Voluptas numquam magni aperiam dolorum nulla illo at veritatis quod voluptatibus assumenda possimus, earum quos? Natus ea vero explicabo dignissimos amet, earum voluptatem sunt necessitatibus! Porro atque ratione harum officia magni officiis sit eum nulla quia ab aliquam voluptatibus debitis excepturi est quidem eveniet, doloribus dolores aperiam explicabo commodi odit dicta consectetur architecto corrupti? Numquam blanditiis dicta aut!
            <h1>Fetch Registration Form by Aadhar</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="adhar">Aadhar Number:</label>
                <input
                    type="text"
                    id="adhar"
                    value={adhar}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Fetch Details</button>
            </form>

            {error && <div style={{ color: 'red' }}>Error: {error}</div>}

            {regForm && (
                <div>
                    <h2>Registration Form Details</h2>
                    <ul>
                        <li><strong>Name:</strong> {regForm.name}</li>
                        <li><strong>Aadhar:</strong> {regForm.adhar}</li>
                        <li><strong>Email:</strong> {regForm.email}</li>
                        <li><strong>Phone:</strong> {regForm.phone}</li>
                        <li><strong>Permanent Address:</strong>
                            <ul>
                                <li><strong>Country:</strong> {regForm.permanentAddress.country}</li>
                                <li><strong>State:</strong> {regForm.permanentAddress.state}</li>
                                <li><strong>City:</strong> {regForm.permanentAddress.city}</li>
                                <li><strong>Pincode:</strong> {regForm.permanentAddress.pincode}</li>
                            </ul>
                        </li>
                        <li><strong>Payment ID:</strong> {regForm.paymentId}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
