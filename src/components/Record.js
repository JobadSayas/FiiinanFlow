import React, { useState } from 'react';
import axios from 'axios';

import { useMethodData } from '../context/MethodContext';
import {API_URL} from '../components/Utilities';


const Record = ({ record, onRecordOpen, onDelete }) =>  {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //DATE
    const fechaDate = new Date(record.fecha_mov);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true };
    const formatedDate = fechaDate.toLocaleString('en-US', options);


    //METHODS
    const methodData = useMethodData();
    const methodInfo = methodData.find(data => data.nombre === record.method);
    const { icono, color } = methodInfo || {};


    //DELETE RECORD

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${API_URL}/NEWtransaction.php`, {
                data: { id: record.id } // Send record ID in the request body
            });
            // Update UI to reflect record deletion (if needed)
            onDelete(record.id)
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };


    // HIGHLIGHT

    const [isHighlighted, setIsHighlighted] = useState(record.highlight === '1'); // Initial state from the record prop
    
    const handleHighlight = () => {
        // Toggle the highlight value between '0' and '1'
        const newHighlight = record.highlight === '1' ? '0' : '1';
        // Update the highlight value in the state
        // This update will only reflect after re-rendering
        setRecord({ ...record, highlight: newHighlight });
        // Update the highlight in the backend (if needed)
        updateHighlightInBackend(record.id, newHighlight);
    };

    // Update highlight value in the backend
    const updateHighlightInBackend = async (recordId, newHighlight) => {
        try {
            const response = await axios.post(`${API_URL}/NEWrecordHighlight.php`, { id: recordId, highlight: newHighlight });
            console.log('Backend response:', response.data);
        } catch (error) {
            console.error('There was a problem updating highlight in the backend:', error);
        }
    };



    return (

        <li key={record.id} className={record.highlight === '1' && ("highlighted")}>
            <div className="area" onClick={onRecordOpen}></div>
            { record.method && ( 
            <i className={`method ${icono}`} style={{color:color}}></i>
            )} 
            <span className="fecha" fecha={formatedDate}>{formatedDate}</span>
            <div className="main-line">
                {record.apartado && (
                <span className="etiqueta">{record.apartado}</span>
                )}
                <span className="descripcion">{record.descripcion}</span>
            </div>
            <span className={`cantidad ${record.tipo}`}>{record.cantidad}</span>
            
            <div className="opciones" onClick={() => setIsMenuOpen(!isMenuOpen) }>
                <i className="fas fa-ellipsis-v"></i>
                {isMenuOpen && (
                    <ul>
                        <li onClick={handleHighlight}>Highlight</li>
                        <li className="disabled">Duplicate</li>
                        <li onClick={handleDelete}>Delete</li>
                    </ul>
                )}
            </div>
        </li>

    );
  
};

export default Record;