import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Record from '../components/Record';
import Button from '../components/Button';
import RecordPopUp from '../components/RecordPopUp';

export default () =>  {
    //GET PARAMETERS
    const { name, date } = useParams();
    const location = useLocation();
    const { state } = location;

    const icon = state && state.icon ? state.icon : "envelop";
    const amount = state && state.formatedAmmount ? state.formatedAmmount : "";

    // Set a default value for date if not provided
    const formattedDate = date || "01-01-01";


    //GET DATA
    const [records, setRecords] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(`https://finanzas.visssible.com/backend/movimientos-consultar.php?apartado=${name}`);
        setRecords(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };

    fetchData();
    }, []); // The empty dependency array ensures that this effect runs once on mount


    //POP UP
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleNewRecordClick = () => {
        setPopupVisible(true);
        console.log("new record");
    };
    
    const handleRecordClick = (record) => {
        setSelectedRecord(record);
        setPopupVisible(true);
        console.log("Open record");
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };


    //NAVEGACION
    const navigate = useNavigate();

    const handleBackToMain = () => {
        navigate('/'); // Navigate to the main page (change '/' to the appropriate route if needed)
    };


  return (
    <div id="movimientos" className='pantalla completa' style={{paddingBottom: '66px'}}>

            <h3 className="apartado"><i className={icon}></i> {name} <span className="saldo">${amount}</span></h3>

            <ul id="lista">
                {records.map(record => (
                    <Record 
                        key={record.id}
                        description={record.descripcion}
                        amount={record.cantidad}
                        tipo={record.tipo}
                        method={record.method}
                        apartado={record.apartado}
                        highlighted={record.highlight}
                        fecha={record.fecha_mov}
                        record={record}
                        onRecordOpen={() => handleRecordClick(record)}
                    />
                ))}
            </ul>

            <div className="footer">
                <Button type="btn-default" onClick={handleBackToMain} >Close</Button>
                <button onClick={handleBackToMain}>Back to Main</button>
                <i className="transaction fas fa-plus-circle" onClick={handleNewRecordClick}></i>
            </div>

            {popupVisible && (
                <RecordPopUp
                    onClose={handleClosePopup}
                    record={selectedRecord}
                ></RecordPopUp>
            )}

    </div>
  );
};