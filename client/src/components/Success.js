import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Success = () => {
    const navigate = useNavigate(); // React Router's navigation hook

    useEffect(() => {
        // Set a timer to redirect after 2 seconds
        const timer = setTimeout(() => {
            navigate("/login"); // Replace with your target route
        }, 2000);

        // Cleanup timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h3>You have registered successfully.  Redirecting in 2 seconds...</h3>
        </div>
    );
};

export default Success;