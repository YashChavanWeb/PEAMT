// src/components/private/UserRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    // Check if the user is logged in and not an admin
    if (currentUser && !currentUser.isAdmin) {
        return <Outlet />; // Render the nested routes if the user is not an admin
    } else {
        return <Navigate to="/sign-in" />; // Redirect to the sign-in page if not a regular user
    }
};

export default UserRoute;
