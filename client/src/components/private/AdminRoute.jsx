import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    // Check if the user is an admin
    if (currentUser && currentUser.isAdmin) {
        return <Outlet />; // Render the nested routes if the user is an admin
    } else {
        return <Navigate to="/sign-in" />; // Redirect to the sign-in page if not an admin
    }
};

export default AdminRoute;
