import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../components/Utilities';

const MultiInsertPopupBody = ({passMainAction}) =>  {

    //Use state to save selected date
    const [code, setCode] = useState('');
   

    //Take code from text area
    const handleInputChange = (e) => {
        setCode(e.target.value); 
    };


    //Main function passed to the generic pop up button
    const handleMultiInsert = () => {
        if (code !== ''){
            let curatedObject = code.replace(/'/g, '"');
            let records = JSON.parse(curatedObject);
            multiInsertAPI(records);
        }
    }

    // Create records
    const multiInsertAPI = (records) => {
        axios.post(`${API_URL}/NEWmultiInsert.php`, { records })
        .then(response => {
            console.log('API response:', response.data);
            handleReload();
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
    };


    // Pasar la función al pop up generico
    useEffect(() => {
        if (passMainAction) {
            passMainAction(() => handleMultiInsert); // Pasa la función de esta forma para no ejecutarla directamente
        }
    }, [code]); // Se ejecutará cada vez que cambia code


    //RELOAD PAGE
    const handleReload = () => {
        window.location.reload();
    };


    return (
        <>
            <div className="form-group">
                <label>Enter JSON code</label>
                <textarea className="input-lg form-control" rows={10} value={code} onChange={handleInputChange} />
            </div>
        </>
    );
  
};

export default MultiInsertPopupBody;