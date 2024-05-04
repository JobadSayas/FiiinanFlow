import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../components/Utilities';

const DistributePopupBody = ({passMainAction}) =>  {

    //Use state to save selected date
    const [selectedDate, setSelectedDate] = useState('');

    // Set the default date once when the component is mounted
    useEffect(() => {
        const date = new Date();
        // Adjust for local time zone
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        // Format the date as required
        const formattedDate = localDate.toISOString().slice(0, 10); // Use YYYY-MM-DD for date input
        setSelectedDate(`${formattedDate}`);
    }, []); // Empty dependency array ensures it only runs once on mount
    

    //Take selectedDate from input
    const handleInputChange = (e) => {
        setSelectedDate(e.target.value); 
    };


    //Main function passed to the generic pop up button
    const handleDistribute = () => {

        // console.log("se manda api width date: ", selectedDate)

        axios.post(`${API_URL}/NEWdistribuite.php?budget=*&date=${selectedDate}T12:00`)
        .then(response => {
            console.log('API response:', response.data);
            handleReload();
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });

    }


    // Pasar la función al pop up generico
    useEffect(() => {
        if (passMainAction) {
            passMainAction(() => handleDistribute); // Pasa la función de esta forma para no ejecutarla directamente
        }
    }, [selectedDate]); // Se ejecutará cada vez que cambia selectedDate


    //RELOAD PAGE
    const handleReload = () => {
        window.location.reload();
    };


    return (
        <>
            <div className="form-group">
                <label>Distribution date</label>
                <input className="input-lg form-control" type="date" value={selectedDate} onChange={handleInputChange} />
            </div>
        </>
    );
  
};

export default DistributePopupBody;