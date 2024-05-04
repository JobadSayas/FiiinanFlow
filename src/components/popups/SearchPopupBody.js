import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPopupBody = ({passMainAction}) =>  {

    //Use state to save keywords
    const [keywords, setKeywords] = useState('');
    

    //Navigation has to be declare in order to work
    const navigate = useNavigate();


    //Take keywords from input
    const handleInputChange = (e) => {
        setKeywords(e.target.value); 
    };


    //Main function passed to the generic pop up button
    const handleSearch = () => {

        let params = { keyword: keywords };

        const queryParams = new URLSearchParams(params).toString();
        navigate(`/records?${queryParams}`);
    }


    // Pasar la función al pop up generico
    useEffect(() => {
        if (passMainAction) {
            passMainAction(() => handleSearch); // Pasa la función de esta forma para no ejecutarla directamente
        }
    }, [keywords]); // Se ejecutará cada vez que cambia keywords


    return (
        <>
            <div className="form-group">
                <label>Keywords or amount</label>
                <input className="input-lg form-control" type="text" value={keywords} onChange={handleInputChange} />
            </div>
        </>
    );
  
};

export default SearchPopupBody;