import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default () =>  {

    const navigate = useNavigate();

    const handleBackToMain = () => {
        navigate('/'); // Navigate to the main page (change '/' to the appropriate route if needed)
    };

    return (

        <Button onClick={handleBackToMain}>Back to Main</Button>

    );
  
}