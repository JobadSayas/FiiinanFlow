import React, { useState } from 'react';

import { MultiInsert } from '../components/MultiInsert';

export default () =>  {

    const [popOverVisible, setpopOverVisible] = useState(false);

    const handleMenuButtonClick = () =>{
        setpopOverVisible(!popOverVisible);
    };
    
    const handleMultiInsertClick = () => {
        setpopOverVisible(false);
        MultiInsert(); // Call the imported function
    };

    return (<>

        <div id="menu-btn" onClick={handleMenuButtonClick}><i className="fas fa-bars"></i></div>

        {popOverVisible &&(
            <div id="menu" className="desplegado">
                <ul>
                    <li><i className="fas fa-clipboard-list"></i> Advanced Report</li>
                    <li><i className="fas fa-calendar-day"></i> Distribute All</li>
                    <li><i className="fas fa-share"></i> Transfer</li>
                    <li onClick={handleMultiInsertClick}><i className="fas fa-clone"></i> Multi Insert</li>
                    <li><a href="https://docs.google.com/spreadsheets/d/1KYrZ5UuTdmgxbyKIdNya4WZmfAopNfF9SB-tZ7Fpzjw/edit?pli=1#gid=0" target="_blank"><i className="fas fa-external-link-alt"></i> JSON Converter</a></li>
                </ul>
            </div>
        )}

    </>);
};


