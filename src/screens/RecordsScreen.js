import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Record from '../components/Record';
import Button from '../components/Button';
import RecordPopUp from '../components/RecordPopUp';
import {API_URL} from '../components/Utilities';

const RecordsScreen = () =>  {
    
    //GET PARAMETERS
    const { name, date } = useParams();
    const location = useLocation();
    const { state } = location;

    const icon = state && state.icon ? state.icon : "envelop";
    const amount = state && state.formatedAmmount ? state.formatedAmmount : "";

    // Set a default value for date if not provided
    const formattedDate = date || "01-01-01";


    //GET RECORDS
    const [records, setRecords] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/movimientos-consultar.php?apartado=${name}`);
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
    const [popupMode, setPopupMode] = useState(null);

    //Open for new record in popup
    const handleNewRecordClick = () => {
        setPopupVisible(true);
        setPopupMode('new');

        const date = new Date();
        //This because the time was coming in UTD, to transform to CST
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        // Transforms the date in the right format YYYY-MM-DDTHH:MM
        const formatedDate = localDate.toISOString().slice(0, 16); 
        
        setSelectedRecord({
            cantidad: '', // Empty amount
            apartado: name, // Empty apartado
            descripcion: '', // Empty descripcion
            method: '', // Empty method
            tipo: 'gasto',
            fecha_mov: formatedDate
        });
    };
    
    //Open existing record in pop up
    const handleRecordClick = (record) => {
        setPopupVisible(true);
        setPopupMode('edit');

        setSelectedRecord(record);
    };

    // Function to handle record update from popup
    const handlePopupClose = (updatedRecord) => {
        setRecords(records.map(record =>
            record.id === updatedRecord.id ? updatedRecord : record
        ));
        setSelectedRecord(null); // Close the popup
        setPopupVisible(false);
    };
    

    //NAVEGACION
    const navigate = useNavigate();

    const handleBackToMain = () => {
        navigate('/'); // Navigate to the main page (change '/' to the appropriate route if needed)
    };


  return (
    <div id="movimientos" className='pantalla completa' style={{paddingBottom: '66px'}}>

            {/* Header */}
            <h3 className="apartado"><i className={icon}></i> {name} <span className="saldo">${amount}</span></h3>

            {/* Records list */}
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

            {/* Footer */}
            <div className="footer">
                <Button type="btn-default" onClick={handleBackToMain} >Close</Button>
                <i className="transaction fas fa-plus-circle" onClick={handleNewRecordClick}></i>
            </div>

            {/* Popup component */}
            {popupVisible && selectedRecord && (
                <RecordPopUp
                    record={selectedRecord}
                    onClose={handlePopupClose}
                    mode={popupMode}
                ></RecordPopUp>
            )}

    </div>
  );
};

export default RecordsScreen;